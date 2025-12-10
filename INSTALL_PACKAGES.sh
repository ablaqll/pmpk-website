#!/bin/bash

# PMPK Website - Install Required Packages for Railway Deployment
# This script installs PostgreSQL and bcrypt packages

echo "📦 Installing Required Packages for PMPK Website"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "✅ Found package.json"
echo ""

# Install PostgreSQL driver
echo "📦 Installing PostgreSQL driver (pg)..."
if npm list pg > /dev/null 2>&1; then
    echo "✅ pg package already installed"
else
    npm install pg @types/pg
    if [ $? -eq 0 ]; then
        echo "✅ PostgreSQL packages installed"
    else
        echo "❌ Failed to install pg package"
        exit 1
    fi
fi
echo ""

# Install bcrypt for password hashing
echo "🔐 Installing bcrypt for password security..."
if npm list bcrypt > /dev/null 2>&1; then
    echo "✅ bcrypt package already installed"
else
    npm install bcrypt @types/bcrypt
    if [ $? -eq 0 ]; then
        echo "✅ bcrypt packages installed"
    else
        echo "❌ Failed to install bcrypt package"
        echo "⚠️  Trying to install build dependencies..."
        
        # Try to install build tools if needed
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "Mac detected - Installing Xcode command line tools..."
            xcode-select --install
            echo "Please run this script again after Xcode tools are installed"
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            echo "Linux detected - Install build-essential:"
            echo "sudo apt-get install build-essential python3"
        fi
        exit 1
    fi
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All Required Packages Installed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Packages Installed:"
echo "  ✅ pg - PostgreSQL driver for Railway"
echo "  ✅ bcrypt - Secure password hashing"
echo ""
echo "🔐 Security Feature:"
echo "  Passwords are now hashed using bcrypt with 12 salt rounds"
echo "  This protects user credentials even if database is compromised"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚠️  IMPORTANT NEXT STEP:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Run this command to create database with hashed passwords:"
echo ""
echo "  npm run db:reset"
echo ""
echo "This will create the admin user with securely hashed password."
echo ""
echo "Then you can deploy to Railway!"
echo "See: _START_HERE_RAILWAY.md"
echo ""


