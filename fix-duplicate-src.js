const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

const doRemoveDuplicates = true; // Set to `true` to enable cleanup

if (doRemoveDuplicates) {
  // Fix malformed `<img>` tags with misplaced `/` before `src` (e.g., `<img ... / src="...">`)
  html = html.replace(/<img([^>]*?)\/\s+src=/g, '<img$1 src=');

  // Remove duplicate `src` attributes (keep the first occurrence)
  html = html.replace(
    /(<img\b[^>]*?)(\s+src="[^"]*")+/g,
    (match, tagStart, srcGroup) => {
      const firstSrc = srcGroup.match(/src="[^"]*"/)?.[0] || '';
      return tagStart + ' ' + firstSrc;
    }
  );

  // Escape literal `<` and `>` if they appear in problematic places
  html = html.replace(/<\s*\//g, '&lt;/').replace(/>\s*>/g, '&gt;>');
}

fs.writeFileSync(filePath, html);
console.log(doRemoveDuplicates ? '✅ Duplicates removed & HTML cleaned.' : '🚫 Bypassed duplicate removal.');