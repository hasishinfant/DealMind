import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DealMind - AI Negotiation Agent',
  description: 'AI-powered negotiation agent for creators. Smart deal negotiations with memory recall and intelligent routing.',
  keywords: ['AI', 'negotiation', 'creators', 'influencers', 'brand deals', 'DealMind'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
