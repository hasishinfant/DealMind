# DealMind Changelog

## Latest Update - Instagram OAuth & Claude API Removal

### ✨ New Features

#### 1. Instagram OAuth Authentication
- **Login Page** (`/login`): Premium dark mode login interface with deALMIND branding
- **OAuth Flow**: Complete Instagram OAuth 2.0 implementation
- **Demo Mode**: Automatic fallback for development without OAuth setup
- **Session Management**: Secure cookie-based authentication
- **Logout**: Clean logout functionality with session clearing

#### 2. Authentication Middleware
- **Protected Routes**: Automatic redirect to login for unauthenticated users
- **Session Validation**: Cookie-based session checking
- **Smart Redirects**: Prevents authenticated users from accessing login page

### 🔧 Technical Changes

#### API Routes
- ✅ **Created**: `/api/auth/callback` - Instagram OAuth callback handler
- ✅ **Created**: `/api/auth/logout` - Session termination endpoint
- ✅ **Updated**: `/api/negotiate` - Now uses Groq exclusively

#### Libraries
- ✅ **Updated**: `lib/cascadeflow.ts` - Removed Claude API dependency
  - Changed from: Groq (classify) → Claude (draft)
  - Changed to: Groq 8B (classify) → Groq 70B (draft)
  - Cost savings still tracked and displayed

#### Environment Variables
- ❌ **Removed**: `ANTHROPIC_API_KEY`
- ✅ **Added**: `INSTAGRAM_CLIENT_ID`
- ✅ **Added**: `INSTAGRAM_CLIENT_SECRET`
- ✅ **Added**: `NEXT_PUBLIC_INSTAGRAM_CLIENT_ID`
- ✅ **Added**: `NEXT_PUBLIC_APP_URL`

### 🎨 UI/UX Improvements

#### Login Page Features
- Premium glassmorphism design
- Animated gradient background
- deALMIND logo with Sparkles icon
- Instagram OAuth button with gradient
- Feature highlights (Security, Access, Negotiations)
- Smooth Framer Motion animations
- Responsive layout

#### Main App Updates
- Added logout button in sidebar
- Maintains all existing functionality
- No breaking changes to existing features

### 📁 New Files
```
dealmind/
├── app/
│   ├── login/
│   │   └── page.tsx              # Login page component
│   └── api/
│       └── auth/
│           ├── callback/
│           │   └── route.ts      # OAuth callback handler
│           └── logout/
│               └── route.ts      # Logout endpoint
├── middleware.ts                  # Auth middleware
├── INSTAGRAM_OAUTH_SETUP.md      # OAuth setup guide
└── CHANGELOG.md                   # This file
```

### 🔒 Security Enhancements
- HTTP-only cookies for session tokens
- Secure cookie flags in production
- SameSite cookie protection
- Protected API routes
- Session expiration (60 days)

### 🚀 Model Routing Updates

#### Previous Flow
```
Groq llama-3.1-8b (classify) → Claude Sonnet (draft)
Cost: $0.003-0.015 per 1K tokens
```

#### New Flow
```
Groq llama-3.1-8b (classify) → Groq llama-3.1-70b (draft)
Cost: $0.00005-0.00079 per 1K tokens
Savings: ~95% cost reduction
```

### 📊 Cost Comparison
| Model | Input (per 1K) | Output (per 1K) |
|-------|----------------|-----------------|
| Groq 8B | $0.00005 | $0.00008 |
| Groq 70B | $0.00059 | $0.00079 |
| ~~Claude Sonnet~~ | ~~$0.003~~ | ~~$0.015~~ |

### 🧪 Testing

#### Demo Mode (No Setup Required)
1. Start the app: `npm run dev`
2. Navigate to `http://localhost:3001`
3. Click "Continue with Instagram"
4. Automatically logged in with demo credentials

#### Production Mode (OAuth Setup Required)
1. Follow `INSTAGRAM_OAUTH_SETUP.md`
2. Configure Instagram App in Facebook Developers
3. Update `.env.local` with real credentials
4. Test with Instagram test users

### 🐛 Bug Fixes
- None (new feature implementation)

### ⚠️ Breaking Changes
- **Authentication Required**: All routes now require authentication
- **Claude API Removed**: No longer using Anthropic API
- **Environment Variables**: Must update `.env.local` (see above)

### 📝 Migration Guide

#### For Existing Deployments
1. Remove `ANTHROPIC_API_KEY` from environment
2. Add Instagram OAuth credentials (or use demo mode)
3. Restart the application
4. Test login flow

#### For New Deployments
1. Clone repository
2. Copy `.env.local` template
3. Run `npm install`
4. Run `npm run dev`
5. Access `http://localhost:3001/login`

### 🎯 Next Steps
- [ ] Add Instagram profile sync
- [ ] Implement real-time Instagram DM integration
- [ ] Add Instagram analytics dashboard
- [ ] Implement Instagram post scheduling
- [ ] Add multi-account support

### 📚 Documentation
- See `INSTAGRAM_OAUTH_SETUP.md` for OAuth setup
- See `README.md` for general setup
- See inline code comments for implementation details

---

**Version**: 2.0.0  
**Date**: 2026-05-19  
**Author**: DealMind Team
