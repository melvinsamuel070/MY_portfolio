const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

// Remove duplicate src attributes in img tags (keep only first src)
html = html.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
  const firstSrc = srcGroup.match(/src="[^"]*"/);
  if (!firstSrc) return match;
  const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
  return noSrc + ' ' + firstSrc[0];
});

// Replace escaped < and > with actual tags
html = html.replace(/&lt;/g, '<').replace(/&gt;/g, '>');

fs.writeFileSync(filePath, html);
console.log('Fixed duplicate src attributes and unescaped tags.');
