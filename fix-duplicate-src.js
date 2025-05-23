const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Remove all duplicate src attributes
html = html.replace(/(<img[^>]*?)(\s+src="[^"]*")+/g, (match, tagStart) => {
  // Keep only the first src attribute
  const firstSrc = match.match(/\s+src="[^"]*"/);
  return tagStart + (firstSrc ? firstSrc[0] : '');
});

// FIX 2: Escape the > character in the Jenkins command
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 3: Properly close the about section and fix body closing
const aboutSectionStart = html.indexOf('<section id="about">');
const bodyClose = html.indexOf('</body>');

if (aboutSectionStart !== -1 && bodyClose !== -1) {
  // Check if section is already closed
  const sectionClose = html.indexOf('</section>', aboutSectionStart);
  
  if (sectionClose === -1 || sectionClose > bodyClose) {
    // Find all unclosed divs within the section
    const sectionContent = html.substring(aboutSectionStart, bodyClose);
    const openDivs = (sectionContent.match(/<div[^>]*>/g) || []).length;
    const closedDivs = (sectionContent.match(/<\/div>/g) || []).length;
    const missingDivCloses = openDivs - closedDivs;
    
    // Build proper closing structure
    let closingTags = '';
    for (let i = 0; i < missingDivCloses; i++) {
      closingTags += '</div>';
    }
    closingTags += '</section>';
    
    // Insert before </body>
    html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
    console.log('Fixed section and div closing tags');
  }
}

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('All validation errors fixed in ' + filePath);