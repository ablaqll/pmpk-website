#!/bin/bash

# PMPK Website - Railway Deployment Helper Script
# This script helps prepare your project for Railway deployment

echo "🚂 PMPK Website - Railway Deployment Helper"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Step 1: Install PostgreSQL package
echo "📦 Step 1: Installing PostgreSQL package..."
if npm list pg > /dev/null 2>&1; then
    echo "✅ pg package already installed"
else
    echo "Installing pg and @types/pg..."
    npm install pg @types/pg
    if [ $? -eq 0 ]; then
        echo "✅ PostgreSQL packages installed successfully"
    else
        echo "❌ Failed to install pg package"
        echo "Try manually: npm install pg @types/pg"
        exit 1
    fi
fi
echo ""

# Step 2: Check Git status
echo "📝 Step 2: Checking Git repository..."
if [ -d ".git" ]; then
    echo "✅ Git repository found"
    
    # Check if there are uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo "⚠️  You have uncommitted changes"
        echo ""
        read -p "Do you want to commit them now? (y/n): " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git add .
            git commit -m "Prepare backend for Railway deployment"
            echo "✅ Changes committed"
        fi
    else
        echo "✅ No uncommitted changes"
    fi
else
    echo "⚠️  Git not initialized"
    echo ""
    read -p "Initialize Git repository? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git init
        git add .
        git commit -m "Initial commit - PMPK website ready for Railway"
        echo "✅ Git repository initialized"
    fi
fi
echo ""

# Step 3: Check GitHub remote
echo "🔗 Step 3: Checking GitHub remote..."
if git remote -v | grep -q origin; then
    REMOTE_URL=$(git remote get-url origin)
    echo "✅ GitHub remote found: $REMOTE_URL"
else
    echo "⚠️  No GitHub remote configured"
    echo ""
    echo "📝 You need to:"
    echo "  1. Create a repository on GitHub"
    echo "  2. Run: git remote add origin https://github.com/YOUR-USERNAME/pmpk-website.git"
    echo "  3. Run: git push -u origin main"
fi
echo ""

# Step 4: Test local build
echo "🔨 Step 4: Testing build..."
echo "Running: npm run build"
if npm run build > /dev/null 2>&1; then
    echo "✅ Build successful"
else
    echo "⚠️  Build failed - check for errors"
    echo "Run: npm run build (to see errors)"
fi
echo ""

# Step 5: Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Pre-deployment Checks Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Push to GitHub (if not done):"
echo "   git push origin main"
echo ""
echo "2. Deploy to Railway:"
echo "   - Go to: https://railway.app"
echo "   - Click: 'New Project' → 'Deploy from GitHub repo'"
echo "   - Select: pmpk-website"
echo ""
echo "3. Add PostgreSQL:"
echo "   - Click: 'New' → 'Database' → 'PostgreSQL'"
echo ""
echo "4. Seed database:"
echo "   - Service menu → 'Run a Command' → 'npm run db:seed'"
echo ""
echo "5. Get Railway URL and update netlify.toml"
echo ""
echo "📚 Detailed guide: See DEPLOY_TO_RAILWAY.md"
echo ""
echo "🚂 Ready for Railway! Good luck! 🎉"


