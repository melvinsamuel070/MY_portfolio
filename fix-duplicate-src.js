const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Escape the > character in the Jenkins command (line 644)
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 2: Properly close the about section and its parent divs
const aboutSectionStart = html.indexOf('<section id="about">');
const bodyClose = html.indexOf('</body>');

if (aboutSectionStart !== -1 && bodyClose !== -1) {
  // Extract content between section start and body close
  const sectionContent = html.substring(aboutSectionStart, bodyClose);
  
  // Count unclosed divs in this section
  const openDivs = (sectionContent.match(/<div[^>]*>/g) || []).length;
  const closedDivs = (sectionContent.match(/<\/div>/g) || []).length;
  const missingDivCloses = openDivs - closedDivs;
  
  // Build closing tags
  let closingTags = '</section>';
  for (let i = 0; i < missingDivCloses; i++) {
    closingTags = '</div>' + closingTags;
  }
  
  // Insert before </body>
  html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
  console.log(`Added ${missingDivCloses} </div> and </section> before </body>`);
}

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('Fixed validation errors in ' + filePath);