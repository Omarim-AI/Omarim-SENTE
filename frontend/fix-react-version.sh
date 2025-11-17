#!/bin/bash
echo "🔧 Fixing React Version Conflicts..."

# Remove existing installations
rm -rf node_modules package-lock.json

# Clear caches
npm cache clean --force

# Install with exact versions
npm install react@18.2.0 react-dom@18.2.0 --save-exact

# Install other dependencies
npm install

echo "✅ React versions fixed!"
echo "📦 Current React versions:"
npm list react react-dom

echo "🚀 Starting development server..."
npm run dev
