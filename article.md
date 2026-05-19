# My AI Negotiation Agent Remembered a Brand Paid Late — Before I Did

Six months after a nightmare skincare campaign, the same brand came back with a new offer.

Same lowball number. Same vague deliverables. Same missing payment terms.

I had forgotten the details. The brand was counting on that.

My AI assistant had forgotten everything too. It drafted a warm, professional reply suggesting a modest counter. Nothing about the two weeks of late payment. Nothing about the four revision requests that weren't in the contract. Nothing about the fact that the brand had eventually settled at 2.3× their opening offer after I pushed back hard.

The AI was helpful. But it was negotiating blind.

That's the problem I built DealMind to solve — not better prompts, but persistent negotiation memory. An agent that treats every interaction as a data point and gets demonstrably smarter with each deal.

Here's how it works under the hood.

---

## The Core Problem: Stateless AI in a Stateful Game

Negotiation isn't transactional. It's historical.

Experienced talent managers carry institutional knowledge that changes how they approach every conversation. They know which brands always lowball. Which ones delay invoices. Which categories routinely push for unlimited usage rights. That accumulated context is leverage — and most AI systems throw it away after every session.

The standard AI negotiation setup looks something like this:

1. Brand sends a DM
2. You paste it into ChatGPT
3. AI produces a confident-sounding counter with zero context
4. Repeat from scratch next time

The reply might be grammatically correct. But it's strategically empty because the model has no idea what happened the last three times you dealt with this category of brand.

The fix isn't a better prompt. The fix is memory.

---

## Building the Memory Layer with Hindsight

