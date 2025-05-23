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

// FIX 2: Escape the > character in the Jenkins command (more robust version)
html = html.replace(
  /(<code>[^<]*?echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list'[^<]*?<\/code>)/g,
  '$1 &gt; $2'
);

// FIX 3: Clean up any remaining malformed tags
html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// FIX 4: Ensure proper tag nesting (section/div closure)
const bodyClose = html.indexOf('</body>');
if (bodyClose !== -1) {
  // Count unclosed sections/divs before </body>
  const openTags = html.substring(0, bodyClose).match(/<(section|div)[^>]*>/g) || [];
  const closeTags = html.substring(0, bodyClose).match(/<\/(section|div)>/g) || [];
  
  if (openTags.length > closeTags.length) {
    const missingClosures = [];
    const tagStack = [];
    
    // More sophisticated tag balancing
    const allTags = [...html.substring(0, bodyClose).matchAll(/<(section|div)[^>]*>|<\/(section|div)>/g)];
    allTags.forEach(tag => {
      if (tag[0].startsWith('</')) {
        if (tagStack.length > 0) tagStack.pop();
      } else {
        tagStack.push(tag[1]);
      }
    });
    
    // Generate missing closing tags in reverse order
    const closingTags = tagStack.reverse().map(tag => `</${tag}>`).join('');
    html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
    console.log(`Added missing closing tags: ${closingTags}`);
  }
}

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('All fixes applied to ' + filePath);

// Enhanced verification
const verify = () => {
  let errors = 0;
  
  // Check for remaining duplicates
  const dupes = html.match(/<[^>]*?\s+([a-z-]+)="[^"]*"\s+\1="[^"]*"[^>]*>/g);
  if (dupes) {
    console.warn('⚠️ Remaining duplicate attributes:', dupes.length);
    errors += dupes.length;
  }
  
  // Check for unescaped > in code blocks
  const unescaped = html.match(/<code>.*>.*<\/code>/);
  if (unescaped) {
    console.warn('⚠️ Unescaped > in code blocks:', unescaped.length);
    errors += unescaped.length;
  }
  
  // Check tag balance
  const openTags = html.match(/<(section|div)[^>]*>/g) || [];
  const closeTags = html.match(/<\/(section|div)>/g) || [];
  if (openTags.length !== closeTags.length) {
    console.warn(`⚠️ Tag imbalance: ${openTags.length} open vs ${closeTags.length} close`);
    errors++;
  }
  
  if (errors === 0) {
    console.log('✅ All validation checks passed');
  } else {
    console.warn(`Found ${errors} potential issues that need manual review`);
  }
};

verify();