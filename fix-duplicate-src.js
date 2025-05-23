const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Remove ALL duplicate attributes (not just src)
html = html.replace(/(<[a-z][^>]*?)(\s+[a-z-]+="[^"]*")+/g, (match, tagStart) => {
  const attributes = new Map();
  const attrMatches = match.matchAll(/\s+([a-z-]+)="([^"]*)"/g);
  
  for (const attr of attrMatches) {
    if (!attributes.has(attr[1])) {
      attributes.set(attr[1], attr[0]);
    }
  }
  
  return tagStart + Array.from(attributes.values()).join('');
});

// FIX 2: Escape the > character in the Jenkins command
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 3: Clean up any remaining malformed tags
html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('All validation errors should now be fixed in ' + filePath);

// Verification
const remainingDuplicates = html.match(/<[^>]*?\s+([a-z-]+)="[^"]*"\s+\1="[^"]*"[^>]*>/g);
if (remainingDuplicates) {
  console.warn('Warning: Found some remaining duplicates:');
  console.warn(remainingDuplicates);
} else {
  console.log('Verification: No duplicate attributes found');
}