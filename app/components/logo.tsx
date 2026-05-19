interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  className?: string
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-base' },
    md: { icon: 'w-8 h-8', text: 'text-lg' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon - Handshake in Diamond Chat Bubble */}
      <div className={`${icon} relative flex-shrink-0`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Diamond Chat Bubble Shape */}
          <path
            d="M50 5 L90 45 L90 70 L50 95 L10 70 L10 45 Z"
            fill="url(#gradient)"
            stroke="url(#gradient)"
            strokeWidth="2"
          />
          
          {/* Plus/Sparkle accent */}
          <circle cx="75" cy="25" r="3" fill="url(#gradient)" />
          <path
            d="M75 18 L75 32 M68 25 L82 25"
            stroke="url(#gradient)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          
          {/* Handshake Icon */}
          <g transform="translate(30, 35)">
            {/* Left hand */}
            <path
              d="M5 15 L5 20 L10 20 L10 15 L15 15 L15 10 L10 10"
              fill="white"
              opacity="0.9"
            />
            {/* Right hand */}
            <path
              d="M35 15 L35 20 L30 20 L30 15 L25 15 L25 10 L30 10"
              fill="white"
              opacity="0.9"
            />
            {/* Handshake connection */}
            <rect x="10" y="12" width="20" height="6" rx="2" fill="white" opacity="0.9" />
            {/* Fingers detail */}
            <path
              d="M10 15 L12 13 M14 15 L16 13 M18 15 L20 13"
              stroke="rgba(99, 102, 241, 0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M30 15 L28 13 M26 15 L24 13 M22 15 L20 13"
              stroke="rgba(99, 102, 241, 0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={`${text} font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent`}>
          DealMind
        </span>
      )}
    </div>
  )
}
