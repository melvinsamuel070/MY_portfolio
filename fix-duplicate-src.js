const fs = require('fs');

const filePath = './index.html';  // Adjust path if needed

let html = fs.readFileSync(filePath, 'utf8');

// This regex finds img tags with duplicate src attributes and removes the duplicates.
// It keeps the first `src="..."` and removes any subsequent ones in the same tag.

html = html.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
  const firstSrc = srcGroup.match(/src="[^"]*"/);
  if (!firstSrc) return match;
  // Remove all src attributes from p1 and add back only the first one
  const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
  return noSrc + ' ' + firstSrc[0];
});

fs.writeFileSync(filePath, html);
console.log('Duplicate src attributes removed from ' + filePath);
