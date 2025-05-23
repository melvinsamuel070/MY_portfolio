const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

const doCleanup = true; // set to false to bypass all cleanup

if (doCleanup) {
  // Phase 1: Remove ALL duplicate attributes (not just src)
  html = html.replace(/(<[a-z][^>]*?)(\s+[a-z-]+="[^"]*")+/g, (match, tagStart) => {
    // Extract all attributes
    const attributes = {};
    const attrMatches = match.matchAll(/\s+([a-z-]+)="([^"]*)"/g);
    
    for (const attr of attrMatches) {
      // Keep first occurrence of each attribute
      if (!attributes[attr[1]]) {
        attributes[attr[1]] = attr[2];
      }
    }
    
    // Rebuild the tag with unique attributes
    let cleanedTag = tagStart;
    for (const [name, value] of Object.entries(attributes)) {
      cleanedTag += ` ${name}="${value}"`;
    }
    
    return cleanedTag;
  });

  // Phase 2: Fix malformed img tags with misplaced slashes
  html = html.replace(/<img([^>]*?)\/\s+([a-z-]+)=/g, '<img$1 $2=');

  // Phase 3: Escape special characters in text content (but not in tags)
  html = html.replace(/>([^<]+)</g, (match, content) => {
    return '>' + content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') + '<';
  });

  // Special case for code blocks (preserve > and <)
  html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (match, codeContent) => {
    return match.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
  });
} else {
  console.log('Cleanup bypassed.');
}

fs.writeFileSync(filePath, html);
console.log(doCleanup ? 'HTML cleaned successfully.' : 'No changes made.');