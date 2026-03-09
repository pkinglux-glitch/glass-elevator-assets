#!/bin/bash
cd ~/Documents/Theglasselevator

# Restore vercel.json
cat > vercel.json << 'VEOF'
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
VEOF

# Restore files from assets repo
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/vite.config.ts -o vite.config.ts
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/fix-assets.cjs -o fix-assets.cjs
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/TheScan.jsx -o src/app/components/TheScan.tsx
mkdir -p api
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/generate-result.js -o api/generate-result.js

# Commit and push
git add .
git commit -m "Restore protected files after Figma push"
git push
