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

// FIX 2: Escape the > character in the Jenkins command
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 3: Clean up any remaining malformed tags
html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// FIX 4: Ensure proper tag nesting (section and div closures)
const aboutSectionStart = html.indexOf('<section id="about">');
const bodyClose = html.indexOf('</body>');

if (aboutSectionStart !== -1 && bodyClose !== -1) {
  const sectionContent = html.substring(aboutSectionStart, bodyClose);
  
  // Count unclosed divs
  const openDivs = (sectionContent.match(/<div[^>]*>/g) || []).length;
  const closedDivs = (sectionContent.match(/<\/div>/g) || []).length;
  const missingDivCloses = openDivs - closedDivs;
  
  // Build closing tags
  let closingTags = '';
  for (let i = 0; i < missingDivCloses; i++) {
    closingTags += '</div>';
  }
  closingTags += '</section>';
  
  // Insert before </body>
  html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
  console.log(`Added ${missingDivCloses} </div> and </section> before </body>`);
}

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('All validation errors should now be fixed in ' + filePath);

// Verification
const remainingDuplicates = html.match(/<[^>]*?\s+([a-z-]+)="[^"]*"\s+\1="[^"]*"[^>]*>/g);
if (remainingDuplicates) {
  console.warn('Warning: Found some remaining duplicates:');
  console.warn(remainingDuplicates);
} else {
  console.log('Verification: No duplicate attributes found');
}

// Verify the Jenkins command fix
if (html.includes("echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'")) {
  console.warn('Warning: Unescaped > character still found in Jenkins command');
} else {
  console.log('Verification: Jenkins command properly escaped');
}

// Verify section closing
if (html.indexOf('<section id="about">') !== -1 && 
    (html.indexOf('</section>') === -1 || 
     html.indexOf('</section>') > html.indexOf('</body>'))) {
  console.warn('Warning: Section closing tags may still be missing or misplaced');
} else {
  console.log('Verification: Section properly closed');
}