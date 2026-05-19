import type { DealMemoryPayload } from '@/types'

const BASE = 'https://api.hindsight.vectorize.io/v1'

function headers() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.HINDSIGHT_API_KEY}`,
  }
}

function pipelineId() {
  const id = process.env.HINDSIGHT_PIPELINE_ID
  if (!id) throw new Error('HINDSIGHT_PIPELINE_ID is not set')
  return id
}

// ── Recall ──────────────────────────────────────────────────────────────────
export interface RecalledMemory {
  content: string
  score: number
  metadata?: Record<string, string>
}

export async function recall(
  query: string,
  topK = 4
): Promise<RecalledMemory[]> {
  try {
    const res = await fetch(
      `${BASE}/pipelines/${pipelineId()}/retrieve`,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ query, topK }),
      }
    )
    if (!res.ok) {
      console.error('[Hindsight] recall HTTP error:', res.status)
      return []
    }
    const data = await res.json()
    return (data.documents ?? []) as RecalledMemory[]
  } catch (err) {
    console.error('[Hindsight] recall failed:', err)
    return []
  }
}

// ── Store ────────────────────────────────────────────────────────────────────
export async function store(
  content: string,
  metadata: Record<string, string> = {}
): Promise<boolean> {
  try {
    const res = await fetch(
      `${BASE}/pipelines/${pipelineId()}/upsert`,
      {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ documents: [{ content, metadata }] }),
      }
    )
    return res.ok
  } catch (err) {
    console.error('[Hindsight] store failed:', err)
    return false
  }
}

// ── Build a structured memory string from a closed deal ──────────────────────
export function buildDealMemory(d: DealMemoryPayload): string {
  const outcome = d.walked
    ? 'walked away when countered'
    : d.settled
    ? `settled at $${d.settled}`
    : 'outcome unknown'

  const payNote = d.paymentStatus
    ? d.paymentStatus === 'on-time'
      ? 'Paid on time.'
      : d.paymentStatus === 'late'
      ? 'Paid late (2+ weeks).'
      : 'Very late payment — major flag.'
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