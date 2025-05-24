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

// FIX 1: Remove ALL duplicate attributes (not just src)
html = html.replace(/(<[a-z][^>]*?)(\s+[a-z-]+="[^"]*")+/gi, (match, tagStart) => {
  const attributes = new Map();
  const attrMatches = [...match.matchAll(/\s+([a-z-]+)="([^"]*)"/gi)];

  for (const attr of attrMatches) {
    if (!attributes.has(attr[1])) {
      attributes.set(attr[1], attr[0]);
    }
  }

  return tagStart + Array.from(attributes.values()).join('');
});

// FIX 2: Jenkins command escaping fix (specific case)
const jenkinsFix = () => {
  const jenkinsCommand = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`;
  const fixedCommand = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'`;

  if (html.includes(jenkinsCommand)) {
    return html.split(jenkinsCommand).join(fixedCommand);
  }

  // Regex fallback
  return html.replace(
    /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/gi,
    '$1 &gt; $2'
  );
};
html = jenkinsFix();

// FIX 3: Clean up malformed attributes like `/ src="..."`
html = html.replace(/(<[a-z]+[^>]*?)\/\s+([a-z-]+)=/gi, '$1 $2=');

// FIX 4: Escape unescaped < and > inside text nodes (between tags)
html = html.replace(/>([^<>]*?[<>][^<>]*?)</g, (match, p1) => {
  return '>' + p1.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '<';
});

// FIX 5: Remove extra spaces before closing >
html = html.replace(/\s+>/g, '>');

// FIX 6: Ensure proper tag nesting (balance <section> and <div> tags)
const bodyClose = html.indexOf('</body>');
if (bodyClose !== -1) {
  const openTags = html.substring(0, bodyClose).match(/<(section|div)[^>]*>/gi) || [];
  const closeTags = html.substring(0, bodyClose).match(/<\/(section|div)>/gi) || [];

  if (openTags.length > closeTags.length) {
    const tagStack = [];
    const allTags = [...html.substring(0, bodyClose).matchAll(/<(section|div)[^>]*>|<\/(section|div)>/gi)];
    allTags.forEach(tag => {
      if (tag[0].startsWith('</')) {
        if (tagStack.length > 0) tagStack.pop();
      } else {
        tagStack.push(tag[1]);
      }
    });

    const closingTags = tagStack.reverse().map(t => `</${t}>`).join('');
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

  // Check for remaining duplicate attributes in any tag
  const dupes = html.match(/<[^>]*?\s+([a-z-]+)="[^"]*"\s+\1="[^"]*"[^>]*>/gi);
  if (dupes) {
    console.warn('⚠️ Remaining duplicate attributes:', dupes.length);
    errors += dupes.length;
  }

  // Check for unescaped > in <code> blocks
  const unescaped = html.match(/<code>.*>.*<\/code>/gi);
  if (unescaped) {
    console.warn('⚠️ Unescaped > in code blocks:', unescaped.length);
    errors += unescaped.length;
  }

  // Check Jenkins command unescaped >
  if (html.includes(`> /etc/apt/sources.list.d/jenkins.list'`)) {
    console.warn('⚠️ Jenkins command still contains unescaped >');
    errors++;
  }

  // Check tag balance again
  const openTags = html.match(/<(section|div)[^>]*>/gi) || [];
  const closeTags = html.match(/<\/(section|div)>/gi) || [];
  if (openTags.length !== closeTags.length) {
    console.warn(`⚠️ Tag imbalance: ${openTags.length} open vs ${closeTags.length} close`);
    errors++;
  }

  if (errors === 0) {
    console.log('✅ All validation checks passed');
  } else {
    console.warn(`Found ${errors} potential issues that may need manual review`);
  }
};

verify();
