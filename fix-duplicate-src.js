const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

const doRemoveDuplicates = false; // set to true to enable removal

if (doRemoveDuplicates) {
  // This regex finds img tags with duplicate src attributes and removes the duplicates.
  // It keeps the first `src="..."` and removes any subsequent ones in the same tag.

  html = html.replace(/(<img\b[^>]*?)\s+src="[^"]*"\s+src="[^"]*"/g, (match, p1) => {
    const firstSrcMatch = match.match(/src="[^"]*"/);
    if (!firstSrcMatch) return match;  // no src found (unlikely)
    const cleaned = p1.replace(/\s+src="[^"]*"/g, '') + ' ' + firstSrcMatch[0];
    return cleaned;
  });

  // Also, for more duplicates (more than two src attrs), remove all after the first one:
  html = html.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
    const firstSrc = srcGroup.match(/src="[^"]*"/);
    if (!firstSrc) return match;
    const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
    return noSrc + ' ' + firstSrc[0];
  });

  // Fix malformed <img> tags with misplaced slash before src like: <img ... / src="...">
  html = html.replace(/<img([^>]*?)\/\s+src=/g, '<img$1 src=');

  // Escape literal < and > characters inside tags (if any appear literally)
  html = html.replace(/<\s*\//g, '&lt;/').replace(/>\s*>/g, '&gt;>');
} else {
  // bypass, do nothing
}

fs.writeFileSync(filePath, html);
console.log(doRemoveDuplicates ? 'Duplicates removed.' : 'Bypassed duplicate removal.');
