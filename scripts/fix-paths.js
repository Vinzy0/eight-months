const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');

function fixPaths(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      fixPaths(filePath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const original = content;
      
      // Blanket replacement: /_next/ → ./_next/
      // Catches HTML attributes, inline JS, RSC data, webpack public path, etc.
      content = content.replace(/\/_next\//g, './_next/');
      
      if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed: ${path.relative(outDir, filePath)}`);
      }
    }
  }
}

console.log('Fixing asset paths for file:// protocol...');
fixPaths(outDir);
console.log('Done! All HTML and JS files now use relative paths.');
