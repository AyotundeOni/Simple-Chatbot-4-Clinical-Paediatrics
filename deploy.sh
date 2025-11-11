#!/bin/bash

# Deployment Helper Script for Netlify
# This script helps prepare the app for deployment

echo "🚀 Clinical Paediatrics AI Chatbot - Netlify Deployment Helper"
echo "============================================================"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    if [ -f .env.example ]; then
        cp .env.example .env.local
        echo "✅ .env.local created. Please edit it and add your VITE_GEMINI_API_KEY"
    else
        echo "❌ .env.example not found"
        exit 1
    fi
else
    echo "✅ .env.local already exists"
fi

echo ""

# Check if API key is set
if grep -q "your_gemini_api_key_here" .env.local; then
    echo "⚠️  WARNING: API key not configured in .env.local"
    echo "   Please add your VITE_GEMINI_API_KEY to .env.local"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Build the project
echo "🔨 Building for production..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build successful!"
echo ""

# Check if dist folder exists
if [ -d "dist" ]; then
    echo "✅ dist/ folder created successfully"
    echo "📊 Dist folder size: $(du -sh dist | cut -f1)"
else
    echo "❌ dist/ folder not created"
    exit 1
fi

echo ""
echo "============================================================"
echo "✅ Your app is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Commit changes: git add . && git commit -m 'Ready for deployment'"
echo "2. Push to GitHub: git push origin main"
echo "3. Go to https://app.netlify.com"
echo "4. Click 'New site from Git' and select your repository"
echo "5. Add VITE_GEMINI_API_KEY to environment variables"
echo "6. Deploy!"
echo ""
echo "See DEPLOYMENT.md for detailed instructions."
echo "============================================================"
