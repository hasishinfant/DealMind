'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Brain, CheckCircle2, Zap, TrendingUp } from 'lucide-react'
import type { ActivityItem } from '../data/memories'

interface ActivityFeedProps {
  activities: ActivityItem[]
}

const ICON_MAP = {
  message: MessageCircle,
  memory: Brain,
  deal: CheckCircle2,
  routing: Zap,
  'trending-up': TrendingUp,
}

const TYPE_CONFIG = {
  message: { color: 'text-blue-400', bg: 'bg-blue-500/10' },
  memory: { color: 'text-purple-400', bg: 'bg-purple-500/10' },
  deal: { color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  routing: { color: 'text-teal-400', bg: 'bg-teal-500/10' },
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.round(diff / 60)}m ago`
  if (diff < 86400) return `${Math.round(diff / 3600)}h ago`
  return `${Math.round(diff / 86400)}d ago`
}

function ActivityCard({ activity, index }: { activity: ActivityItem; index: number }) {
  const [mounted, setMounted] = useState(false)
  const Icon = ICON_MAP[activity.icon as keyof typeof ICON_MAP] || MessageCircle
  const cfg = TYPE_CONFIG[activity.type]

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-strong p-3 rounded-xl border border-white/[0.05] hover:border-white/[0.1] transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
          <Icon className={`w-4 h-4 ${cfg.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white/80 font-medium mb-0.5">
            {activity.title}
          </p>
          <p className="text-xs text-white/40 mb-1">
            {activity.description}
          </p>
          <span className="text-[10px] text-white/20">
            {mounted ? timeAgo(activity.timestamp) : ''}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/80">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-white/30">Live</span>
        </div>
      </div>

      <div className="space-y-2">
        {activities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </div>
  )
}
