const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

const doCleanup = true; // set to false to bypass all cleanup

if (doCleanup) {
  // PHASE 0: Create backup first
  fs.writeFileSync(filePath + '.bak', html);
  console.log('Backup created as ' + filePath + '.bak');

  // PHASE 1: Remove ALL duplicate attributes (not just src)
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

  // PHASE 2: Fix malformed img tags with misplaced slashes
  html = html.replace(/<img([^>]*?)\/\s+([a-z-]+)=/g, '<img$1 $2=');

  // PHASE 3: Fix specific Jenkins command (unescaped >)
  html = html.replace(
    /echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/ > \/etc\/apt\/sources\.list\.d\/jenkins\.list'/g,
    "echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'"
  );

  // PHASE 4: Fix unclosed section
  const aboutSectionStart = html.indexOf('<section id="about">');
  const aboutSectionEnd = html.indexOf('</section>', aboutSectionStart);
  const bodyClose = html.indexOf('</body>');

  if (aboutSectionStart !== -1 && aboutSectionEnd === -1 && bodyClose !== -1) {
    html = html.slice(0, bodyClose) + '</section>' + html.slice(bodyClose);
    console.log('Added missing </section> before </body>');
  }

  // PHASE 5: Escape special characters in text content (but not in tags)
  html = html.replace(/>([^<]+)</g, (match, content) => {
    return '>' + content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;') + '<';
  });

  // PHASE 6: Special case for code blocks (preserve > and <)
  html = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (match, codeContent) => {
    return match.replace(/&gt;/g, '>').replace(/&lt;/g, '<');
  });
} else {
  console.log('Cleanup bypassed.');
}

fs.writeFileSync(filePath, html);
console.log(doCleanup ? 'HTML cleaned successfully.' : 'No changes made.');