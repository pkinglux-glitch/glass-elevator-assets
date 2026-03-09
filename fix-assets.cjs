const fs = require('fs');
const path = require('path');

const replacements = [
  ['figma:asset/af6463ff6f1861b7d6865230693f9f07b3ca06d4.png', 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/glass-background.png'],
  ['figma:asset/620c211bd22a77952bfbe9cb80e35977f766444d.png', 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/Paul_Coach_Profile.jpg'],
  ['figma:asset/cb0e3c6ba77d05efd3f851d067d48edb3808be1d.png', 'https://raw.githubusercontent.com/pkinglux-glitch/glass-elevator-assets/main/Liz.jpeg'],
];

function processDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) return processDir(full);
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) return;
    let content = fs.readFileSync(full, 'utf8');
    replacements.forEach(([from, to]) => {
      if (content.includes(from)) {
        console.log('Fixed:', full);
        content = content.split(`'${from}'`).join(`'${to}'`);
        content = content.split(`"${from}"`).join(`"${to}"`);
        fs.writeFileSync(full, content);
      }
    });
  });
}

processDir('./src');
