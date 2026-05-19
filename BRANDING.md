# DealMind Branding Guide

## Logo

### Design Concept
The DealMind logo features a **handshake inside a diamond-shaped chat bubble**, symbolizing:
- **Handshake**: Deal-making, negotiation, partnership
- **Diamond Shape**: Premium quality, value, clarity
- **Chat Bubble**: Communication, conversation, AI agent
- **Sparkle/Plus**: AI intelligence, enhancement, innovation

### Color Palette

#### Primary Gradient
```css
/* Cyan to Purple to Indigo */
from: #06b6d4 (cyan-500)
via: #8b5cf6 (purple-500)
to: #6366f1 (indigo-500)
```

#### Background Colors
```css
Primary Background: #0A0A0A (near black)
Card Background: rgba(255, 255, 255, 0.03) - rgba(255, 255, 255, 0.06)
Border: rgba(255, 255, 255, 0.05) - rgba(255, 255, 255, 0.08)
```

#### Text Colors
```css
Primary Text: #FFFFFF (white)
Secondary Text: rgba(255, 255, 255, 0.8)
Muted Text: rgba(255, 255, 255, 0.4)
Disabled Text: rgba(255, 255, 255, 0.2)
```

#### Accent Colors
```css
Success: #10b981 (emerald-500)
Warning: #f59e0b (amber-500)
Error: #ef4444 (red-500)
Info: #3b82f6 (blue-500)
```

### Logo Sizes

#### Small (sm)
- Icon: 24px × 24px (w-6 h-6)
- Text: 16px (text-base)
- Use: Navigation items, small buttons

#### Medium (md) - Default
- Icon: 32px × 32px (w-8 h-8)
- Text: 18px (text-lg)
- Use: Sidebar header, cards

#### Large (lg)
- Icon: 48px × 48px (w-12 h-12)
- Text: 24px (text-2xl)
- Use: Empty states, modals

#### Extra Large (xl)
- Icon: 64px × 64px (w-16 h-16)
- Text: 36px (text-4xl)
- Use: Login page, splash screens

### Logo Usage

#### With Text (Default)
```tsx
<Logo size="md" showText={true} />
```

#### Icon Only
```tsx
<Logo size="md" showText={false} />
```

#### Custom Styling
```tsx
<Logo size="lg" showText={true} className="opacity-80" />
```

## Typography

### Font Family
```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Text Hierarchy
```css
H1: text-4xl (36px) font-bold
H2: text-2xl (24px) font-semibold
H3: text-xl (20px) font-semibold
H4: text-lg (18px) font-medium
Body: text-sm (14px) font-normal
Caption: text-xs (12px) font-normal
```

## UI Components

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.glass-strong {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### Buttons

#### Primary Button
```tsx
className="bg-gradient-to-r from-indigo-500 to-purple-500 
           hover:from-indigo-600 hover:to-purple-600 
           text-white font-medium px-4 py-2 rounded-xl 
           transition-all"
```

#### Secondary Button
```tsx
className="glass-strong hover:bg-white/[0.08] 
           text-white/80 font-medium px-4 py-2 rounded-xl 
           transition-all"
```

#### Instagram Button
```tsx
className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
           hover:shadow-lg hover:shadow-purple-500/20 
           text-white font-medium px-6 py-4 rounded-xl 
           transition-all"
```

### Cards
```tsx
className="glass-strong rounded-2xl p-6 
           border border-white/[0.08]"
```

### Badges
```tsx
// Success
className="bg-emerald-500/10 text-emerald-400 
           border border-emerald-500/20 
           px-3 py-1.5 rounded-full text-xs"

// Warning
className="bg-amber-500/10 text-amber-400 
           border border-amber-500/20 
           px-3 py-1.5 rounded-full text-xs"

// Error
className="bg-red-500/10 text-red-400 
           border border-red-500/20 
           px-3 py-1.5 rounded-full text-xs"
