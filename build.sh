#!/bin/bash
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/TheScan.jsx -o src/app/components/TheScan.jsx
echo 'export { default as TheScan } from "./TheScan.jsx";' >> src/app/components/TheScan.jsx
mkdir -p api
curl -s https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/generate-result.js -o api/generate-result.js
node fix-assets.cjs
npm run build
