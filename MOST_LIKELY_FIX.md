# ⚠️ MOST LIKELY ISSUE: API Key Not in Netlify

Based on common patterns, the blank screen is probably because **your Gemini API key is not set in the Netlify environment variables**.

## Quick Fix (Try This First)

### 1. Verify Your API Key is in Netlify

Go to: https://app.netlify.com

**Navigate:**
Site Name → Site Settings → Build & Deploy → Environment

**Look for:**
- Key: `VITE_GEMINI_API_KEY`
- Value: `AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew`

### 2. If It's Missing:

1. Click "Add environment variable"
2. Copy-paste exactly:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** `AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew`
3. Click "Save"

### 3. Redeploy:

1. Go to "Deploys" tab
2. Click "Trigger deploy"
3. Click "Deploy site"
4. Wait for green checkmark (1-2 minutes)

### 4. Test:

1. Click the live URL
2. **Hard refresh:** Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. **Open console:** Cmd+Option+I or Ctrl+Shift+I
4. Look for: `API_KEY available: true`

---

## Why This Happens

The build process needs your API key to configure the app properly.

**Flow:**
```
1. You push to GitHub
2. Netlify builds the app
3. Netlify reads env variables
4. Finds VITE_GEMINI_API_KEY
5. Injects into vite.config.ts
6. Creates process.env.API_KEY
7. App initializes Gemini API
8. App renders ✓
```

If step 4 fails (API key not set), the app can't initialize, causing a blank screen.

---

## Verification Checklist

- [ ] You've logged into Netlify dashboard
- [ ] You've found your site's environment variables section
- [ ] You've added `VITE_GEMINI_API_KEY` with your actual key
- [ ] You've triggered a new deploy
- [ ] The new deploy completed (green checkmark)
- [ ] You've hard refreshed the page
- [ ] You still see a blank screen

**If you've done all of the above and still see a blank screen**, then we need to debug further. Open your browser console and tell me what you see!

---

## The API Key You Should Use

```
VITE_GEMINI_API_KEY=AIzaSyAZQCA-ozuBD9qV6tAk577W_Q-A3U5cYew
```

This is your actual key. Make sure it's copied exactly without extra spaces.

---

## Next Steps

1. **Try the fix above first** (5 minutes)
2. **If still blank**, open console and tell me the error
3. **I'll debug from there**

Good luck! 🚀
