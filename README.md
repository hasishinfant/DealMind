# DealMind

### AI negotiation intelligence for creators.

🚀 Live Demo: https://deal-mind-rho.vercel.app/

Creators lose thousands in brand deals — not because they lack talent, but because they negotiate blindly.

Brands lowball.
Usage rights get buried.
Payments get delayed.
Revision requests spiral out of control.

And every negotiation starts from zero.

## DealMind changes that.

DealMind is an AI-powered negotiation agent that remembers every brand interaction, learns negotiation patterns over time, and helps creators secure smarter, safer, and higher-paying partnerships.

Instead of generic AI replies, DealMind uses persistent memory through Hindsight to recall:

* past payment behavior
* settlement trends
* revision abuse
* creator preferences
* category negotiation patterns

By the fifth negotiation, the agent no longer responds like a chatbot — it negotiates like a manager that knows your history.

Using cascadeflow runtime intelligence, DealMind routes tasks through optimized AI pipelines:

* fast models for classification
* stronger models for negotiation drafting
* fallback layers for cost protection

## Result

* smarter negotiations
* lower AI costs
* faster responses
* persistent strategic memory

---

# Example

### Without memory

> “Thanks! My rate is $450.”

### With DealMind

> “Based on previous campaigns, we’d require NET-30 payment terms and a strict 2-revision cap. My standard rate for this package is $750 including limited usage rights.”

DealMind transforms AI from:

> reactive assistant

into:

> persistent negotiation intelligence.

Built for the modern creator economy.

---

# Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

## AI Infrastructure

* Groq API
* Hindsight Memory
* cascadeflow Runtime Intelligence

## Models

* llama-3.1-8b-instant
* llama-3.3-70b-versatile

## Features

* Persistent negotiation memory
* Brand risk intelligence
* AI-powered counter offers
* Runtime model routing
* Negotiation analytics
* Creator preference learning
* Cost optimization layer
* Memory evolution engine

---

# Environment Variables

```env
NODE_ENV=development
PORT=3001

# Groq
GROQ_API_KEY=your_groq_api_key

# Hindsight
HINDSIGHT_API_KEY=your_hindsight_api_key
HINDSIGHT_PIPELINE_ID=your_pipeline_id

# Runtime
NEXT_PUBLIC_APP_NAME=DealMind
```

---

# Architecture


```bash
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
│
├── lib/
│   ├── cascadeflow.ts            # Model routing logic
│   ├── hindsight.ts              # Memory integration
│   └── utils.ts                  # Utilities
│
└── types/
    └── index.ts                  # TypeScript types
```

---

# Core Workflow

1. Brand sends partnership DM
2. DealMind analyzes negotiation leverage
3. Hindsight recalls previous brand behavior
4. cascadeflow routes request through optimized AI layers
5. AI drafts strategic negotiation response
6. Negotiation outcome gets stored into persistent memory
7. Future negotiations become smarter automatically

---

# Why DealMind

Most creator tools help manage content.

DealMind helps creators protect leverage.

It remembers:

* who paid late
* who lowballs
* who abuses revisions
* which categories negotiate fairly
* how creators prefer to negotiate

Because creators should negotiate with intelligence — not guesswork.

