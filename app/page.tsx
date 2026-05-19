'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  Loader2,
  Send,
  BarChart3,
  Settings,
  User,
  Image,
  Handshake,
} from 'lucide-react'
import type { Deal, Message, Flag, MemoryMatch, RouteInfo, NegotiateResponse } from '@/types'
import { cn } from '@/lib/utils'

// Import components
import { Logo } from './components/logo'
import { CreatorProfile } from './components/creator-profile'
import { InstagramPreview } from './components/instagram-preview'
import { DealPipeline } from './components/deal-pipeline'
import { DMThread } from './components/dm-thread'
import { MemoryPanel } from './components/memory-panel'
import { RoutingPanel } from './components/routing-panel'
import { ActivityFeed } from './components/activity-feed'
import { AnalyticsPanel } from './components/analytics-panel'

// Import data
import { creator, recentContent } from './data/creator'
import { deals as initialDeals, threads as initialThreads } from './data/deals'
import { memoryInsights, recentActivity } from './data/memories'

export default function DealMind() {
  const [deals] = useState<Deal[]>(initialDeals)
  const [threads, setThreads] = useState<Record<string, Message[]>>(initialThreads)
  const [selectedId, setSelectedId] = useState<string | null>('nova-skin')
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [flags, setFlags] = useState<Flag[]>([])
  const [memoryMatches, setMemoryMatches] = useState<MemoryMatch[]>([])
  const [suggestedRate, setSuggestedRate] = useState<number | null>(null)
  const [rateReasoning, setRateReasoning] = useState('')
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'profile' | 'content' | 'analytics'>('profile')
  const threadEndRef = useRef<HTMLDivElement>(null)

  const selectedDeal = deals.find((d) => d.id === selectedId) ?? null
  const currentThread = selectedId ? (threads[selectedId] ?? []) : []

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [currentThread])

  function selectDeal(id: string) {
    setSelectedId(id)
    setDraft('')
    setFlags([])
    setMemoryMatches([])
    setSuggestedRate(null)
    setRateReasoning('')
    setRouteInfo(null)
    setError('')
  }

  async function generateReply() {
    if (!selectedDeal) return
    setLoading(true)
    setError('')
    setDraft('')

    try {
      const history = currentThread.map((m) => ({ from: m.from, text: m.text }))
      const latestBrand = [...currentThread].reverse().find((m) => m.from === 'brand')

      const res = await fetch('/api/negotiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: selectedDeal.brand,
          category: selectedDeal.category,
          offeredRate: selectedDeal.offeredRate,
          conversationHistory: history,
          latestMessage: latestBrand?.text ?? '',
        }),
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? `HTTP ${res.status}`)
      }

      const data: NegotiateResponse = await res.json()
      setDraft(data.draft ?? '')
      setFlags(data.flags ?? [])
      setMemoryMatches(data.memoryMatches ?? [])
      setSuggestedRate(data.suggestedRate ?? null)
      setRateReasoning(data.rateReasoning ?? '')
      setRouteInfo(data.route ?? null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  function sendReply() {
    if (!selectedId || !draft.trim()) return
    const newMsg: Message = {
      id: Date.now().toString(),
      from: 'agent',
      text: draft.trim(),
      routeLabel: routeInfo ? `${routeInfo.classifyModel} → ${routeInfo.draftModel}` : undefined,
      timestamp: new Date().toISOString(),
    }
    setThreads((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] ?? []), newMsg],
    }))
    setDraft('')
    setRouteInfo(null)
  }

  return (
    <div className="h-screen flex bg-[#0A0A0A] text-white overflow-hidden">
      {/* Left Sidebar - Creator Profile */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-80 border-r border-white/[0.05] flex flex-col overflow-y-auto"
      >
        <div className="p-6 border-b border-white/[0.05]">
          <div className="mb-6">
            <Logo size="md" showText={true} />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'content', label: 'Content', icon: Image },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            ].map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all',
                    activeTab === tab.id
                      ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'
                  )}
                >
                  <Icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'profile' && <CreatorProfile creator={creator} />}
          {activeTab === 'content' && <InstagramPreview content={recentContent} />}
          {activeTab === 'analytics' && <AnalyticsPanel deals={deals} />}
        </div>

        <div className="p-4 border-t border-white/[0.05] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.03] transition-colors text-sm text-white/60">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' })
              window.location.href = '/login'
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 transition-colors text-sm text-red-400/60 hover:text-red-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </motion.div>

      {/* Center Left - Deal Pipeline */}
      <motion.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="w-80 border-r border-white/[0.05] flex flex-col"
      >
        <div className="p-6 border-b border-white/[0.05]">
          <h2 className="text-sm font-medium text-white/80 mb-1">Deal Pipeline</h2>
          <p className="text-xs text-white/40">Active brand negotiations</p>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <DealPipeline deals={deals} selectedId={selectedId} onSelectDeal={selectDeal} />
        </div>
      </motion.div>

      {/* Center - Negotiation Thread */}
      <div className="flex-1 flex flex-col">
        {!selectedDeal ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Logo size="lg" showText={false} className="opacity-20" />
              </div>
              <p className="text-white/40">Select a deal to start negotiating</p>
            </div>
          </div>
        ) : (
          <>
            {/* Deal Header */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-b border-white/[0.05] p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{selectedDeal.brand}</h2>
                  <p className="text-sm text-white/40">
                    {selectedDeal.category} · {selectedDeal.deliverables.join(', ')}
                  </p>
                </div>

                {suggestedRate && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-right"
                  >
                    <p className="text-xs text-white/40 mb-1">AI Suggested Rate</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                      ${suggestedRate.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-emerald-400">
                      <TrendingUp className="w-3 h-3" />
                      <span>
                        +{Math.round(((suggestedRate - selectedDeal.offeredRate) / selectedDeal.offeredRate) * 100)}%
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Flags */}
              {flags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-4"
                >
                  {flags.map((flag, i) => (
                    <span
                      key={i}
                      className={cn(
                        'text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5',
                        flag.level === 'red' && 'bg-red-500/10 text-red-400 border border-red-500/20',
                        flag.level === 'yellow' && 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
                        flag.level === 'green' && 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      )}
                    >
                      {flag.text}
                    </span>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Thread */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto">
                <DMThread messages={currentThread} brandName={selectedDeal.brand} loading={loading} />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-strong p-4 rounded-xl border border-red-500/20 text-red-400 text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <div ref={threadEndRef} />
              </div>
            </div>

            {/* Composer */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="border-t border-white/[0.05] p-6"
            >
              <div className="max-w-3xl mx-auto">
                {rateReasoning && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-strong p-3 rounded-xl mb-3 text-xs text-white/60 flex items-start gap-2"
                  >
                    <Brain className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span>{rateReasoning}</span>
                  </motion.div>
                )}

                <div className="glass-strong rounded-2xl p-4 border border-white/[0.08]">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    placeholder="AI will generate a strategic response..."
                    className="w-full bg-transparent text-white/90 placeholder:text-white/20 resize-none outline-none text-sm leading-relaxed min-h-[100px]"
                  />

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.05]">
                    <button
                      onClick={generateReply}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Handshake className="w-4 h-4" />
                          <span>Generate Reply</span>
                        </>
                      )}
                    </button>

                    {draft && (
                      <button
                        onClick={sendReply}
                        className="flex items-center gap-2 px-4 py-2 glass-strong rounded-xl text-sm font-medium hover:bg-white/[0.08] transition-all"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>

      {/* Right Sidebar - Intelligence Panel */}
      <AnimatePresence>
        {selectedDeal && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            className="w-96 border-l border-white/[0.05] overflow-y-auto"
          >
            <div className="p-6 space-y-6">
              {/* Memory Panel */}
              <MemoryPanel insights={memoryInsights.slice(0, 4)} />

              {/* Routing Panel */}
              <RoutingPanel route={routeInfo} />

              {/* Activity Feed */}
              <ActivityFeed activities={recentActivity.slice(0, 5)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
