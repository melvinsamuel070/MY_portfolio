const fs = require('fs');

const filePath = './index.html';  // Adjust path if needed

let html = fs.readFileSync(filePath, 'utf8');

// Split file into lines so we can selectively process lines that do NOT contain escaped tags
let lines = html.split('\n');

lines = lines.map(line => {
  // Bypass lines containing &lt; or &gt; entirely (return as is)
  if (line.includes('&lt;') || line.includes('&gt;')) {
    return line;
  }

  // Remove duplicate src attributes in <img> tags (handles 2 src attrs)
  line = line.replace(/(<img\b[^>]*?)\s+src="[^"]*"\s+src="[^"]*"/g, (match, p1) => {
    const firstSrcMatch = match.match(/src="[^"]*"/);
    if (!firstSrcMatch) return match;
    const cleaned = p1.replace(/\s+src="[^"]*"/g, '') + ' ' + firstSrcMatch[0];
    return cleaned;
  });

  // Remove duplicate src attributes in <img> tags (handles 3+ src attrs)
  line = line.replace(/(<img\b[^>]*?)((\s+src="[^"]*")+)/g, (match, p1, srcGroup) => {
    const firstSrc = srcGroup.match(/src="[^"]*"/);
    if (!firstSrc) return match;
    const noSrc = p1.replace(/\s+src="[^"]*"/g, '');
    return noSrc + ' ' + firstSrc[0];
  });

  // Fix malformed <img> tags with misplaced slash before src like: <img ... / src="...">
  line = line.replace(/<img([^>]*?)\/\s+src=/g, '<img$1 src=');

  // Escape literal </ sequences inside tags (for safety if needed)
  line = line.replace(/<\s*\//g, '&lt;/').replace(/>\s*>/g, '&gt;>');

  return line;
});

html = lines.join('\n');

fs.writeFileSync(filePath, html);
console.log('Duplicate src attributes removed from ' + filePath);
