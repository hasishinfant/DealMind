'use client'

import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Brain, Zap, Award, Target } from 'lucide-react'
import type { Deal } from '@/types'

interface AnalyticsPanelProps {
  deals: Deal[]
}

export function AnalyticsPanel({ deals }: AnalyticsPanelProps) {
  const closedDeals = deals.filter(d => d.status === 'closed' && d.settledRate)
  const totalEarned = closedDeals.reduce((sum, d) => sum + (d.settledRate ?? 0), 0)
  const totalOffered = closedDeals.reduce((sum, d) => sum + d.offeredRate, 0)
  const avgUplift = totalOffered > 0 ? Math.round(((totalEarned - totalOffered) / totalOffered) * 100) : 0
  const winRate = deals.length > 0 ? Math.round((closedDeals.length / deals.length) * 100) : 0

  const stats = [
    {
      label: 'Total Revenue',
      value: `$${totalEarned.toLocaleString()}`,
      change: `${closedDeals.length} deals`,
      icon: DollarSign,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      label: 'Avg Uplift',
      value: `${avgUplift}%`,
      change: 'vs opening offers',
      icon: TrendingUp,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
    },
    {
      label: 'Win Rate',
      value: `${winRate}%`,
      change: `${closedDeals.length}/${deals.length} closed`,
      icon: Target,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      label: 'Memory Recalls',
      value: '127',
      change: 'total insights',
      icon: Brain,
      color: 'text-pink-400',
      bg: 'bg-pink-500/10',
    },
    {
      label: 'Cost Saved',
      value: '81%',
      change: 'via routing',
      icon: Zap,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10',
    },
    {
      label: 'Creator Score',
      value: '92',
      change: 'reliability',
      icon: Award,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/80">Performance Analytics</h3>
        <span className="text-xs text-white/30">Last 30 days</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass-strong p-4 rounded-xl border border-white/[0.05]"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', stat.bg)}>
                  <Icon className={cn('w-4 h-4', stat.color)} />
                </div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-semibold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-white/30">{stat.change}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Category Breakdown */}
      <div className="glass-strong p-4 rounded-xl border border-white/[0.05] mt-4">
        <h4 className="text-xs font-medium text-white/60 uppercase tracking-wider mb-4">
          Top Categories
        </h4>
        <div className="space-y-3">
          {[
            { name: 'Skincare', deals: 5, revenue: 3200, color: 'from-pink-500 to-rose-500' },
            { name: 'Fashion', deals: 3, revenue: 2400, color: 'from-purple-500 to-indigo-500' },
            { name: 'Tech', deals: 2, revenue: 2300, color: 'from-blue-500 to-cyan-500' },
          ].map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/60">{cat.name}</span>
                <span className="text-white/80 font-semibold">${cat.revenue.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(cat.revenue / 3200) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  className={`h-full bg-gradient-to-r ${cat.color} rounded-full`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
