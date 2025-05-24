// const fs = require('fs');
// const filePath = './index.html';

// // Read the file
// let html = fs.readFileSync(filePath, 'utf8');

// // Create backup
// fs.writeFileSync(filePath + '.backup', html);
// console.log('Created backup as ' + filePath + '.backup');

// // FIX 1: Remove ALL duplicate attributes (not just src)
// html = html.replace(/(<[a-z][^>]*?)(\s+[a-z-]+="[^"]*")+/g, (match, tagStart) => {
//   const attributes = new Map();
//   const attrMatches = match.matchAll(/\s+([a-z-]+)="([^"]*)"/g);
  
//   for (const attr of attrMatches) {
//     if (!attributes.has(attr[1])) {
//       attributes.set(attr[1], attr[0]);
//     }
//   }
  
//   return tagStart + Array.from(attributes.values()).join('');
// });

// // FIX 2: Guaranteed fix for Jenkins command escaping
// const jenkinsFix = () => {
//   const jenkinsCommand = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`;
//   const fixedCommand = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'`;

//   if (html.includes(jenkinsCommand)) {
//     return html.split(jenkinsCommand).join(fixedCommand);
//   }
  
//   // Fallback to regex if exact match not found
//   return html.replace(
//     /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
//     '$1 &gt; $2'
//   );
// };
// html = jenkinsFix();

// // FIX 3: Clean up any remaining malformed tags
// html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// // FIX 4: Ensure proper tag nesting (section/div closure)
// const bodyClose = html.indexOf('</body>');
// if (bodyClose !== -1) {
//   // Count unclosed sections/divs before </body>
//   const openTags = html.substring(0, bodyClose).match(/<(section|div)[^>]*>/g) || [];
//   const closeTags = html.substring(0, bodyClose).match(/<\/(section|div)>/g) || [];
  
//   if (openTags.length > closeTags.length) {
//     const missingClosures = [];
//     const tagStack = [];
    
//     // More sophisticated tag balancing
//     const allTags = [...html.substring(0, bodyClose).matchAll(/<(section|div)[^>]*>|<\/(section|div)>/g)];
//     allTags.forEach(tag => {
//       if (tag[0].startsWith('</')) {
//         if (tagStack.length > 0) tagStack.pop();
//       } else {
//         tagStack.push(tag[1]);
//       }
//     });
    
//     // Generate missing closing tags in reverse order
//     const closingTags = tagStack.reverse().map(tag => `</${tag}>`).join('');
//     html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
//     console.log(`Added missing closing tags: ${closingTags}`);
//   }
// }

// // Write the fixed file
// fs.writeFileSync(filePath, html);
// console.log('All fixes applied to ' + filePath);

// // Enhanced verification
// const verify = () => {
//   let errors = 0;
  
//   // Check for remaining duplicates
//   const dupes = html.match(/<[^>]*?\s+([a-z-]+)="[^"]*"\s+\1="[^"]*"[^>]*>/g);
//   if (dupes) {
//     console.warn('⚠️ Remaining duplicate attributes:', dupes.length);
//     errors += dupes.length;
//   }
  
//   // Check for unescaped > in code blocks
//   const unescaped = html.match(/<code>.*>.*<\/code>/);
//   if (unescaped) {
//     console.warn('⚠️ Unescaped > in code blocks:', unescaped.length);
//     errors += unescaped.length;
//   }
  
//   // Check Jenkins command specifically
//   if (html.includes(`> /etc/apt/sources.list.d/jenkins.list'`)) {
//     console.warn('⚠️ Jenkins command still contains unescaped >');
//     errors++;
//   }
  
//   // Check tag balance
//   const openTags = html.match(/<(section|div)[^>]*>/g) || [];
//   const closeTags = html.match(/<\/(section|div)>/g) || [];
//   if (openTags.length !== closeTags.length) {
//     console.warn(`⚠️ Tag imbalance: ${openTags.length} open vs ${closeTags.length} close`);
//     errors++;
//   }
  
//   if (errors === 0) {
//     console.log('✅ All validation checks passed');
//   } else {
//     console.warn(`Found ${errors} potential issues that need manual review`);
//   }
// };

// verify();











