import { NextRequest, NextResponse } from 'next/server'
import { recall, store, buildDealMemory } from '@/lib/hindsight'
import type { DealMemoryPayload } from '@/types'
 
// GET /api/memory?q=<query>
// Recall semantically similar past deals from Hindsight
export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get('q')?.trim()
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter ?q= is required' },
      { status: 400 }
    )
  }
 
  const results = await recall(query, 4)
  return NextResponse.json({ results })
}
 
// POST /api/memory
// Store a closed deal outcome into Hindsight
export async function POST(req: NextRequest) {
  let body: DealMemoryPayload
 
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }
 
  if (!body.brand || !body.category || !body.offered) {
    return NextResponse.json(
      { error: 'brand, category, and offered are required' },
      { status: 400 }
    )
  }
 
  const content = buildDealMemory(body)
  const ok = await store(content, {
    brand: body.brand,
    category: body.category,
    type: 'deal_outcome',
  })
 
  if (!ok) {
    return NextResponse.json(
      { error: 'Failed to store memory in Hindsight' },
      { status: 502 }
    )
  }
 
  return NextResponse.json({ ok: true, stored: content })
}
 