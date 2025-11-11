# 🌐 Netlify Environment Setup - Your API Key

## Copy-Paste Ready

When setting up Netlify environment variables, use these exact values:

**Key (exactly as written):**
```
VITE_GEMINI_API_KEY
```

**Value (exactly as written):**
```
AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew
```

## Step-by-Step Netlify Setup

### 1. Navigate to Environment Variables

```
Netlify Dashboard
    ↓
Your Site
    ↓
Site Settings (top menu)
    ↓
Build & Deploy (left sidebar)
    ↓
Environment (in the list)
```

### 2. Add Environment Variable

Click the button that says **"Add environment variable"**

### 3. Fill in the Form

```
┌─────────────────────────────────────┐
│ Add environment variable             │
├─────────────────────────────────────┤
│                                     │
│ Key:                                │
│ ┌─────────────────────────────────┐ │
│ │VITE_GEMINI_API_KEY              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Value:                              │
│ ┌─────────────────────────────────┐ │
│ │AIzaSyAZQCA-ozuBD9qV6tAk577W... │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [Cancel] [Save]                     │
└─────────────────────────────────────┘
```

### 4. Click Save

### 5. Trigger New Deploy

- Go to **Deploys** tab
- Click **"Trigger deploy"** → **"Deploy site"**
- Wait for green checkmark

## Your API Key Breakdown

```
Your Full API Key:
AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew
│      │
│      └─ Secret part (keep it safe!)
└────── Public identifier
```

**KEEP IT SECRET:**
- Don't share on social media
- Don't post in forums
- Don't include in bug reports
- Only in your Netlify dashboard (private)

## How It Works During Build

```
1. You push to GitHub
2. Netlify triggered
3. Netlify reads environment variables
4. Finds: VITE_GEMINI_API_KEY = AIzaSyA...
5. Runs: npm run build
6. vite.config.ts injects the key
7. Build creates dist/ with key embedded
8. Netlify serves dist/
9. Your app works! ✨
```

## What Files Use Your API Key

```
.env.local (local development)
    ↓
vite.config.ts
    ↓
geminiService.ts (reads process.env.API_KEY)
    ↓
Google Gemini API
```

## Verification Commands (Local)

```bash
# Check .env.local has your key
cat .env.local
# Should show: VITE_GEMINI_API_KEY=AIzaSyA...

# Check it won't be committed
git status
# Should NOT show .env.local

# Test it works
npm run dev
# Open http://localhost:3000
# Send a chat message
```

## Netlify Verification

After deploying, verify on Netlify:

1. Go to **Deploys** tab
2. Click the latest successful deploy (green checkmark)
3. Scroll to **Build log**
4. Look for: `npm run build` succeeded
5. No "API key not found" errors
6. Click the preview URL
7. Test chat works

## If Something Goes Wrong

### API Key Error on Netlify

**Error message:** "API_KEY environment variable is not set"

**Fix:**
1. Go to Site Settings → Build & Deploy → Environment
2. Verify `VITE_GEMINI_API_KEY` exists
3. Verify value is: `AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew`
4. Trigger a new deploy
5. Hard refresh browser (Cmd+Shift+R)

### Chat Works Locally, Not on Netlify

**Fix:**
1. Wait 1-2 minutes after adding env var
2. Trigger deploy again
3. Hard refresh browser (Cmd+Shift+R)
4. Check browser console (F12) for errors

### Value Shows as "****" in Dashboard

**This is normal!** Netlify masks sensitive values for security. Your actual value is stored and used correctly.

## Security Checklist for Netlify

- [ ] Only you have access to Netlify account
- [ ] Environment variable is set to your API key
- [ ] `.env.local` NOT committed to GitHub
- [ ] Never shared the API key via email/chat/forum
- [ ] Using HTTPS only (automatic on Netlify)
- [ ] Site is not public source code repo

## Environment Variable Naming

**Wrong:**
```
GEMINI_API_KEY  (missing VITE_ prefix)
API_KEY  (too generic)
VITE_API_KEY  (wrong name)
```

**Correct:**
```
VITE_GEMINI_API_KEY  (has VITE_ prefix as required by Vite)
```

Why? Vite requires environment variables to start with `VITE_` to be accessible to the build process.

## Timeline

```
Now:
✅ API key in .env.local (local development)

Step 1 (5 min):
✅ Test locally: npm run dev

Step 2 (3 min):
✅ Build locally: npm run build && npm run preview

Step 3 (1 min):
✅ Push to GitHub: git push origin main

Step 4 (5 min):
✅ Connect Netlify to GitHub repo

Step 5 (1 min):
✅ Add API key to Netlify environment variables

Step 6 (2 min):
✅ Trigger deploy on Netlify

Step 7 (1-2 min):
✅ Wait for build to complete

Step 8 (1 min):
✅ Test live app

Total: ~20 minutes to fully deployed app! 🎉
```

## Next Steps

1. **Local test:**
   ```bash
   npm install
   npm run dev
   ```

2. **Production test:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Push:**
   ```bash
   git push origin main
   ```

4. **Netlify setup:**
   - Add `VITE_GEMINI_API_KEY` environment variable
   - Trigger deploy
   - Test live app

---

**Your API key is all set! Proceed with deployment.** 🚀