```

## Animation

### Framer Motion Presets

#### Fade In
```tsx
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}
```

#### Slide Up
```tsx
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }}
```

#### Scale In
```tsx
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
```

#### Hover Scale
```tsx
whileHover={{ scale: 1.05 }}
transition={{ duration: 0.2 }}
```

### Timing
- Fast: 150ms - 200ms (hover states, clicks)
- Normal: 300ms - 400ms (page transitions, modals)
- Slow: 500ms - 600ms (complex animations)

## Icons

### Primary Icon Set
**Lucide React** - Consistent, modern, open-source

### Key Icons
- Logo: Custom handshake in diamond
- Deals: `Handshake`
- AI: `Brain`, `Sparkles`
- Analytics: `BarChart3`, `TrendingUp`
- Settings: `Settings`
- User: `User`
- Content: `Image`
- Social: `AtSign` (Instagram)
- Actions: `Send`, `Loader2`

## Spacing

### Scale
```css
xs: 0.25rem (4px)
sm: 0.5rem (8px)
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
2xl: 3rem (48px)
```

### Component Spacing
- Card padding: p-6 (24px)
- Section gap: gap-6 (24px)
- Button padding: px-4 py-2 (16px 8px)
- Input padding: px-3 py-2 (12px 8px)

## Border Radius

```css
sm: 0.5rem (8px) - badges, small buttons
md: 0.75rem (12px) - buttons, inputs
lg: 1rem (16px) - cards
xl: 1.5rem (24px) - large cards
2xl: 2rem (32px) - modals
full: 9999px - pills, avatars
```

## Shadows

### Glow Effects
```css
.glow-subtle {
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.03);
}

.glow-accent {
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.15);
}

.glow-strong {
  box-shadow: 0 0 40px rgba(139, 92, 246, 0.2);
}
```

## Voice & Tone

### Brand Voice
- **Intelligent**: Showcase AI capabilities
- **Professional**: Business-focused, reliable
- **Empowering**: Help creators succeed
- **Modern**: Cutting-edge technology
- **Friendly**: Approachable, not intimidating

### Writing Style
- Use active voice
- Be concise and clear
- Avoid jargon when possible
- Use "you" to address users
- Emphasize benefits over features

### Example Copy
✅ Good: "Generate smarter replies with AI"
❌ Bad: "Our advanced machine learning algorithms will process your input"

✅ Good: "Your deals, optimized"
❌ Bad: "Optimization of negotiation parameters"

## Accessibility

### Contrast Ratios
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]
```

### Screen Reader Text
```tsx
<span className="sr-only">Descriptive text</span>
```

## File Locations

### Logo Component
```
dealmind/app/components/logo.tsx
```

### Usage Examples
```tsx
// Login page
<Logo size="xl" showText={true} />

// Sidebar
<Logo size="md" showText={true} />

// Empty state
<Logo size="lg" showText={false} className="opacity-20" />
```

## Brand Assets

### Logo Exports
- SVG: Scalable, preferred for web
- PNG: 512×512, 256×256, 128×128, 64×64
- ICO: 32×32, 16×16 for favicon

### Color Exports
- Figma: Use gradient definitions
- CSS: Use Tailwind classes
- Design tools: Export as hex values

## Don'ts

❌ Don't change the logo colors
❌ Don't rotate or distort the logo
❌ Don't add effects to the logo (except opacity)
❌ Don't use the logo on busy backgrounds
❌ Don't use bright neon colors
❌ Don't use multiple gradients in one component
❌ Don't use Comic Sans or decorative fonts
❌ Don't use emojis in UI copy

## Do's

✅ Use the logo consistently
✅ Maintain proper spacing around the logo
✅ Use the gradient for accents and highlights
✅ Keep backgrounds dark and clean
✅ Use glassmorphism for depth
✅ Animate smoothly and purposefully
✅ Test on different screen sizes
✅ Ensure proper contrast for readability

---

**Last Updated**: 2026-05-19  
**Version**: 1.0.0  
**Maintained by**: DealMind Team
