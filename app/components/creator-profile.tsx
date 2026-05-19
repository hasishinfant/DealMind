'use client'

import { motion } from 'framer-motion'
import { MapPin, Mail, AtSign, TrendingUp, Users, Eye, Award } from 'lucide-react'
import type { Creator } from '../data/creator'
import { cn } from '@/lib/utils'

interface CreatorProfileProps {
  creator: Creator
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-2xl p-6 border border-white/[0.08]"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="relative">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-20 h-20 rounded-2xl ring-2 ring-indigo-500/20"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-white mb-1">{creator.name}</h2>
          <p className="text-sm text-indigo-400 mb-2">{creator.username}</p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <MapPin className="w-3 h-3" />
            <span>{creator.location}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
            <Award className="w-3 h-3 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Score: {creator.score.overall}</span>
          </div>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-white/60 leading-relaxed mb-8 whitespace-pre-line">
        {creator.bio}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Followers</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {(creator.stats.followers / 1000).toFixed(1)}K
          </p>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Engagement</span>
          </div>
          <p className="text-xl font-semibold text-emerald-400">
            {creator.stats.engagement}%
          </p>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Avg Views</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {(creator.stats.avgReelViews / 1000).toFixed(0)}K
          </p>
        </div>

        <div className="glass p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[10px] text-white/40 uppercase tracking-wider">Deals</span>
          </div>
          <p className="text-xl font-semibold text-white">
            {creator.stats.totalDeals}
          </p>
        </div>
      </div>

      {/* Niche Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {creator.niche.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full text-xs bg-white/[0.03] border border-white/[0.08] text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4">
        <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
          Creator Score
        </h4>
        <h4 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-4">
          Creator Score
        </h4>
        
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/40">Reliability</span>
          <span className="text-white/80 font-medium">{creator.score.reliability}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${creator.score.reliability}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          />
        </div>

        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/40">Engagement Quality</span>
          <span className="text-white/80 font-medium">{creator.score.engagement}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${creator.score.engagement}%` }}
            transition={{ duration: 1, delay: 0.4 }}
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
          />
        </div>

        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-white/40">Professionalism</span>
          <span className="text-white/80 font-medium">{creator.score.professionalism}%</span>
        </div>
        <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${creator.score.professionalism}%` }}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
          />
        </div>
      </div>

      {/* Contact */}
      <div className="mt-8 pt-6 border-t border-white/[0.05] space-y-3">
        <div className="flex items-center gap-2 text-xs text-white/40">
          <Mail className="w-3 h-3" />
          <span>{creator.contact.email}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-white/40">
          <AtSign className="w-3 h-3" />
          <span>{creator.contact.instagram}</span>
        </div>
      </div>
    </motion.div>
  )
}
