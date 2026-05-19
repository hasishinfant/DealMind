# Push DealMind to GitHub

Your code is ready to push! Follow these steps:

## Option 1: Create Repository via GitHub Website (Recommended)

### Step 1: Create a New Repository on GitHub
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `dealmind` (or your preferred name)
3. Description: `AI-powered negotiation agent for creators`
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click **Create repository**

### Step 2: Push Your Code
After creating the repository, run these commands in your terminal:

```bash
cd dealmind

# Add the GitHub repository as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/dealmind.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Verify
Visit your repository at: `https://github.com/YOUR_USERNAME/dealmind`

---

## Option 2: Using GitHub CLI (If Installed)

If you have GitHub CLI installed, you can create and push in one command:

```bash
cd dealmind

# Create repository and push
gh repo create dealmind --public --source=. --remote=origin --push

# Or for private repository
gh repo create dealmind --private --source=. --remote=origin --push
```

---

## What's Included in This Push

✅ **36 files** with **6,372 lines of code**

### Key Features
- ✨ Custom DealMind logo with handshake design
- 🔐 Instagram OAuth authentication
- 🤖 AI negotiation with Groq models
- 🧠 Hindsight memory integration
- ⚡ Smart model routing (Cascadeflow)
- 📊 Analytics and deal pipeline
- 🎨 Premium dark mode UI
- 📱 Responsive design

### Documentation
- `README.md` - Complete setup guide
- `BRANDING.md` - Brand guidelines
- `CHANGELOG.md` - Version history
- `INSTAGRAM_OAUTH_SETUP.md` - OAuth setup guide

### Security
- ✅ `.gitignore` configured
- ✅ `.env.local` excluded from git
- ✅ API keys protected
- ✅ Sensitive files ignored

---

## After Pushing

### Set Up GitHub Secrets (for deployment)
If deploying to Vercel or other platforms:

1. Go to your repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Add these secrets:
   - `GROQ_API_KEY`
   - `INSTAGRAM_CLIENT_ID`
   - `INSTAGRAM_CLIENT_SECRET`
   - `HINDSIGHT_API_KEY`
   - `HINDSIGHT_PIPELINE_ID`

### Enable GitHub Pages (Optional)
For documentation hosting:
1. Go to repository **Settings** → **Pages**
2. Source: Deploy from branch `main`
3. Folder: `/docs` or `/` (root)

### Add Topics
Add relevant topics to your repository:
- `ai`
- `negotiation`
- `creators`
- `influencers`
- `nextjs`
- `typescript`
- `groq`
- `instagram-oauth`

---

## Troubleshooting

### Authentication Issues
If you get authentication errors:

```bash
# Use SSH instead of HTTPS
git remote set-url origin git@github.com:YOUR_USERNAME/dealmind.git
```

Or configure GitHub credentials:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Permission Denied
Make sure you're logged into GitHub and have permission to create repositories.

### Large Files Warning
If you get warnings about large files, they're likely in `node_modules/` which is already ignored.

---

## Next Steps After Push

1. **Add Repository Description** on GitHub
2. **Add Topics/Tags** for discoverability
3. **Enable Issues** for bug tracking
4. **Set up Branch Protection** for main branch
5. **Add Collaborators** if working in a team
6. **Deploy to Vercel** for live demo
7. **Add Status Badges** to README

---

## Quick Deploy to Vercel

After pushing to GitHub:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd dealmind
vercel

# Follow the prompts to link your GitHub repository
```

Or use the Vercel dashboard:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure environment variables
4. Deploy!

---

**Need Help?**
- GitHub Docs: https://docs.github.com
- Vercel Docs: https://vercel.com/docs
- DealMind Issues: Create an issue in your repository
