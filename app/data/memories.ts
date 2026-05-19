import type { MemoryMatch } from '@/types'

export interface MemoryInsight {
  id: string
  category: string
  type: 'pattern' | 'risk' | 'opportunity' | 'behavior'
  severity: 'high' | 'medium' | 'low'
  title: string
  description: string
  confidence: number
  timestamp: string
}

export const memoryInsights: MemoryInsight[] = [
  {
    id: '1',
    category: 'Skincare',
    type: 'pattern',
    severity: 'high',
    title: 'Skincare brands settle 2.1× above opening',
    description: 'Historical data shows skincare brands in your niche typically settle at 210% of their initial offer after 2-3 negotiation rounds.',
    confidence: 94,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    category: 'NovaSkin Co',
    type: 'risk',
    severity: 'medium',
    title: 'NovaSkin historically pays 14 days late',
    description: 'Previous campaign with NovaSkin resulted in payment delay of 14 days beyond NET-30 terms. Consider requesting 50% upfront.',
    confidence: 88,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '3',
    category: 'Fashion',
    type: 'opportunity',
    severity: 'low',
    title: 'Fashion brands accept revision limits',
    description: '92% of fashion brand deals successfully closed with 2-3 revision cap. Use this as leverage.',
    confidence: 91,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
  },
  {
    id: '4',
    category: 'Creator Preference',
    type: 'behavior',
    severity: 'high',
    title: 'Creator rejects perpetual usage rights',
    description: 'You have consistently rejected deals with perpetual usage rights. Recommend 6-12 month usage terms.',
    confidence: 97,
    timestamp: new Date(Date.now() - 345600000).toISOString(),
  },
  {
    id: '5',
    category: 'Skincare',
    type: 'pattern',
    severity: 'medium',
    title: 'Skincare brands average 47% lowball opening',
    description: 'Skincare category shows consistent pattern of opening 40-50% below market rate. Counter aggressively.',
    confidence: 89,
    timestamp: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '6',
    category: 'Payment',
    type: 'risk',
    severity: 'high',
    title: 'Brands under $500 show 34% late payment rate',
    description: 'Deals under $500 have higher late payment risk. Consider requesting upfront payment for smaller deals.',
    confidence: 86,
    timestamp: new Date(Date.now() - 518400000).toISOString(),
  },
]

export function getMemoriesForDeal(brand: string, category: string): MemoryMatch[] {
  const memories: MemoryMatch[] = []

  // Brand-specific memories
  const brandMemory = memoryInsights.find(m => m.category === brand)
  if (brandMemory) {
    memories.push({
      source: brandMemory.title,
      insight: brandMemory.description,
    })
  }

  // Category memories
  const categoryMemories = memoryInsights.filter(m => m.category === category)
  categoryMemories.forEach(mem => {
    memories.push({
      source: mem.title,
      insight: mem.description,
    })
  })

  // Creator behavior
  const behaviorMemories = memoryInsights.filter(m => m.type === 'behavior')
  if (behaviorMemories.length > 0) {
    memories.push({
      source: behaviorMemories[0].title,
      insight: behaviorMemories[0].description,
    })
  }

  return memories.slice(0, 4)
}

export interface ActivityItem {
  id: string
  type: 'message' | 'memory' | 'deal' | 'routing'
  title: string
  description: string
  timestamp: string
  icon: string
}

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    type: 'message',
    title: 'NovaSkin replied',
    description: 'New counter-offer: $500',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    icon: 'message',
  },
  {
    id: '2',
    type: 'memory',
    title: 'Memory recall triggered',
    description: 'Retrieved 4 relevant negotiation patterns',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    icon: 'brain',
  },
  {
    id: '3',
    type: 'deal',
    title: 'Deal closed',
    description: 'Luxe Beauty settled at $800',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    icon: 'check',
  },
  {
    id: '4',
    type: 'routing',
    title: 'Claude escalation activated',
    description: 'Complex negotiation detected',
    timestamp: new Date(Date.now() - 90000000).toISOString(),
    icon: 'zap',
  },
  {
    id: '5',
    type: 'message',
    title: 'GlowLab sent DM',
    description: 'New collaboration opportunity',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    icon: 'message',
  },
  {
    id: '6',
    type: 'deal',
    title: 'UrbanVogue negotiating',
    description: 'Counter-offer sent: $1,400',
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    icon: 'trending-up',
  },
]
