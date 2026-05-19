import { NextRequest, NextResponse } from 'next/server'
import { recall } from '@/lib/hindsight'
import {
  classifyComplexity,
  routePrompt,
  calcSavings,
  MODELS,
} from '@/lib/cascadeflow'
import type { NegotiateRequest, NegotiateResponse } from '@/types'

export async function POST(req: NextRequest) {
  let body: NegotiateRequest

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { brand, category, offeredRate, conversationHistory, latestMessage } =
    body

  if (!brand || !category || !latestMessage) {
    return NextResponse.json(
      { error: 'brand, category, and latestMessage are required' },
      { status: 400 }
    )
  }

  // ── Step 1: Recall relevant memory from Hindsight ─────────────────────────
  const memoryQuery = `${brand} ${category} brand deal negotiation rate`
  const memories = await recall(memoryQuery, 4)

  const memoryContext =
    memories.length > 0
      ? memories.map((m, i) => `[Memory ${i + 1}]: ${m.content}`).join('\n')
      : 'No past deals found for this brand or category. Use general negotiation best practices.'

  // ── Step 2: cascadeflow — classify complexity to pick model ───────────────
  const classification = await classifyComplexity(latestMessage)

  // ── Step 3: Build prompt ───────────────────────────────────────────────────
  const history =
    conversationHistory.length > 0
      ? conversationHistory
          .map((m) => `${m.from === 'brand' ? brand : 'Agent'}: ${m.text}`)
          .join('\n')
      : 'This is the first message.'

  const systemPrompt = `You are an AI negotiation agent representing a social media influencer.
Your job is to use recalled deal memory to give smarter advice than a generic assistant.

HINDSIGHT MEMORY (recalled from past deals):
${memoryContext}

CURRENT DEAL:
- Brand: ${brand}
- Category: ${category}
- Their opening offer: $${offeredRate}

CONVERSATION SO FAR:
${history}

INSTRUCTIONS:
1. Suggest a counter-rate grounded in memory patterns (never just make up a number)
2. Flag any contract gaps: missing revision cap, no payment terms, no exclusivity clause, no usage rights
3. Write a short reply (2-3 sentences) that is professional, warm, and confident — not robotic
4. If memory shows this brand paid late or overran revisions, note it in your reasoning

Return ONLY valid JSON. No markdown, no backticks, no explanation outside the JSON.
{
  "suggestedRate": number,
  "rateReasoning": "one clear sentence explaining how memory informed this rate",
  "flags": [
    {"level": "red|yellow|green", "text": "short description of the flag"}
  ],
  "memoryMatches": [
    {"source": "brand name or pattern description", "insight": "what memory reveals"}
  ],
  "draft": "the reply text to send to the brand"
}`

  // ── Step 4: cascadeflow — route to the right model ────────────────────────
  let routeResult
  try {
    routeResult = await routePrompt(
      systemPrompt,
      `Latest brand message: "${latestMessage}"\n\nGenerate the negotiation response JSON.`,
      classification.needsPremium
    )
  } catch (err) {
    console.error('[negotiate] model call failed:', err)
    return NextResponse.json(
      { error: 'Failed to generate reply. Check API keys.' },
      { status: 502 }
    )
  }

  // ── Step 5: Parse model output ────────────────────────────────────────────
  let parsed: Omit<NegotiateResponse, 'route'>
  try {
    const clean = routeResult.text.replace(/```json|```/g, '').trim()
    parsed = JSON.parse(clean)
  } catch {
    // Fallback: wrap raw text as a draft if JSON parse fails
    parsed = {
      suggestedRate: Math.round(offeredRate * 2.2),
      rateReasoning: 'Based on category averages from memory.',
      flags: [
        { level: 'yellow', text: 'Could not parse structured response — review draft manually' },
      ],
      memoryMatches: [],
      draft: routeResult.text.slice(0, 400),
    }
  }

  // ── Step 6: Attach cascadeflow audit ──────────────────────────────────────
  const savings = calcSavings(
    routeResult.inputTokens,
    routeResult.outputTokens,
    routeResult.modelUsed
  )

  const response: NegotiateResponse = {
    ...parsed,
    route: {
      classifyModel: MODELS.classify.label,
      draftModel: routeResult.modelUsed.label,
      savedPercent: savings.savedPercent,
    },
  }

  return NextResponse.json(response)
}