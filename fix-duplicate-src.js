const fs = require('fs');
const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');

// Fix 1: Escape > character in code block
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/,
  '$1 &gt; $2'
);

// Fix 2: Ensure proper section closing
const aboutSectionStart = html.indexOf('<section id="about">');
if (aboutSectionStart !== -1) {
  const beforeSection = html.substring(0, aboutSectionStart);
  const sectionContent = html.substring(aboutSectionStart);
  
  // Find the matching closing tag
  if (!sectionContent.includes('</section>')) {
    // Find where the section should end (before </body>)
    const bodyClose = html.indexOf('</body>');
    const sectionContentWithClose = html.substring(aboutSectionStart, bodyClose) + '</section>' + html.substring(bodyClose);
    html = beforeSection + sectionContentWithClose;
  }
}

fs.writeFileSync(filePath, html);
console.log('HTML validation issues fixed.');