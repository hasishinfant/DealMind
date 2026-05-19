'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, TrendingUp, Shield } from 'lucide-react'
import type { MemoryInsight } from '../data/memories'
import { cn } from '@/lib/utils'

interface MemoryPanelProps {
  insights: MemoryInsight[]
}

const SEVERITY_CONFIG = {
  high: { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  medium: { color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  low: { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

const TYPE_ICONS = {
  pattern: TrendingUp,
  risk: AlertTriangle,
  opportunity: Shield,
  behavior: Brain,
}

function MemoryCard({ insight, index }: { insight: MemoryInsight; index: number }) {
  const [mounted, setMounted] = useState(false)
  const cfg = SEVERITY_CONFIG[insight.severity]
  const Icon = TYPE_ICONS[insight.type]

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        'glass-strong p-4 rounded-xl border glow-subtle',
        cfg.border
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0', cfg.bg)}>
          <Icon className={cn('w-4 h-4', cfg.color)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-medium text-white/90 leading-tight">
              {insight.title}
            </h4>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full', cfg.bg, cfg.color)}>
              {insight.confidence}%
            </span>
          </div>
          <p className="text-[10px] text-white/40 mb-2">{insight.category}</p>
        </div>
      </div>

      <p className="text-xs text-white/60 leading-relaxed">
        {insight.description}
      </p>

      <div className="mt-3 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-white/30 capitalize">{insight.type}</span>
          <span className="text-white/30">
            {mounted ? new Date(insight.timestamp).toLocaleDateString() : ''}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function MemoryPanel({ insights }: MemoryPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Brain className="w-4 h-4 text-purple-400" />
        <h3 className="text-sm font-medium text-white/80">Hindsight Memory</h3>
        <span className="ml-auto text-xs text-white/30">{insights.length} insights</span>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <MemoryCard key={insight.id} insight={insight} index={index} />
        ))}
      </div>

      {insights.length === 0 && (
        <div className="glass-strong p-8 rounded-xl text-center">
          <Brain className="w-8 h-8 text-white/20 mx-auto mb-3" />
          <p className="text-sm text-white/40">No memory insights yet</p>
          <p className="text-xs text-white/20 mt-1">
            Insights will appear as negotiations progress
          </p>
        </div>
      )}
    </div>
  )
}
