const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Remove ALL duplicate src attributes
html = html.replace(/(<img[^>]*?)(\s+src="[^"]*")+/g, (match, tagStart) => {
  // Keep only the first src attribute
  const firstSrc = match.match(/\s+src="[^"]*"/);
  return tagStart + (firstSrc ? firstSrc[0] : '');
});

// FIX 2: Remove duplicate src attributes from non-img elements
html = html.replace(/(<[a-z][^>]*?)(\s+src="[^"]*")+/g, (match, tagStart) => {
  // Keep only the first src attribute
  const firstSrc = match.match(/\s+src="[^"]*"/);
  return tagStart + (firstSrc ? firstSrc[0] : '');
});

// FIX 3: Escape the > character in the Jenkins command
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 4: Clean up any remaining malformed tags
html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('All duplicate src attributes and special character issues fixed');

// Verification
const remainingDuplicates = html.match(/<[^>]*?\s+src="[^"]*"\s+src="[^"]*"[^>]*>/g);
if (remainingDuplicates) {
  console.warn('Warning: Found some remaining duplicate src attributes:');
  console.warn(remainingDuplicates);
} else {
  console.log('Verification: No duplicate src attributes found');
}

const jenkinsCheck = html.includes("echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'");
console.log(jenkinsCheck ? '✓ Jenkins command fixed' : '✗ Jenkins command still needs fixing');