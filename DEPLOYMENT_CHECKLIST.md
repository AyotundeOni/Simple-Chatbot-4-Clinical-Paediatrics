# ✅ MASTER DEPLOYMENT CHECKLIST - WITH YOUR API KEY

## Phase 1: Local Testing (Do This First!)

### Setup
- [ ] Open terminal
- [ ] Navigate to project: `cd /Users/ayotunde/Documents/GitHub/Simple-Chatbot-4-Clinical-Paediatrics`
- [ ] Install dependencies: `npm install`

### Test Development
- [ ] Run dev server: `npm run dev`
- [ ] Open http://localhost:3000
- [ ] Create a new chat
- [ ] Send a test message (e.g., "Hello")
- [ ] ✅ Verify Gemini AI responds with clinical info
- [ ] Stop dev server: `Ctrl+C`

### Test Production Build
- [ ] Run: `npm run build`
- [ ] Verify no errors in build output
- [ ] Check `dist/` folder was created
- [ ] Run: `npm run preview`
- [ ] Open http://localhost:4173
- [ ] Create new chat and send message
- [ ] ✅ Verify response works
- [ ] Stop preview: `Ctrl+C`

## Phase 2: Push to GitHub

### Prepare
- [ ] Run: `git status`
- [ ] ✅ Verify `.env.local` is NOT listed (protected by .gitignore)
- [ ] ✅ Verify documentation files are listed (new files)

### Commit
- [ ] Run: `git add .`
- [ ] Run: `git commit -m "Deploy Clinical Paediatrics chatbot with Gemini API"`
- [ ] Run: `git push origin main`
- [ ] ✅ Verify push succeeds (no errors)

### Verify on GitHub
- [ ] Open https://github.com/AyotundeOni/Simple-Chatbot-4-Clinical-Paediatrics
- [ ] ✅ Verify your changes appear in the repo
- [ ] ✅ Verify `.env.local` is NOT visible

## Phase 3: Connect to Netlify

### Create Account (if needed)
- [ ] Go to https://app.netlify.com
- [ ] Sign up with GitHub (if not already signed in)
- [ ] ✅ Authorize Netlify to access your GitHub

### Connect Repository
- [ ] Click "New site from Git"
- [ ] Choose "GitHub"
- [ ] Search for: `Simple-Chatbot-4-Clinical-Paediatrics`
- [ ] Select your repository
- [ ] ✅ Review default settings (should be correct)
  - Branch: `main`
  - Build command: `npm run build`
  - Publish directory: `dist`
- [ ] Click "Deploy site"
- [ ] ✅ Wait for initial build to complete

## Phase 4: Add Your API Key

### Navigate to Settings
- [ ] Go to https://app.netlify.com
- [ ] Select your site
- [ ] Click "Site settings" (top right)
- [ ] Click "Build & Deploy" (left sidebar)
- [ ] Click "Environment" (in the submenu)

### Add Environment Variable
- [ ] Click "Add environment variable"
- [ ] **Key field:** Type exactly: `VITE_GEMINI_API_KEY`
- [ ] **Value field:** Paste your API key: `AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew`
- [ ] Click "Save"
- [ ] ✅ Verify the variable appears in the list

## Phase 5: Deploy with API Key

### Trigger New Deployment
- [ ] Go to "Deploys" tab
- [ ] Click "Trigger deploy"
- [ ] Click "Deploy site"
- [ ] ✅ Watch the build process
- [ ] ✅ Wait for green checkmark (deployment complete)

### View Build Logs (if needed)
- [ ] Click the deployment to expand it
- [ ] Check "Logs" section
- [ ] ✅ Verify no "API key" errors
- [ ] ✅ Verify `npm run build` succeeded

## Phase 6: Test Your Live App

### Access Your Site
- [ ] Click the preview URL (under site name)
- [ ] ✅ Verify site loads (not blank)
- [ ] ✅ Verify no console errors (F12 to check)

