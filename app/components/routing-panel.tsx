'use client'

import { motion } from 'framer-motion'
import { Zap, ArrowRight, DollarSign, Clock } from 'lucide-react'
import type { RouteInfo } from '@/types'

interface RoutingPanelProps {
  route: RouteInfo | null
}

export function RoutingPanel({ route }: RoutingPanelProps) {
  if (!route) {
    return (
      <div className="glass-strong p-6 rounded-xl border border-white/[0.08] text-center">
        <Zap className="w-8 h-8 text-white/20 mx-auto mb-3" />
        <p className="text-sm text-white/40">No routing data yet</p>
        <p className="text-xs text-white/20 mt-1">
          Generate a reply to see AI routing
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-strong p-5 rounded-xl border border-teal-500/10"
    >
      <div className="flex items-center gap-2 mb-5">
        <Zap className="w-4 h-4 text-teal-400" />
        <h3 className="text-sm font-medium text-white/80">Cascadeflow Routing</h3>
      </div>

      {/* Routing Flow */}
      <div className="space-y-4 mb-5">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-0.5">Classification</p>
            <p className="text-sm text-white/80 font-mono">{route.classifyModel}</p>
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <ArrowRight className="w-4 h-4 text-white/20" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <div className="flex-1">
            <p className="text-xs text-white/40 mb-0.5">Negotiation Draft</p>
            <p className="text-sm text-white/80 font-mono">{route.draftModel}</p>
          </div>
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 pt-4 border-t border-white/[0.05]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <DollarSign className="w-3 h-3" />
            <span>Cost Optimization</span>
          </div>
          <span className="text-sm font-semibold text-teal-400">
            {route.savedPercent}%
          </span>
        </div>

        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${route.savedPercent}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="glass p-2 rounded-lg">
            <p className="text-[10px] text-white/40 mb-1">Latency</p>
            <p className="text-xs font-semibold text-white/80">~1.2s</p>
          </div>
          <div className="glass p-2 rounded-lg">
            <p className="text-[10px] text-white/40 mb-1">Tokens</p>
            <p className="text-xs font-semibold text-white/80">~850</p>
          </div>
        </div>
      </div>

      {/* Intelligence Badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 p-3 rounded-lg bg-gradient-to-r from-teal-500/10 to-emerald-500/10 border border-teal-500/20"
      >
        <p className="text-xs text-teal-400 text-center">
          ✨ Intelligent routing saved ${((route.savedPercent / 100) * 0.05).toFixed(3)} on this request
        </p>
      </motion.div>
    </motion.div>
  )
}
