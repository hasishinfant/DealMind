# DealMind

AI-powered negotiation agent for creators and influencers. DealMind uses intelligent memory (Hindsight) and smart model routing (Cascadeflow) to negotiate better brand deals.

## 🚀 Quick Start

### Demo Mode (No Setup Required)

```bash
cd dealmind
npm install
npm run dev
```

Visit `http://localhost:3001` and click "Continue with Instagram" to access the demo.

### Features

- 🤖 **AI Negotiation**: Smart reply generation for brand deals
- 🧠 **Memory System**: Learns from past negotiations (Hindsight)
- ⚡ **Smart Routing**: Cost-optimized model selection (Cascadeflow)
- 📊 **Analytics**: Track deals, engagement, and performance
- 🎨 **Premium UI**: Modern dark mode interface
- 🔐 **Instagram OAuth**: Secure authentication

## 📋 Project Structure

```
dealmind/
├── app/
│   ├── api/
│   │   ├── negotiate/route.ts    # AI negotiation endpoint
│   │   ├── memory/route.ts       # Hindsight memory API
│   │   └── auth/                 # Instagram OAuth
│   ├── components/               # React components
│   ├── data/                     # Mock data
│   ├── login/                    # Login page
│   └── page.tsx                  # Main app
├── lib/
│   ├── cascadeflow.ts           # Model routing logic
│   ├── hindsight.ts             # Memory integration
│   └── utils.ts                 # Utilities
└── types/index.ts               # TypeScript types
```

## 🔧 Configuration

### Environment Variables

Copy `.env.local` and update:

```bash
# Required
GROQ_API_KEY=your_groq_api_key

# Optional (for production)
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_PIPELINE_ID=your_pipeline_id
```

### Instagram OAuth Setup

See [INSTAGRAM_OAUTH_SETUP.md](./INSTAGRAM_OAUTH_SETUP.md) for detailed instructions.

## 🎯 How It Works

### 1. Authentication

- Login with Instagram (or use demo mode)
- Secure session management with cookies

### 2. Deal Pipeline

- View active brand negotiations
- Track deal stages and status
- Monitor engagement metrics

### 3. AI Negotiation

- Select a deal from the pipeline
- Click "Generate Reply" for AI-powered responses
- Edit and send negotiation messages
- AI learns from conversation history

### 4. Smart Routing (Cascadeflow)

- Classifies message complexity with Groq 8B
- Routes to appropriate model (8B or 70B)
- Tracks cost savings vs. premium models
- Displays routing decisions in UI

### 5. Memory System (Hindsight)

- Stores negotiation history
- Recalls relevant past deals
- Provides strategic context
- Improves over time

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **AI Models**: Groq (Llama 3.1)
- **Memory**: Hindsight API
- **Auth**: Instagram OAuth 2.0

## 📊 Model Routing

| Model | Use Case | Cost (per 1K tokens) |
|-------|----------|---------------------|
| Groq 8B | Classification, Simple replies | $0.00005-0.00008 |
| Groq 70B | Complex negotiations | $0.00059-0.00079 |

Average savings: **~95%** vs. premium models

## 🎨 UI Features

- **4-Column Layout**: Profile, Pipeline, Thread, Intelligence
- **Glassmorphism**: Premium dark mode design
- **Smooth Animations**: Framer Motion transitions
- **Real-time Updates**: Live negotiation thread
- **Instagram Preview**: Content grid with real thumbnails
- **Analytics Dashboard**: Deal metrics and insights

## 🔐 Security

- HTTP-only cookies for sessions
- Secure OAuth 2.0 flow
- Environment variable protection
- HTTPS in production
- Rate limiting ready

## 📱 Pages

### `/login`

- Instagram OAuth login
- Demo mode fallback
- Premium branding

### `/` (Main App)

- Creator profile with stats
- Instagram content preview
- Deal pipeline management
- AI negotiation interface
- Memory insights panel
- Activity feed

## 🚢 Deployment

### Vercel (Recommended)

```bash
vercel deploy
```

### Environment Variables (Production)

Set in Vercel dashboard:

- `GROQ_API_KEY`
- `INSTAGRAM_CLIENT_ID`
- `INSTAGRAM_CLIENT_SECRET`
- `NEXT_PUBLIC_INSTAGRAM_CLIENT_ID`
- `NEXT_PUBLIC_APP_URL`
- `HINDSIGHT_API_KEY`
- `HINDSIGHT_PIPELINE_ID`

## 📝 API Endpoints

### `POST /api/negotiate`

Generate AI negotiation response

```json
{
  "brand": "Nova Skin",
  "category": "Skincare",
  "offeredRate": 300,
  "conversationHistory": [...],
  "latestMessage": "..."
}
```

### `POST /api/memory/write`

Store negotiation memory

```json
{
  "dealId": "nova-skin",
  "content": "...",
  "metadata": {...}
}
```

### `POST /api/memory/read`

Query negotiation history

```json
{
  "query": "skincare brand negotiations",
  "limit": 5
}
```

## 🧪 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📚 Documentation

- [Instagram OAuth Setup](./INSTAGRAM_OAUTH_SETUP.md)
- [Changelog](./CHANGELOG.md)

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- **Groq**: Fast AI inference
- **Hindsight**: Memory infrastructure
- **Instagram**: Creator authentication
- **Vercel**: Hosting platform

---

Built with ❤️ for creators by the DealMind team
