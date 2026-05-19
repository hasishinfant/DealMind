'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Clock, CheckCircle2, X } from 'lucide-react'
import type { Deal, DealStatus } from '@/types'
import { cn } from '@/lib/utils'

interface DealPipelineProps {
  deals: Deal[]
  selectedId: string | null
  onSelectDeal: (id: string) => void
}

const STATUS_CONFIG: Record<DealStatus, { label: string; color: string; bg: string; icon: any }> = {
  new: { label: 'New DMs', color: 'text-blue-400', bg: 'bg-blue-500/10', icon: Clock },
  negotiating: { label: 'Negotiating', color: 'text-amber-400', bg: 'bg-amber-500/10', icon: AlertTriangle },
  closed: { label: 'Closed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', icon: CheckCircle2 },
  rejected: { label: 'Rejected', color: 'text-gray-500', bg: 'bg-gray-500/10', icon: X },
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 3600) return `${Math.round(diff / 60)}m`
  if (diff < 86400) return `${Math.round(diff / 3600)}h`
  return `${Math.round(diff / 86400)}d`
}

function DealCard({ deal, active, onClick }: { deal: Deal; active: boolean; onClick: () => void }) {
  const cfg = STATUS_CONFIG[deal.status]
  const Icon = cfg.icon
  const isUrgent = deal.status === 'new' && Date.now() - new Date(deal.createdAt).getTime() < 86400000

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      onClick={onClick}
      className={cn(
        'relative p-3 rounded-xl cursor-pointer transition-all duration-200',
        'glass border',
        active
          ? 'border-indigo-500/50 bg-indigo-500/5 glow-accent'
          : 'border-white/[0.05] hover:border-white/[0.1] hover:bg-white/[0.02]'
      )}
    >
      {isUrgent && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white/90 truncate">{deal.brand}</h3>
          <p className="text-xs text-white/40 mt-0.5">{deal.category}</p>
        </div>
        <Icon className={cn('w-4 h-4 flex-shrink-0 ml-2', cfg.color)} />
      </div>

      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-white/80">
          ${deal.status === 'closed' && deal.settledRate ? deal.settledRate.toLocaleString() : deal.offeredRate.toLocaleString()}
        </span>
        <span className="text-white/30">{timeAgo(deal.createdAt)}</span>
      </div>

      {deal.status === 'closed' && deal.settledRate && deal.settledRate > deal.offeredRate && (
        <div className="mt-2 pt-2 border-t border-white/[0.05]">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-white/40">Uplift</span>
            <span className="text-emerald-400 font-semibold">
              +{Math.round(((deal.settledRate - deal.offeredRate) / deal.offeredRate) * 100)}%
            </span>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export function DealPipeline({ deals, selectedId, onSelectDeal }: DealPipelineProps) {
  const grouped: Record<DealStatus, Deal[]> = {
    new: deals.filter((d) => d.status === 'new'),
    negotiating: deals.filter((d) => d.status === 'negotiating'),
    closed: deals.filter((d) => d.status === 'closed'),
    rejected: deals.filter((d) => d.status === 'rejected'),
  }

  return (
    <div className="space-y-6">
      {(Object.keys(grouped) as DealStatus[]).map((status) => {
        const cfg = STATUS_CONFIG[status]
        const dealsInStatus = grouped[status]

        if (dealsInStatus.length === 0) return null

        return (
          <div key={status}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={cn('w-2 h-2 rounded-full', cfg.bg)} />
                <h3 className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  {cfg.label}
                </h3>
              </div>
              <span className="text-xs text-white/30">{dealsInStatus.length}</span>
            </div>

            <div className="space-y-2">
              {dealsInStatus.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  active={selectedId === deal.id}
                  onClick={() => onSelectDeal(deal.id)}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
