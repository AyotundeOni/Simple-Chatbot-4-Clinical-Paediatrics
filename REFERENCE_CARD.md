# 📋 Deployment Reference Card

## New Files Summary

| File | Type | Purpose | Read First? |
|------|------|---------|-------------|
| `netlify.toml` | Config | Netlify build settings | ❌ |
| `.env.example` | Template | Environment variables | ✅ Yes |
| `deploy.sh` | Script | Automated setup | ✅ Yes |
| `README.md` | Docs | Project overview | ✅ Yes |
| `QUICK_DEPLOY.md` | Docs | 5-minute visual guide | ✅ Yes |
| `DEPLOYMENT.md` | Docs | Detailed instructions | ⚠️ If needed |
| `DEPLOYMENT_SUMMARY.md` | Docs | Technical changes | ⚠️ If needed |
| `GETTING_STARTED_DEPLOYMENT.md` | Docs | This guide | ✅ Yes |

## Documentation Reading Order

```
START HERE
    ↓
GETTING_STARTED_DEPLOYMENT.md (this file)
    ↓
Choose your path:
    ↙            ↓            ↘
QUICK_DEPLOY  README.md   DEPLOYMENT.md
(visual)      (detailed)  (step-by-step)
```

## The Deployment Process

```
┌─────────────────────┐
│  Your Local Repo    │
│  (main branch)      │
└──────────┬──────────┘
           │ git push
           ↓
┌─────────────────────┐
│  GitHub Repository  │
│  (stores your code) │
└──────────┬──────────┘
           │ webhook trigger
           ↓
┌─────────────────────────────────┐
│  Netlify Build Server           │
│  1. npm install                 │
│  2. npm run build               │
│  3. Uses VITE_GEMINI_API_KEY    │
│  4. Creates optimized dist/     │
└──────────┬──────────────────────┘
           │
           ↓
┌─────────────────────────────────┐
│  Netlify CDN                    │
│  Serves dist/ folder globally   │
│  HTTPS enabled                  │
└──────────┬──────────────────────┘
           │
           ↓
    Your Live App! 🎉
    https://your-app.netlify.app
```

## API Key Flow

```
DEVELOPMENT                        PRODUCTION
─────────────                      ──────────

Local Machine                      Netlify Build
    │                                  │
    ├─ .env.local                      ├─ Site Settings
    │  (your secret)      ──────→      │  Environment Vars
    │  VITE_GEMINI_API_KEY            │  VITE_GEMINI_API_KEY
    │                                  │
    └─ vite.config.ts    ──────→      └─ vite.config.ts
       Reads from env                   Reads from env
       ↓                                ↓
    Builds dist/                    Creates optimized dist/
    (with API key)                  (with API key)
       ↓                                ↓
    npm run dev                     Netlify serves
    OR preview
```

## Common Commands

### Development
```bash
npm install              # Install all dependencies
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Test production build locally
```

### Deployment Prep
```bash
./deploy.sh              # Run complete setup (recommended!)
git add .                # Stage changes
git commit -m "msg"      # Commit changes
git push origin main     # Push to trigger Netlify deploy
```

## Environment Variable Setup

### Local Development (.env.local)
```env
VITE_GEMINI_API_KEY=your_api_key_here
```

**Important:** `.env.local` is in `.gitignore` - never committed to Git

### Netlify Production
**Site Settings → Build & Deploy → Environment**
```
Key:   VITE_GEMINI_API_KEY
Value: your_api_key_here
```

## File Structure After Setup

```
Simple-Chatbot-4-Clinical-Paediatrics/
├── 📄 netlify.toml              ← Netlify configuration
├── 📄 .env.example              ← Template for .env.local
├── 📄 deploy.sh                 ← Automated setup script
├── 📄 README.md                 ← Project overview
├── 📄 QUICK_DEPLOY.md           ← Visual quick guide
├── 📄 DEPLOYMENT.md             ← Detailed steps
├── 📄 DEPLOYMENT_SUMMARY.md     ← Technical changes
├── 📄 GETTING_STARTED_DEPLOYMENT.md ← Start here!
│
├── 📂 components/               ← React components
├── 📂 services/                 ← API services
├── 📂 hooks/                    ← Custom hooks
│
├── 📄 vite.config.ts            ← Build config
├── 📄 tsconfig.json             ← TypeScript config
├── 📄 package.json              ← Dependencies
├── 📄 index.html                ← HTML entry
├── 📄 index.tsx                 ← React entry
└── 📄 types.ts                  ← TypeScript types
```

## Verification Checklist

### Before Pushing to GitHub
- [ ] `npm run build` succeeds locally
- [ ] `.env.local` has your API key
- [ ] `.env.local` is in `.gitignore` (won't be committed)
- [ ] No errors in `npm run preview`

### After Connecting to Netlify
- [ ] Repository selected correctly
- [ ] `netlify.toml` is detected
- [ ] First build completes (green checkmark)
- [ ] Environment variable added: `VITE_GEMINI_API_KEY`

### After Deployment
- [ ] Site URL is accessible
- [ ] Chat works and responds
- [ ] No console errors (DevTools F12)
- [ ] API key error doesn't appear

## Quick Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Build fails on Netlify | Missing env var | Add `VITE_GEMINI_API_KEY` to environment |
| "API key undefined" error | Env var not injected | Redeploy after adding env var |
| Blank page on load | SPA routing issue | Clear browser cache, hard refresh |
| Chat doesn't respond | API key invalid | Check key at ai.google.dev |
| Outdated version showing | Cache not cleared | Hard refresh: Cmd+Shift+R |

## Netlify Dashboard Navigation

```
Dashboard
├── Sites
│   └── Your Site
│       ├── Deploys          ← See all builds
│       ├── Site Settings
│       │   └── Build & Deploy
│       │       └── Environment  ← Add VITE_GEMINI_API_KEY here
│       └── Analytics        ← Monitor traffic
```

## URLs You'll Need

| Service | URL | Purpose |
|---------|-----|---------|
| Netlify | https://app.netlify.com | Deploy & manage |
| GitHub | https://github.com | Push code |
| Google Gemini | https://ai.google.dev | Get API key |
| Your App | https://your-app.netlify.app | Live app |

## Time Estimates

| Task | Time |
|------|------|
| Push to GitHub | < 1 min |
| Connect to Netlify | 2-3 min |
| Add API key | 1 min |
| First build | 1-2 min |
| Test app | 2-3 min |
| **Total** | **~10 min** |

## Support Resources

| Issue | Resource |
|-------|----------|
| Netlify questions | [Netlify Docs](https://docs.netlify.com/) |
| Build/Deploy issues | [Netlify Community](https://community.netlify.com/) |
| Vite questions | [Vite Guide](https://vitejs.dev/guide/) |
| React questions | [React Docs](https://react.dev/) |
| Gemini API | [Gemini API Docs](https://ai.google.dev/docs) |

---

**Next Step:** Follow `QUICK_DEPLOY.md` for visual instructions or `DEPLOYMENT.md` for detailed steps.

**You've got this!** 🚀
