const fs = require('fs');
const path = require('path');

const assetMap = {
  'af6463ff6f1861b7d6865230693f9f07b3ca06d4': 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/glass-background.png',
  '620c211bd22a77952bfbe9cb80e35977f766444d': 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/Paul_Coach_Profile.jpg',
  'cb0e3c6ba77d05efd3f851d067d48edb3808be1d': 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/Liz.jpeg',
};

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) return processDir(full);
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
    const lines = fs.readFileSync(full, 'utf8').split('\n');
    let changed = false;
    const newLines = lines.map(line => {
      for (const [hash, url] of Object.entries(assetMap)) {
        if (line.includes('figma:asset/' + hash)) {
          const varName = line.match(/import (\w+) from/)?.[1];
          console.log('BEFORE:', line.trim());
          if (varName) {
            const newLine = `const ${varName} = '${url}';`;
            console.log('AFTER:', newLine);
            changed = true;
            return newLine;
          }
        }
      }
      return line;
    });
    if (changed) fs.writeFileSync(full, newLines.join('\n'));
  });
}

processDir('./src');