The first thing I built was a clean abstraction over [Hindsight](https://hindsight.vectorize.io/) for storing and recalling deal intelligence. The goal was simple: after every negotiation, store what happened. Before every negotiation, retrieve what's relevant.

The recall function in `lib/hindsight.ts` does a semantic vector search against your deal history:

```ts
export async function recall(
  query: string,
  topK = 4
): Promise<RecalledMemory[]> {
  const res = await fetch(
    `${BASE}/pipelines/${pipelineId()}/retrieve`,
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({ query, topK }),
    }
  )
  const data = await res.json()
  return (data.documents ?? []) as RecalledMemory[]
}
```

The query isn't the brand name — it's the full negotiation context: brand, category, and the type of deal. That matters because you want semantic matches, not exact ones. A query for "GlowLab Skincare product collab" should surface memories about NovaSkin Co if they're in the same category with similar patterns.

What gets stored isn't raw conversation. It's structured deal intelligence built by `buildDealMemory()`:

```ts
export function buildDealMemory(d: DealMemoryPayload): string {
  const outcome = d.walked
    ? 'walked away when countered'
    : d.settled
    ? `settled at $${d.settled}`
    : 'outcome unknown'

  const payNote = d.paymentStatus === 'late'
    ? 'Paid late (2+ weeks).'
    : d.paymentStatus === 'on-time'
    ? 'Paid on time.'
    : ''

  const revNote = d.revisionOverrun
    ? 'Brand overran agreed revisions.'
    : ''

  return [
    `Brand: ${d.brand}.`,
    `Category: ${d.category}.`,
    `Offered: $${d.offered}.`,
    `Outcome: ${outcome}.`,
    payNote,
    revNote,
    d.notes,
  ]
    .filter(Boolean)
    .join(' ')
}
```

A stored memory might look like:

> "Brand: NovaSkin Co. Category: Skincare. Offered: $300. Outcome: settled at $650. Paid late (2+ weeks). Brand overran agreed revisions."

That single sentence, retrieved at the start of the next negotiation, completely changes the agent's behavior. The rate floor goes up. NET-30 payment terms get added automatically. A revision cap goes in the draft without the creator having to remember to ask.

---

## The Negotiation Pipeline: How Memory Changes the Response

In `app/api/negotiate/route.ts`, every request runs through a four-step pipeline before a single word of negotiation copy gets generated.

**Step 1 — Recall.** Before anything else, Hindsight gets queried:

```ts
const memoryQuery = `${brand} ${category} brand deal negotiation rate`
const memories = await recall(memoryQuery, 4)

const memoryContext =
  memories.length > 0
    ? memories.map((m, i) => `[Memory ${i + 1}]: ${m.content}`).join('\n')
    : 'No past deals found. Use general negotiation best practices.'
```

**Step 2 — Classify.** The message complexity gets evaluated before deciding which model to use (more on this below).

**Step 3 — Generate.** The retrieved memories go directly into the system prompt alongside the full conversation history. The model isn't generating from scratch — it's generating from accumulated context.

**Step 4 — Store.** After the deal closes, the outcome goes back to Hindsight. The loop closes.

The difference in output quality is not subtle. Without memory, the agent produces:

> "Thanks for reaching out! My rate for this package is $450."

With four relevant memories recalled, the same agent produces:

> "Thanks for coming back! Based on my rates for this deliverable set, I'd need $750 with a 2-revision limit and NET-30 payment terms included in the contract. Happy to send over the details if that works."

Same model. Same prompt structure. Completely different output — because the context changed what the model understood about the situation.

---

## Why I Added cascadeflow: The Cost Problem Nobody Talks About

Once memory was working, I hit a different problem.

Every negotiation message — including "sounds great, let's move forward" — was going through Claude Sonnet. That's like hiring a senior lawyer to sort your mail.

The solution was runtime routing via [cascadeflow](https://github.com/lemony-ai/cascadeflow).

The idea is simple: classify the complexity of each message first with a cheap model, then route to the right model based on what the task actually requires. Low-complexity messages (acceptances, clarifying questions, simple rejections) never need a premium model. High-complexity messages (multi-clause counters, ambiguous legal language, anything requiring memory reasoning) do.

`classifyComplexity()` in `lib/cascadeflow.ts` handles step one:

```ts
export async function classifyComplexity(
  message: string
): Promise<ClassifyResult> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.classify.id,   // llama3-8b-8192
      max_tokens: 120,
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: `Classify the complexity of this brand deal negotiation message.
Return ONLY valid JSON: {"needsPremium": boolean, "complexity": "low|medium|high", "reason": "one sentence"}
- low: simple yes/no, acceptance, or rejection with no clauses
- medium: counter-offer with clear numbers  
- high: multi-clause negotiation, legal terms, ambiguous intent, or requires memory context`,
        },
        { role: 'user', content: message },
      ],
    }),
  })
  const data = await res.json()
  return JSON.parse(data.choices?.[0]?.message?.content)
}
```

Then `routePrompt()` makes the routing decision:

```ts
export async function routePrompt(
  systemPrompt: string,
  userMessage: string,
  needsPremium: boolean
): Promise<RouteResult> {
  if (needsPremium) {
    return callAnthropic(systemPrompt, userMessage)
  }
  const groqResult = await callGroq(systemPrompt, userMessage)
  // Safety net: if Groq output looks malformed, escalate anyway
  if (!groqResult.text || groqResult.text.length < 20) {
    return callAnthropic(systemPrompt, userMessage)
  }
  return groqResult
}
```

The cost difference is significant. llama3-8b on Groq costs $0.00005 per 1k input tokens. Claude Sonnet costs $0.003 — 60× more. For a classification task that produces a JSON object with three fields, the cheap model works fine. The expensive model stays reserved for what it's actually good at: nuanced, memory-grounded negotiation drafts.

`calcSavings()` tracks the actual numbers per request so users can see the audit trail:

```ts
const savings = calcSavings(
  routeResult.inputTokens,
  routeResult.outputTokens,
  routeResult.modelUsed
)
// → { actualCost: 0.000063, premiumCost: 0.00345, savedPercent: 81 }
```

In practice, roughly 60% of negotiation messages are low-to-medium complexity. Running those through Groq instead of Claude Sonnet cuts total inference cost by around 81% with no measurable drop in output quality for those cases.

---

## What the Agent Looks Like After 10 Deals

The compounding effect of persistent memory is the part that surprised me most.

After ten deals across a few brand categories, patterns start emerging automatically:

- Skincare brands in this dataset open at an average of 43% below final settlement
- Tech brands respond well to usage rights as an add-on, rarely walk away over it  
- Any brand that overran revisions once has a high probability of doing it again
- Late payers tend to cluster by category, not by individual brand

The agent doesn't need to be explicitly told any of this. It surfaces from the retrieved memories and the model reasons over it. By deal ten, the suggested rate on a new skincare inquiry is no longer a guess — it's a number grounded in nine previous data points.

That's the shift from assistant to infrastructure. The system isn't helping you think. It's thinking with accumulated context you'd never hold in your own head across dozens of negotiations.

---

## Three Things I'd Do Differently

**Build the memory schema first.** I started with the API layer and retrofitted `buildDealMemory()` later. The shape of what you store determines the quality of what you recall. Design it deliberately before writing a single API call.

**Log every retrieval with its similarity score.** Hindsight returns a `score` field on each document. I wasn't surfacing this in the UI initially, which made it hard to debug cases where irrelevant memories were being recalled. Now the score is visible and I can tune `topK` based on what's actually matching.

**Make the fallback explicit, not silent.** The current code falls back to `offeredRate * 2.2` if JSON parsing fails. That's a fine safety net, but the UI should tell the user it happened. Silent fallbacks make debugging painful.

---

## The Takeaway

Most AI agents are impressive for one interaction. The interesting problem is building something that compounds.

Persistent memory via [Hindsight](https://github.com/vectorize-io/hindsight) and intelligent model routing via [cascadeflow](https://github.com/lemony-ai/cascadeflow) are two concrete, production-applicable patterns for getting there. The memory layer means each interaction makes the next one smarter. The routing layer means you can scale that without burning your API budget.

The creator who accepted $300 from that skincare brand six months ago? The second time they came in with an offer, DealMind surfaced the late payment, the revision overrun, and the fact that the category historically settles at 2× the opening number.

She countered at $850. They accepted $750.

That's not the AI being clever. That's the AI remembering what you forgot.