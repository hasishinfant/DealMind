'use client'

import { motion } from 'framer-motion'
import { Play, Heart, MessageCircle, Eye } from 'lucide-react'
import type { ContentItem } from '../data/creator'
import { storyHighlights } from '../data/creator'

interface InstagramPreviewProps {
  content: ContentItem[]
}

const gradients = {
  'gradient-1': 'from-pink-500 via-purple-500 to-indigo-500',
  'gradient-2': 'from-amber-500 via-orange-500 to-red-500',
  'gradient-3': 'from-emerald-500 via-teal-500 to-cyan-500',
  'gradient-4': 'from-violet-500 via-purple-500 to-fuchsia-500',
  'gradient-5': 'from-blue-500 via-indigo-500 to-purple-500',
  'gradient-6': 'from-rose-500 via-pink-500 to-purple-500',
  'gradient-purple': 'from-purple-600 to-indigo-600',
  'gradient-pink': 'from-pink-600 to-rose-600',
  'gradient-blue': 'from-blue-600 to-cyan-600',
  'gradient-orange': 'from-orange-600 to-amber-600',
}

export function InstagramPreview({ content }: InstagramPreviewProps) {
  return (
    <div className="space-y-8">
      {/* Story Highlights */}
      <div>
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-5">
          Story Highlights
        </h3>
        <div className="grid grid-cols-4 gap-4">
          {storyHighlights.map((highlight, index) => (
            <motion.div
              key={highlight.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="relative mb-2">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradients[highlight.thumbnail as keyof typeof gradients]} p-0.5`}>
                  <div className="w-full h-full rounded-full bg-[#0A0A0A] flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradients[highlight.thumbnail as keyof typeof gradients]} opacity-60`} />
                  </div>
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-indigo-500 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center">
                  <span className="text-[7px] font-semibold">{highlight.count}</span>
                </div>
              </div>
              <p className="text-[9px] text-white/40 text-center truncate w-full">
                {highlight.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div>
        <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider mb-5">
          Recent Content
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => item.url && window.open(item.url, '_blank')}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
            >
              {/* Image or Gradient Background */}
              {item.thumbnail.startsWith('http') ? (
                <img
                  src={item.thumbnail}
                  alt={`Content ${item.id}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to gradient if image fails to load
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                    const parent = target.parentElement
                    if (parent) {
                      const gradientDiv = document.createElement('div')
                      gradientDiv.className = `absolute inset-0 bg-gradient-to-br ${gradients[`gradient-${(parseInt(item.id) % 6) + 1}` as keyof typeof gradients]}`
                      parent.insertBefore(gradientDiv, parent.firstChild)
                    }
                  }}
                />
              ) : (
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[item.thumbnail as keyof typeof gradients]}`} />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              
              {/* Type Indicator */}
              {item.type === 'reel' && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 text-white fill-white" />
                </div>
              )}

              {/* Stats Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span className="text-xs font-semibold">
                      {(item.likes / 1000).toFixed(1)}K
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span className="text-xs font-semibold">{item.comments}</span>
                  </div>
                </div>
              </div>

              {/* Views Badge */}
              {item.type === 'reel' && (
                <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full">
                  <Eye className="w-2.5 h-2.5 text-white" />
                  <span className="text-[9px] font-semibold text-white">
                    {(item.views / 1000).toFixed(0)}K
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
