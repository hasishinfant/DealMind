'use client'

import { motion } from 'framer-motion'
import { AtSign, Shield, Zap, TrendingUp } from 'lucide-react'
import { Logo } from '../components/logo'

export default function LoginPage() {
  const handleInstagramLogin = () => {
    // For demo purposes, if Instagram OAuth is not configured, redirect to main app
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID
    
    if (!clientId || clientId === 'your_instagram_client_id') {
      // Demo mode - skip OAuth and go directly to app
      document.cookie = 'instagram_token=demo_token; path=/; max-age=86400'
      document.cookie = 'instagram_user={"username":"demo_user","id":"demo"}; path=/; max-age=86400'
      window.location.href = '/'
      return
    }
    
    // Production mode - use real Instagram OAuth
    const redirectUri = encodeURIComponent(`${window.location.origin}/api/auth/callback`)
    const scope = 'user_profile,user_media'
    
    window.location.href = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Logo size="xl" showText={true} />
          </div>
          <p className="text-white/40 text-sm">
            AI-powered negotiation agent for creators
          </p>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl p-8 border border-white/[0.08]"
        >
          <h2 className="text-2xl font-semibold mb-2">Welcome back</h2>
          <p className="text-white/40 text-sm mb-8">
            Sign in with your Instagram account to continue
          </p>

          {/* Instagram Login Button */}
          <button
            onClick={handleInstagramLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all group"
          >
            <AtSign className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Continue with Instagram</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/[0.05]" />
            <span className="text-xs text-white/30">Why Instagram?</span>
            <div className="flex-1 h-px bg-white/[0.05]" />
          </div>

          {/* Features */}
          <div className="space-y-4">
            {[
              {
                icon: Shield,
                title: 'Secure Authentication',
                description: 'OAuth 2.0 protected login',
              },
              {
                icon: Zap,
                title: 'Instant Access',
                description: 'Connect your creator profile',
              },
              {
                icon: TrendingUp,
                title: 'Smart Negotiations',
                description: 'AI learns from your deals',
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white/80">{feature.title}</p>
                    <p className="text-xs text-white/40">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-white/30 mt-8"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
        </motion.p>
      </div>
    </div>
  )
}
