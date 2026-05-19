export type DealStatus = 'new' | 'negotiating' | 'closed' | 'rejected'
export type FlagLevel = 'red' | 'yellow' | 'green'
export type MessageFrom = 'brand' | 'agent'
export type Complexity = 'low' | 'medium' | 'high'
 
export interface Deal {
  id: string
  brand: string
  category: string
  status: DealStatus
  offeredRate: number
  settledRate?: number
  deliverables: string[]
  createdAt: string
}
 
export interface Message {
  id: string
  from: MessageFrom
  text: string
  routeLabel?: string
  timestamp: string
}
 
export interface Flag {
  level: FlagLevel
  text: string
}
 
export interface MemoryMatch {
  source: string
  insight: string
}
 
export interface RouteInfo {
  classifyModel: string
  draftModel: string
  savedPercent: number
}
 
// Request shape sent to /api/negotiate
export interface NegotiateRequest {
  brand: string
  category: string
  offeredRate: number
  conversationHistory: { from: MessageFrom; text: string }[]
  latestMessage: string
}
 
// Response shape from /api/negotiate
export interface NegotiateResponse {
  draft: string
  suggestedRate: number
  rateReasoning: string
  flags: Flag[]
  memoryMatches: MemoryMatch[]
  route: RouteInfo
}
 
// Shape stored in / recalled from Hindsight
export interface DealMemoryPayload {
  brand: string
  category: string
  offered: number
  settled?: number
  walked?: boolean
  paymentStatus?: 'on-time' | 'late' | 'very-late'
  revisionOverrun?: boolean
  notes: string
}
 