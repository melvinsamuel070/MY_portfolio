const fs = require('fs');

const filePath = './index.html';  // Adjust path if needed

let html = fs.readFileSync(filePath, 'utf8');

// This regex finds img tags with duplicate src attributes and removes the duplicates.
// It keeps the first `src="..."` and removes any subsequent ones in the same tag.

html = html.replace(/(<img\b[^>]*?)\s+src="[^"]*"\s+src="[^"]*"/g, (match, p1) => {
  // match example: <img class="x" src="a.png" src="b.png"
  // Keep only the first src attribute found, which is before the second src.
  // So we remove the second src attribute entirely.

  // More robust approach:
  // Extract first src, ignore second.
  // Use a capturing group on the first src:

  const firstSrcMatch = match.match(/src="[^"]*"/);
  if (!firstSrcMatch) return match;  // no src found (unlikely)
  
  // Remove all src attributes and put back only the first one
  const cleaned = p1.replace(/\s+src="[^"]*"/g, '') + ' ' + firstSrcMatch[0];

  return cleaned;
});

// Also, for more duplicates (more than two src attrs), remove all after the first one:
html = html.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
  const firstSrc = srcGroup.match(/src="[^"]*"/);
  if (!firstSrc) return match;
  // Remove all src attributes from p1 and add back the first one
  const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
  return noSrc + ' ' + firstSrc[0];
});

fs.writeFileSync(filePath, html);
console.log('Duplicate src attributes removed from ' + filePath);