const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Remove ALL duplicate attributes per tag
html = html.replace(/<([a-z]+)([^>]*)>/gi, (match, tagName, attributesStr) => {
  const attributes = new Map();
  const attrRegex = /([a-z-]+)(?:="([^"]*)")?/gi;
  let attrMatch;

  while ((attrMatch = attrRegex.exec(attributesStr)) !== null) {
    const attrName = attrMatch[1];
    const attrValue = attrMatch[2] !== undefined ? attrMatch[2] : null;
    // Only add if not already present
    if (!attributes.has(attrName)) {
      attributes.set(attrName, attrValue);
    }
  }

  // Rebuild tag with unique attributes only
  const attrsString = Array.from(attributes.entries())
    .map(([name, value]) => (value === null ? name : `${name}="${value}"`))
    .join(' ');

  return `<${tagName}${attrsString ? ' ' + attrsString : ''}>`;
});

// FIX 2: Escape special characters in Jenkins command lines
const jenkinsCommand = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`;
const jenkinsFixed = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'`;

if (html.includes(jenkinsCommand)) {
  html = html.split(jenkinsCommand).join(jenkinsFixed);
} else {
  html = html.replace(
    /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
    '$1 &gt; $2'
  );
}

// FIX 3: Remove malformed `/ src="..."` or other such duplicated slashes before attributes
html = html.replace(/\/\s+([a-z-]+)=/gi, ' $1=');

// FIX 4: Escape unescaped `<` and `>` inside text nodes (between tags)
html = html.replace(/>([^<>]*[<>][^<>]*)</g, (match, innerText) => {
  const escaped = innerText.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return '>' + escaped + '<';
});

// FIX 5: Remove extra spaces before closing >
html = html.replace(/\s+>/g, '>');

// FIX 6: Ensure proper closing of unbalanced <section> and <div> before </body>
const bodyCloseIndex = html.indexOf('</body>');
if (bodyCloseIndex !== -1) {
  const beforeBody = html.substring(0, bodyCloseIndex);
  const openTags = [...beforeBody.matchAll(/<(section|div)(?!.*\/>)/gi)].map(m => m[1]);
  const closeTags = [...beforeBody.matchAll(/<\/(section|div)>/gi)].map(m => m[1]);

  // Stack to track unclosed tags in order
  const stack = [];

  // Iterate all tags in order
  const allTags = [...beforeBody.matchAll(/<(\/?)(section|div)(?!.*\/>)[^>]*>/gi)];
  allTags.forEach(tag => {
    const isClose = tag[1] === '/';
    const tagName = tag[2].toLowerCase();
    if (!isClose) {
      stack.push(tagName);
    } else {
      if (stack.length > 0) stack.pop();
    }
  });

  if (stack.length > 0) {
    const closingTags = stack.reverse().map(t => `</${t}>`).join('');
    html = html.slice(0, bodyCloseIndex) + closingTags + html.slice(bodyCloseIndex);
    console.log(`Added missing closing tags: ${closingTags}`);
  }
}

// Write fixed file
fs.writeFileSync(filePath, html);
console.log('All fixes applied to ' + filePath);

// Verification of remaining issues
const verify = () => {
  let errors = 0;

  // Check for duplicate attributes (same attribute repeated)
  const dupes = [];
  const tagAttrRegex = /<([a-z]+)([^>]*)>/gi;
  let tagMatch;
  while ((tagMatch = tagAttrRegex.exec(html)) !== null) {
    const attrsStr = tagMatch[2];
    const seen = new Set();
    const attrRegex = /([a-z-]+)=/gi;
    let attrMatch;
    while ((attrMatch = attrRegex.exec(attrsStr)) !== null) {
      const attrName = attrMatch[1];
      if (seen.has(attrName)) {
        dupes.push({ tag: tagMatch[0], attr: attrName });
      } else {
        seen.add(attrName);
      }
    }
  }
  if (dupes.length) {
    console.warn(`⚠️ Remaining duplicate attributes found: ${dupes.length}`);
    errors += dupes.length;
  }

  // Check unescaped > in <code> blocks
  const unescapedCode = html.match(/<code>[^<]*>[^<]*<\/code>/);
  if (unescapedCode) {
    console.warn('⚠️ Unescaped > found inside <code> blocks');
    errors++;
  }

  // Check Jenkins command unescaped >
  if (html.includes(`> /etc/apt/sources.list.d/jenkins.list'`)) {
    console.warn('⚠️ Jenkins command still contains unescaped >');
    errors++;
  }

  // Check for unbalanced tags
  const openCount = (html.match(/<(section|div)(?!.*\/>)/gi) || []).length;
  const closeCount = (html.match(/<\/(section|div)>/gi) || []).length;
  if (openCount !== closeCount) {
    console.warn(`⚠️ Tag imbalance: ${openCount} open vs ${closeCount} close`);
    errors++;
  }

  if (errors === 0) {
    console.log('✅ All validation checks passed');
  } else {
    console.warn(`Found ${errors} potential issues that need manual review`);
  }
};

verify();
