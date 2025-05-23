const fs = require('fs');

const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

// Split the HTML into segments, splitting by escaped tags (&lt; or &gt;)
// We'll keep these segments to avoid processing inside them
const parts = html.split(/(&lt;.*?&gt;)/g);

const processedParts = parts.map(part => {
  // If this part contains escaped tags, skip processing and return as is
  if (part.includes('&lt;') || part.includes('&gt;')) {
    return part;
  }

  // Otherwise, apply your existing replacements

  // Remove duplicate src attributes in <img> tags (handles 2 src attrs)
  part = part.replace(/(<img\b[^>]*?)\s+src="[^"]*"\s+src="[^"]*"/g, (match, p1) => {
    const firstSrcMatch = match.match(/src="[^"]*"/);
    if (!firstSrcMatch) return match;
    const cleaned = p1.replace(/\s+src="[^"]*"/g, '') + ' ' + firstSrcMatch[0];
    return cleaned;
  });

  // Remove duplicate src attributes in <img> tags (handles 3+ src attrs)
  part = part.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
    const firstSrc = srcGroup.match(/src="[^"]*"/);
    if (!firstSrc) return match;
    const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
    return noSrc + ' ' + firstSrc[0];
  });

  // Fix malformed <img> tags with misplaced slash before src like: <img ... / src="...">
  part = part.replace(/<img([^>]*?)\/\s+src=/g, '<img$1 src=');

  // Escape literal </ sequences inside tags (if still needed)
  part = part.replace(/<\s*\//g, '&lt;/').replace(/>\s*>/g, '&gt;>');

  return part;
});

html = processedParts.join('');

fs.writeFileSync(filePath, html);
console.log('Processed ' + filePath);
