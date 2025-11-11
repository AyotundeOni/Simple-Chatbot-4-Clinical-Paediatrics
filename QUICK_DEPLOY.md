# 🚀 Netlify Deployment - Quick Guide

## Visual Overview

```
Your Local Machine          GitHub               Netlify
        ↓                      ↓                    ↓
    React App      →    Git Repository    →   Build & Deploy
   (npm run dev)   (git push origin main)   (npm run build)
         ↓                      ↓                    ↓
   .env.local          (netlify.toml)         Environment Vars
   API Key      (Auto-detected)              (VITE_GEMINI_API_KEY)
                                                    ↓
                                              Static Files (dist/)
                                                    ↓
                                            Live URL: https://your-app.netlify.app
```

## The 5-Minute Deployment

### Step 1: Prepare (1 min)
```bash
# Make sure everything is committed
git add .
git commit -m "Ready for Netlify deployment"
git push origin main
```

### Step 2: Connect to Netlify (2 min)
1. Go to https://app.netlify.com
2. Click "New site from Git"
3. Select GitHub and your repo
4. Deploy! (Netlify auto-detects your config)

### Step 3: Add API Key (1 min)
1. Site Settings → Build & Deploy → Environment
2. Add: `VITE_GEMINI_API_KEY` = your-api-key
3. Trigger redeploy

### Step 4: Verify (1 min)
1. Wait for deploy to complete
2. Click URL
3. Test chatbot!

## File Reference

### Core Configuration Files

| File | Purpose | Location |
|------|---------|----------|
| `netlify.toml` | Netlify build settings | Root |
| `.env.example` | Environment template | Root |
| `.env.local` | Local secrets (local dev only) | Root (in .gitignore) |
| `vite.config.ts` | Build configuration | Root |
| `package.json` | Dependencies & scripts | Root |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Setup and usage |
| `DEPLOYMENT.md` | Detailed deployment guide |
| `DEPLOYMENT_SUMMARY.md` | Overview of changes |
| `deploy.sh` | Automated setup script |

## Environment Variables Explained

**For Local Development:**
- Create `.env.local`
- Add: `VITE_GEMINI_API_KEY=your_api_key`
- Never commit to Git (it's in .gitignore)

**For Netlify Production:**
- Set in Netlify dashboard: **Site Settings → Build & Deploy → Environment**
- Add: `VITE_GEMINI_API_KEY` = your-api-key
- Netlify injects during build process
- Only you and Netlify can see it

## How It Works

```
1. You push code → GitHub
2. Netlify detects push (webhook)
3. Netlify pulls code
4. Netlify runs: npm install
5. Netlify runs: npm run build
6. Vite uses VITE_GEMINI_API_KEY from environment
7. Creates optimized dist/ folder
8. Netlify serves dist/ as static site
9. Your app goes live! ✨
```

## Security Checklist

✅ API Key never in code  
✅ API Key never in Git  
✅ API Key in Netlify environment only  
✅ .gitignore prevents `.env` commits  
✅ HTTPS auto-enabled  
✅ Only static files deployed  

## Troubleshooting Quick Links

| Problem | Solution |
|---------|----------|
| "API key undefined" | Check Netlify environment variables |
| Build fails | Check build logs in Netlify dashboard |
| Blank page | Check browser DevTools (F12) for errors |
| Can't connect to API | Verify API key is valid at ai.google.dev |
| Old version showing | Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows) |

## Monitoring Your Deployment

### In Netlify Dashboard:
- **Deploys** tab: See build history
- **Logs**: Click any deploy to see build logs
- **Analytics**: View traffic and performance
- **Build settings**: Manage environment variables

### After Deployment:
- Check site is accessible
- Test chat functionality
- Monitor browser DevTools console for errors
- Check Netlify analytics

## Useful Commands

```bash
# Local testing
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Deployment
./deploy.sh          # Run setup and build script
git push origin main # Trigger auto-deployment
```

## Getting Help

1. **Netlify Issues**: Check Netlify dashboard logs
2. **Build Issues**: Run `npm run build` locally
3. **API Issues**: Check ai.google.dev console
4. **Code Issues**: Check GitHub issues or create new one

## Next Steps After Deployment

- ✅ Test thoroughly
- ✅ Share the URL
- ✅ Monitor for errors
- ✅ Plan future improvements
- ✅ Add custom domain (optional)

---

**That's it! Your app is now deployed to Netlify!** 🎉
