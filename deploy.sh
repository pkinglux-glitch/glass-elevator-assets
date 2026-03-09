#!/bin/bash
cd ~/Documents/Theglasselevator

# Restore vercel.json
cat > vercel.json << 'VEOF'
{
  "rewrites": [{ "source": "/((?!api/).*)", "destination": "/index.html" }]
}
VEOF

# Restore vite.config.ts
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/vite.config.ts -o vite.config.ts

# Restore API stub
mkdir -p api
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/generate-result.js -o api/generate-result.js

# Commit and push
git add .
git commit -m "Restore protected files after Figma push"
git push
