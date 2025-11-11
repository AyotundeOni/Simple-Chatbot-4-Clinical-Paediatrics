# 🔑 Setting Up Your Gemini API Key on Netlify

## Your API Key Setup Steps

### Step 1: Verify Your API Key Works Locally

First, let's test your API key locally to make sure it's valid:

```bash
# 1. Create your .env.local file if you haven't already
cp .env.example .env.local

# 2. Edit .env.local and add your API key:
VITE_GEMINI_API_KEY=AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew

# 3. Test locally
npm install
npm run dev

# 4. Open http://localhost:3000 in your browser
# 5. Try creating a chat and sending a message
```

### Step 2: Build and Test Production Locally

```bash
# Build the production version
npm run build

# Preview production build
npm run preview

# Open http://localhost:4173
# Test the chat to make sure everything works
```

### Step 3: Push to GitHub

```bash
# Make sure your .env.local is NOT committed (it's in .gitignore)
git status  # Verify .env.local is NOT listed

# Commit your changes
git add .
git commit -m "Prepare for Netlify deployment with Gemini API"
git push origin main
```

### Step 4: Add API Key to Netlify Environment Variables

**IMPORTANT:** Never put your API key directly in your code or commit it to GitHub. Follow these steps:

1. **Go to Netlify Dashboard:**
   - Visit https://app.netlify.com
   - Sign in with your GitHub account

2. **Connect Your Repository (if not already connected):**
   - Click **"New site from Git"**
   - Select **GitHub**
   - Find and select `Simple-Chatbot-4-Clinical-Paediatrics`
   - Click **Deploy**

3. **Add Your API Key to Environment Variables:**
   - Go to **Site Settings**
   - Click **Build & Deploy** (left sidebar)
   - Click **Environment** (under Build & Deploy)
   - Click **"Add environment variable"**
   - Fill in:
     - **Key:** `VITE_GEMINI_API_KEY`
     - **Value:** `AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew`
   - Click **Save**

4. **Trigger a New Deploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"**
   - Select **"Deploy site"**
   - Wait for the build to complete (green checkmark)

5. **Test Your Live App:**
   - Click the preview URL
   - Create a new chat
   - Send a message
   - Verify the AI responds

## Visual Guide

```
Your Computer                 Netlify Dashboard              Live App
─────────────                 ─────────────────              ────────

1. Create .env.local          3. Go to Site Settings        5. Test chat
   with API key                  → Build & Deploy
                                 → Environment
2. Test locally                  → Add variable:
   npm run dev                      Key: VITE_GEMINI_API_KEY
                                     Value: AIzaSyA...

3. Build locally              4. Trigger deploy             6. Live! 🎉
   npm run build

4. Push to GitHub
   git push origin main
```

## How Your API Key Gets Used

```
Development Flow:
.env.local → vite.config.ts → process.env.API_KEY → geminiService.ts → Gemini API

Production Flow:
Netlify Env Vars → npm run build → vite.config.ts → process.env.API_KEY → geminiService.ts → Gemini API
```

## Verification Checklist

- [ ] `.env.local` created with your API key
- [ ] Local test works (`npm run dev`)
- [ ] Production build works (`npm run preview`)
- [ ] `.env.local` NOT committed to Git
- [ ] Changes pushed to GitHub (`git push origin main`)
- [ ] Netlify repository connected
- [ ] `VITE_GEMINI_API_KEY` added in Netlify environment
- [ ] New deploy triggered
- [ ] Live app tested and working

## Security Notes

✅ **SAFE:**
- API key in `.env.local` (local dev only, in `.gitignore`)
- API key in Netlify environment variables (encrypted, only you see it)
- API key used during build, not visible in client code

❌ **UNSAFE (Don't do this):**
- Committing `.env` files to Git
- Hardcoding API key in source files
- Putting API key in public repositories
- Sharing your API key with others

## Troubleshooting

### "API key not found" Error
**Problem:** Chat says "API_KEY environment variable is not set"

**Solutions:**
1. Verify API key is in Netlify environment variables
2. Check the key name is exactly: `VITE_GEMINI_API_KEY`
3. Trigger a new deploy after adding the variable
4. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Build Fails with API Key Error
**Problem:** Netlify build fails, mentioning API key

**Solutions:**
1. Check Netlify build logs (click the failed deploy)
2. Verify `VITE_GEMINI_API_KEY` is in environment variables
3. Wait 1-2 minutes after adding env var before triggering deploy
4. Try triggering the deploy again

### API Works Locally but Not on Netlify
**Problem:** Chat works in `npm run dev` but not on live site

**Solutions:**
1. Check browser console for errors (F12)
2. Check Netlify build logs
3. Verify API key is correct (copy-paste carefully)
4. Try a hard refresh of the page
5. Check if the API key has been rotated/changed at ai.google.dev

### "Quota Exceeded" Error
**Problem:** Too many API requests

**Solutions:**
1. Check your Gemini API quota at https://ai.google.dev/
2. Verify you're using the free tier
3. Wait for quota to reset
4. Consider upgrading if needed

## What's Happening Behind the Scenes

When you push to GitHub:
1. Netlify webhook triggers
2. Netlify pulls your code
3. Netlify reads environment variables (including your API key)
4. Netlify runs: `npm install`
5. Netlify runs: `npm run build`
6. During build, vite.config.ts injects `VITE_GEMINI_API_KEY`
7. `geminiService.ts` gets the key via `process.env.API_KEY`
8. Build creates optimized `dist/` folder
9. `dist/` folder deployed to Netlify CDN
10. Your app goes live!

## Next Steps

1. Follow steps 1-3 above (local setup and Git push)
2. Create/Connect Netlify site with your GitHub repo
3. Add the `VITE_GEMINI_API_KEY` environment variable
4. Trigger a deploy
5. Test your live app!

**Questions?** See the main deployment guide: `DEPLOYMENT.md`

---

**Your API key is set up correctly. You're ready to deploy!** 🚀
