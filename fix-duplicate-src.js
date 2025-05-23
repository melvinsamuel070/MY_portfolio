const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Escape the > character in the Jenkins command (very specific replacement)
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 2: Fix the section closing structure
const sectionStart = html.indexOf('<section id="about">');
const bodyClose = html.indexOf('</body>');

if (sectionStart !== -1 && bodyClose !== -1) {
  // Check if there's already a closing section tag
  const sectionClose = html.indexOf('</section>', sectionStart);
  
  if (sectionClose === -1 || sectionClose > bodyClose) {
    // Remove any existing misplaced </section> before </body>
    html = html.replace(/<\/section>\s*<\/body>/, '</body>');
    
    // Add proper closing tags right before </body>
    const sectionContent = html.substring(sectionStart, bodyClose);
    const openDivs = (sectionContent.match(/<div[^>]*>/g) || []).length;
    const closedDivs = (sectionContent.match(/<\/div>/g) || []).length;
    const missingDivCloses = openDivs - closedDivs;
    
    let closingTags = '';
    for (let i = 0; i < missingDivCloses; i++) {
      closingTags += '</div>';
    }
    closingTags += '</section>';
    
    html = html.slice(0, bodyClose) + closingTags + html.slice(bodyClose);
    console.log('Fixed section and div closing structure');
  }
}

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('Applied fixes to ' + filePath);

// Verification
const jenkinsCheck = html.includes("echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'");
console.log(jenkinsCheck ? '✓ Jenkins command fixed' : '✗ Jenkins command still needs fixing');

const sectionCheck = html.indexOf('<section id="about">') !== -1 && 
                    html.indexOf('</section>') !== -1 &&
                    html.indexOf('</section>') < html.indexOf('</body>');
console.log(sectionCheck ? '✓ Section properly closed' : '✗ Section closing still needs work');