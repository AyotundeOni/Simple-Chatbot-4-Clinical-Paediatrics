# Netlify Deployment Checklist

Follow these steps to successfully deploy your Clinical Paediatrics AI Chatbot to Netlify.

## Pre-Deployment

- [ ] **Verify Build Works Locally**
  ```bash
  npm install
  npm run build
  ```
  Ensure `dist` folder is created without errors

- [ ] **Test Production Build**
  ```bash
  npm run preview
  ```
  Verify the app works correctly in production mode

- [ ] **Commit All Changes**
  ```bash
  git add .
  git commit -m "Prepare for Netlify deployment"
  git push origin main
  ```

## Deployment Steps

### Step 1: Connect GitHub to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Sign up/Log in with your GitHub account
3. Click **"New site from Git"**
4. Select **GitHub** as your Git provider
5. Search for `Simple-Chatbot-4-Clinical-Paediatrics`
6. Click to connect

### Step 2: Configure Build Settings

Netlify should auto-detect your `netlify.toml` file. Verify:

- **Repository:** Correct repo selected
- **Branch:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Click **"Deploy site"**

### Step 3: Set Environment Variables

Once the site is created:

1. Go to **Site Settings** in Netlify dashboard
2. Navigate to **Build & Deploy** → **Environment**
3. Click **"Add environment variable"**
4. Add:
   - **Key:** `VITE_GEMINI_API_KEY`
   - **Value:** Your Gemini API key (get it from [ai.google.dev](https://ai.google.dev/))
5. Click **"Save"**

### Step 4: Trigger a Rebuild

1. After saving environment variables, go to **Deploys** tab
2. Click **"Trigger deploy"** → **Deploy site**
3. Wait for the build to complete (usually 1-2 minutes)

### Step 5: Verify Deployment

1. Wait for deployment to complete (green checkmark)
2. Click the preview URL
3. Test the chatbot:
   - Create a new chat
   - Send a message
   - Verify responses from Gemini API

## Troubleshooting

### Build Fails

**Error: "VITE_GEMINI_API_KEY is undefined"**
- Solution: Check that the environment variable is set in Netlify Site Settings

**Error: "npm ERR! 404"**
- Solution: Clear Netlify cache and redeploy
  - Site Settings → Build & Deploy → Clear cache and redeploy

### API Errors in Production

**Error: "Failed to connect to Gemini API"**
- Verify API key is correct
- Check API key hasn't been rotated
- Confirm API is enabled at [ai.google.dev](https://ai.google.dev/)

### Site Builds but Shows Blank Page

**Issue: SPA routing not working**
- Already configured in `netlify.toml` with redirect rules
- If not working, verify `netlify.toml` exists in root directory

**Issue: CSS not loading**
- Check browser DevTools for 404 errors
- Trigger a hard rebuild: **Deploy** → **Trigger deploy**

## Post-Deployment

- [ ] **Set a Custom Domain (Optional)**
  - Domain settings → Custom domain
  - Follow DNS configuration instructions

- [ ] **Enable HTTPS (Auto)**
  - Already enabled by default on Netlify

- [ ] **Monitor Deploys**
  - Enable notifications in Netlify settings
  - Check deploy logs for any warnings

- [ ] **Set Up Auto Deploys**
  - Already enabled by default
  - Site rebuilds automatically when you push to `main` branch

## Quick Reference

| Task | Link/Command |
|------|---|
| Netlify Dashboard | https://app.netlify.com |
| Get Gemini API Key | https://ai.google.dev |
| Local Build | `npm run build` |
| Local Preview | `npm run preview` |
| View Logs | Netlify Dashboard → Deploys → Click deploy → Logs |

## Next Steps

- Add custom domain (optional)
- Set up branch deployments for testing
- Monitor analytics in Netlify dashboard
- Collect feedback and iterate on features
