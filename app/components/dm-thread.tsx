'use client'

import { motion } from 'framer-motion'
import { Zap, Loader2 } from 'lucide-react'
import type { Message } from '@/types'
import { cn } from '@/lib/utils'

interface DMThreadProps {
  messages: Message[]
  brandName: string
  loading?: boolean
}

function MessageBubble({ msg, brandName }: { msg: Message; brandName: string }) {
  const isBrand = msg.from === 'brand'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col mb-4', isBrand ? 'items-start' : 'items-end')}
    >
      <span className="text-[10px] text-white/30 mb-1.5 px-1">
        {isBrand ? brandName : 'AI Agent'}
      </span>
      <div
        className={cn(
          'max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed',
          isBrand
            ? 'glass-strong text-white/80 rounded-tl-sm'
            : 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-white/90 rounded-tr-sm border border-indigo-500/20'
        )}
      >
        {msg.text}
      </div>
      {msg.routeLabel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5 mt-1.5 text-[10px] text-white/20 px-1"
        >
          <Zap className="w-3 h-3" />
          <span>{msg.routeLabel}</span>
        </motion.div>
      )}
    </motion.div>
  )
}

export function DMThread({ messages, brandName, loading }: DMThreadProps) {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} brandName={brandName} />
      ))}

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 text-white/40 text-sm px-4 py-3"
        >
          <Loader2 className="w-4 h-4 animate-spin" />
          <div className="space-y-1">
            <p className="text-xs">AI is analyzing negotiation context...</p>
            <div className="flex items-center gap-2 text-[10px] text-white/20">
              <span>Recalling memory</span>
              <span>•</span>
              <span>Detecting patterns</span>
              <span>•</span>
              <span>Crafting strategy</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
