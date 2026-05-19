export interface Creator {
  id: string
  name: string
  username: string
  avatar: string
  bio: string
  location: string
  niche: string[]
  stats: {
    followers: number
    engagement: number
    avgReelViews: number
    totalDeals: number
    activePartnerships: number
  }
  audience: {
    topCountries: string[]
    ageRange: string
    genderSplit: { male: number; female: number }
  }
  score: {
    overall: number
    reliability: number
    engagement: number
    professionalism: number
  }
  contact: {
    email: string
    instagram: string
  }
}

export const creator: Creator = {
  id: 'maya-chen',
  name: 'Maya Chen',
  username: '@mayadigital',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya&backgroundColor=b6e3f4',
  bio: 'fashion • skincare • creator diaries\ncollabs → management@mayadigital.co\nLA / Bangalore',
  location: 'Los Angeles, CA',
  niche: ['Fashion', 'Skincare', 'Lifestyle'],
  stats: {
    followers: 20400,
    engagement: 4.8,
    avgReelViews: 48000,
    totalDeals: 47,
    activePartnerships: 3,
  },
  audience: {
    topCountries: ['United States', 'India', 'United Kingdom'],
    ageRange: '18-34',
    genderSplit: { male: 32, female: 68 },
  },
  score: {
    overall: 92,
    reliability: 95,
    engagement: 88,
    professionalism: 94,
  },
  contact: {
    email: 'management@mayadigital.co',
    instagram: '@mayadigital',
  },
}

export interface ContentItem {
  id: string
  type: 'reel' | 'post' | 'story'
  thumbnail: string
  views: number
  likes: number
  comments: number
  timestamp: string
  url?: string
}

export const recentContent: ContentItem[] = [
  {
    id: '1',
    type: 'reel',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop',
    views: 52000,
    likes: 2400,
    comments: 180,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    url: 'https://www.instagram.com/reel/DVqjzY8kvTF/',
  },
  {
    id: '2',
    type: 'reel',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    views: 48000,
    likes: 2200,
    comments: 165,
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    url: 'https://www.instagram.com/reel/DYFESabyww2/',
  },
  {
    id: '3',
    type: 'reel',
    thumbnail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    views: 61000,
    likes: 2900,
    comments: 210,
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    url: 'https://www.instagram.com/reel/DXbr7mIydk4/',
  },
  {
    id: '4',
    type: 'reel',
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop',
    views: 44000,
    likes: 2100,
    comments: 148,
    timestamp: new Date(Date.now() - 345600000).toISOString(),
    url: 'https://www.instagram.com/reel/DXO156sydyR/',
  },
  {
    id: '5',
    type: 'post',
    thumbnail: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
    views: 18000,
    likes: 1950,
    comments: 105,
    timestamp: new Date(Date.now() - 432000000).toISOString(),
    url: 'https://www.instagram.com/p/DYH3s59GJD8/',
  },
  {
    id: '6',
    type: 'reel',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
    views: 44000,
    likes: 2100,
    comments: 148,
    timestamp: new Date(Date.now() - 518400000).toISOString(),
    url: 'https://www.instagram.com/reel/DVqjzY8kvTF/',
  },
]

export const storyHighlights = [
  { id: '1', name: 'Fashion', thumbnail: 'gradient-purple', count: 24 },
  { id: '2', name: 'Skincare', thumbnail: 'gradient-pink', count: 18 },
  { id: '3', name: 'Travel', thumbnail: 'gradient-blue', count: 12 },
  { id: '4', name: 'BTS', thumbnail: 'gradient-orange', count: 31 },
]
