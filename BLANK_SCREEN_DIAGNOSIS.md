# 🔍 BLANK SCREEN TROUBLESHOOTING

## Step 1: Check Browser Console for Errors

**This is CRITICAL!** The error will be in your browser console.

### How to Open Console:
1. **Go to your Netlify live URL**
2. **Press one of these:**
   - Mac: `Cmd + Option + I`
   - Windows: `Ctrl + Shift + I`
   - Or right-click → "Inspect" → "Console" tab
3. **Look for RED ERROR MESSAGES**

### What to Look For:
```
❌ "Failed to resolve module"
❌ "Cannot find module"
❌ "API key not set"
❌ "Cannot read property of undefined"
❌ Any other RED TEXT
```

## Step 2: Report the Error

Please tell me:
1. **Exact error message** (copy-paste from console)
2. **Any error line numbers** shown
3. **Screenshot if possible**

## Common Causes & Fixes

### Cause 1: API Key Not Configured
**Error in console:** "API_KEY environment variable is not set"

**Fix:**
1. Go to Netlify dashboard
2. Site Settings → Build & Deploy → Environment
3. Verify `VITE_GEMINI_API_KEY` is there with your API key
4. Trigger a new deploy

### Cause 2: Module Import Error
**Error in console:** "Failed to resolve /src/main.jsx" or similar

**Status:** ✅ FIXED (We changed it to `/index.tsx`)

### Cause 3: Missing CSS
**Symptoms:** Styles don't apply but app renders

**Status:** ✅ FIXED (We added Tailwind CSS)

### Cause 4: React Component Error
**Error in console:** "React component error" or "Cannot read property..."

**Possible fixes:**
- Check all imports are correct
- Verify components export properly
- Check no circular imports

## Step 3: Check Netlify Build Logs

1. Go to https://app.netlify.com
2. Click your site
3. Go to "Deploys" tab
4. Click the latest deploy
5. Scroll down to see "Build log"
6. Look for any `npm run build` errors

### What to Look For in Build Logs:
```
✅ "npm run build succeeded"
❌ "Build failed"
❌ TypeScript errors
❌ Missing module errors
```

## Step 4: Test Locally

Run this command to test locally:

```bash
npm run dev
```

Then:
1. Open http://localhost:3000
2. Open browser console (same as above)
3. Do you see the app with console errors?

## Current Debug Information

I've added debug logging to help diagnose the issue. When you open the console, you should see:

```
index.tsx loading...
Root element: <div id="root"></div>
Creating React root...
Rendering App...
App.tsx loading...
App rendered successfully!
```

If you DON'T see these messages, it means JavaScript isn't running at all.

## Questions to Answer

Please tell me:

1. **What do you see?**
   - [ ] Completely blank white page
   - [ ] Black page (CSS loads but no content)
   - [ ] Error message
   - [ ] Something else?

2. **Browser console shows:**
   - [ ] No errors (just blank)
   - [ ] RED error messages (which ones?)
   - [ ] I don't know how to check

3. **When you look at page source (Ctrl+U or Cmd+U):**
   - Can you see `<div id="root"></div>` in the HTML?

4. **Netlify build logs show:**
   - [ ] "Build succeeded" (green checkmark)
   - [ ] "Build failed" (red X)
   - [ ] I haven't checked

## Solution Path

**If you provide the console error**, I can fix it immediately!

```
YOUR ERROR → I DIAGNOSE → I FIX → YOU'RE LIVE ✅
```

---

## What I've Already Fixed

✅ Entry point: `/src/main.jsx` → `/index.tsx`
✅ Tailwind CSS: Installed and configured
✅ Environment: API key setup ready
✅ Build: Working locally
✅ Debug logging: Added

## Next: Tell Me the Error!

**Please check your browser console and tell me what error you see!**

This will help me fix it immediately. 🔍
