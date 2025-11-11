<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1vRIalQeJWX0cBQqaYCKTj9lICOqrhlts

## Run Locally

**Prerequisites:** Node.js (v16 or higher)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Get your Gemini API key from [ai.google.dev](https://ai.google.dev/)
   - Add your API key to `.env.local`:
   ```
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deploy to Netlify

### Option 1: Connect GitHub Repository (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Deploy on Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Select your GitHub repository
   - Accept the default build settings (Netlify will detect `netlify.toml`)
   - Click "Deploy site"

3. **Add Environment Variables:**
   - In Netlify dashboard: **Site Settings** → **Build & Deploy** → **Environment**
   - Add a new environment variable:
     - Key: `VITE_GEMINI_API_KEY`
     - Value: Your Gemini API key
   - Redeploy the site

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Configure environment variables in the Netlify dashboard** (as shown in Option 1, step 3)

### Configuration Files

- **`netlify.toml`** - Netlify configuration
  - Build command: `npm run build`
  - Publish directory: `dist`
  - Configured for single-page app (SPA) routing

- **`.env.example`** - Environment variables template

## Project Structure

```
├── components/           # React components
├── hooks/               # Custom React hooks
├── services/            # API services (Gemini integration)
├── App.tsx              # Main application component
├── index.tsx            # React entry point
├── types.ts             # TypeScript type definitions
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── netlify.toml         # Netlify configuration
└── package.json         # Project dependencies
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Your Gemini API key from [ai.google.dev](https://ai.google.dev/) | Yes |

## Key Features

- 💬 Chat interface powered by Google's Gemini AI
- 🏥 Specialized for clinical paediatrics
- 📱 Responsive design
- 💾 Local conversation storage
- ⚡ Built with Vite for fast development and production builds

## Technology Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Build Tool:** Vite 6
- **AI:** Google Gemini API
- **Deployment:** Netlify

## Troubleshooting

### "API_KEY is not configured" error
- Ensure `VITE_GEMINI_API_KEY` is set in your `.env.local` (local dev) or in Netlify environment variables (production)
- Check that the API key is valid at [ai.google.dev](https://ai.google.dev/)

### Build fails
- Clear cache: `rm -rf node_modules dist` and `npm install`
- Check Node.js version: `node --version` (should be v16+)

## Support

For issues or questions, please open an issue on GitHub.
