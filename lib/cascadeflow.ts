// cascadeflow: classify cheaply with Groq, use Groq for all responses
// Every routing decision is logged so the audit trail is visible in the UI.
 
export const MODELS = {
  classify: {
    id: 'llama-3.1-8b-instant',
    provider: 'groq' as const,
    label: 'Groq llama-3.1-8b',
    costPer1kInput: 0.00005,
    costPer1kOutput: 0.00008,
  },
  draft: {
    id: 'llama-3.1-70b-versatile',
    provider: 'groq' as const,
    label: 'Groq llama-3.1-70b',
    costPer1kInput: 0.00059,
    costPer1kOutput: 0.00079,
  },
} as const
 
export interface ClassifyResult {
  needsPremium: boolean
  complexity: 'low' | 'medium' | 'high'
  reason: string
}
 
// Step 1: Use the cheap model to decide if the premium model is needed
export async function classifyComplexity(
  message: string
): Promise<ClassifyResult> {
  const fallback: ClassifyResult = {
    needsPremium: true,
    complexity: 'high',
    reason: 'Classification failed — defaulting to premium model',
  }
 
  try {
    const res = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: MODELS.classify.id,
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
      }
    )
    if (!res.ok) return fallback
    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content ?? ''
    return JSON.parse(raw.replace(/```json|```/g, '').trim()) as ClassifyResult
  } catch {
    return fallback
  }
}
 
// Step 2: Route a prompt to the correct model based on classification
export interface RouteResult {
  text: string
  modelUsed: typeof MODELS.classify | typeof MODELS.draft
  inputTokens: number
  outputTokens: number
}
 
export async function routePrompt(
  systemPrompt: string,
  userMessage: string,
  needsPremium: boolean
): Promise<RouteResult> {
  if (needsPremium) {
    return callGroqPremium(systemPrompt, userMessage)
  }
  const groqResult = await callGroq(systemPrompt, userMessage)
  // If Groq result looks malformed, escalate to larger Groq model
  if (!groqResult.text || groqResult.text.length < 20) {
    return callGroqPremium(systemPrompt, userMessage)
  }
  return groqResult
}
 
async function callGroqPremium(
  systemPrompt: string,
  userMessage: string
): Promise<RouteResult> {
  const res = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODELS.draft.id,
        max_tokens: 800,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      }),
    }
  )
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  const usage = data.usage ?? {}
  return {
    text: data.choices?.[0]?.message?.content ?? '',
    modelUsed: MODELS.draft,
    inputTokens: usage.prompt_tokens ?? 500,
    outputTokens: usage.completion_tokens ?? 150,
  }
}
 
async function callGroq(
  systemPrompt: string,
  userMessage: string
): Promise<RouteResult> {
  const res = await fetch(
    'https://api.groq.com/openai/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODELS.classify.id,
        max_tokens: 800,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      }),
    }
  )
  if (!res.ok) throw new Error(`Groq error: ${res.status}`)
  const data = await res.json()
  const usage = data.usage ?? {}
  return {
    text: data.choices?.[0]?.message?.content ?? '',
    modelUsed: MODELS.classify,
    inputTokens: usage.prompt_tokens ?? 500,
    outputTokens: usage.completion_tokens ?? 150,
  }
}
 
// Compute cost savings vs always using the premium model
export function calcSavings(
  inputTokens: number,
  outputTokens: number,
  modelUsed: typeof MODELS.classify | typeof MODELS.draft
): { actualCost: number; premiumCost: number; savedPercent: number } {
  const actualCost =
    (inputTokens / 1000) * modelUsed.costPer1kInput +
    (outputTokens / 1000) * modelUsed.costPer1kOutput
 
  const premiumCost =
    (inputTokens / 1000) * MODELS.draft.costPer1kInput +
    (outputTokens / 1000) * MODELS.draft.costPer1kOutput
 
  const savedPercent =
    premiumCost > 0
      ? Math.round((1 - actualCost / premiumCost) * 100)
      : 0
 
  return {
    actualCost: parseFloat(actualCost.toFixed(6)),
    premiumCost: parseFloat(premiumCost.toFixed(6)),
    savedPercent: Math.max(0, savedPercent),
  }
}
 