### Test Chat Functionality
- [ ] Click "New Chat"
- [ ] Type a clinical question: "Tell me about fever in infants"
- [ ] Send the message
- [ ] ✅ Wait for response from Gemini AI
- [ ] ✅ Verify response is relevant and clinical
- [ ] ✅ Verify emoji formatting is present
- [ ] Test another question to verify consistency

### Browser Tests
- [ ] Test on Chrome/Safari/Firefox
- [ ] Test on mobile (if possible)
- [ ] Hard refresh to ensure no cache issues (Cmd+Shift+R)

## Phase 7: Verification & Documentation

### Final Checks
- [ ] ✅ API key is secure (not in GitHub)
- [ ] ✅ App works locally and on Netlify
- [ ] ✅ Chat responds correctly
- [ ] ✅ No errors in console
- [ ] ✅ HTTPS is enabled (URL shows 🔒)

### Documentation
- [ ] ✅ Share live URL with stakeholders
- [ ] ✅ Keep API key secret
- [ ] ✅ Note production URL

### Next Steps
- [ ] ✅ Monitor for errors in Netlify dashboard
- [ ] ✅ Test occasionally to ensure stability
- [ ] ✅ Plan future improvements

## Troubleshooting Reference

### Problem: "API key not found" Error
- [ ] Check Netlify environment variables have correct key/value
- [ ] Verify key name is exactly: `VITE_GEMINI_API_KEY`
- [ ] Trigger a new deploy
- [ ] Hard refresh browser (Cmd+Shift+R)

### Problem: Build Fails
- [ ] Click the failed deploy to see logs
- [ ] Check for specific error message
- [ ] Run `npm run build` locally to test
- [ ] Verify `.env.local` has correct API key format

### Problem: Chat Works Locally, Not on Netlify
- [ ] Wait 2 minutes after adding env var
- [ ] Check browser console (F12) for errors
- [ ] Try hard refresh (Cmd+Shift+R)
- [ ] Verify API key is correct

### Problem: Blank Page on Live Site
- [ ] Check browser console (F12)
- [ ] Check Netlify build logs
- [ ] Verify no TypeScript errors locally
- [ ] Try hard refresh

## Quick Reference

**Your API Key:**
```
VITE_GEMINI_API_KEY=AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew
```

**Local Files:**
- `.env.local` - Has your API key (stays secret!)
- `netlify.toml` - Netlify configuration
- `vite.config.ts` - Build configuration

**Important Commands:**
```bash
npm install          # Install dependencies
npm run dev          # Local development
npm run build        # Production build
npm run preview      # Test production build
git push origin main # Deploy to production
```

**Important URLs:**
- Netlify Dashboard: https://app.netlify.com
- Your GitHub Repo: https://github.com/AyotundeOni/Simple-Chatbot-4-Clinical-Paediatrics
- Gemini API Console: https://ai.google.dev/

## Time Breakdown

| Phase | Time | Cumulative |
|-------|------|-----------|
| Local Testing | 10 min | 10 min |
| Push to GitHub | 2 min | 12 min |
| Connect Netlify | 3 min | 15 min |
| Add API Key | 2 min | 17 min |
| Deploy | 3 min | 20 min |
| Test Live | 3 min | 23 min |
| **TOTAL** | | **~25 min** |

## Status: ✅ READY TO DEPLOY!

All files are configured, your API key is set up, and you're ready to go live! Follow the phases above and you'll have a production deployment in about 25 minutes.

**Current Status:**
- ✅ `.env.local` configured with your API key
- ✅ Code ready for deployment
- ✅ Netlify configuration complete
- ✅ Documentation complete

**Next Action:** Start with "Phase 1: Local Testing"

---

**Happy deploying! Your Clinical Paediatrics AI Chatbot will be live soon!** 🚀

For detailed help on any step, refer to:
- `NETLIFY_ENV_SETUP.md` - API key setup details
- `SETUP_API_KEY.md` - Full API key guide
- `DEPLOYMENT.md` - Detailed deployment steps
- `QUICK_START_WITH_KEY.md` - Quick start guide
