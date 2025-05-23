const fs = require('fs');
const filePath = './index.html';

// Read the file
let html = fs.readFileSync(filePath, 'utf8');

// Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Created backup as ' + filePath + '.backup');

// FIX 1: Comprehensive duplicate attribute removal
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

// FIX 2: Specific fix for Jenkins command
html = html.replace(
  /(echo 'deb https:\/\/pkg\.jenkins\.io\/debian-stable binary\/) > (\/etc\/apt\/sources\.list\.d\/jenkins\.list')/g,
  '$1 &gt; $2'
);

// FIX 3: Clean up any malformed tags
html = html.replace(/<([a-z]+)([^>]*?)\/\s+([a-z-]+)=/g, '<$1$2 $3=');

// FIX 4: Additional pass for any remaining src duplicates
html = html.replace(/(src="[^"]*")\s+src="[^"]*"/g, '$1');

// Write the fixed file
fs.writeFileSync(filePath, html);
console.log('Applied all fixes to ' + filePath);

// Comprehensive verification
verifyFixes();

function verifyFixes() {
  // Check for remaining duplicate src attributes
  const remainingSrcDupes = html.match(/<[^>]*?\s+src="[^"]*"\s+src="[^"]*"[^>]*>/g);
  if (remainingSrcDupes) {
    console.error('❌ Error: Found remaining duplicate src attributes:');
    console.error(remainingSrcDupes);
  } else {
    console.log('✅ Verified: No duplicate src attributes remain');
  }

  // Check Jenkins command fix
  const jenkinsFixed = html.includes("echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'");
  if (jenkinsFixed) {
    console.log('✅ Verified: Jenkins command properly escaped');
  } else {
    console.error('❌ Error: Jenkins command still contains unescaped > character');
  }

  // Count remaining issues
  const issuesFound = (remainingSrcDupes ? remainingSrcDupes.length : 0) + (jenkinsFixed ? 0 : 1);
  console.log(`\nFix verification complete. ${issuesFound} issues remain.`);
  
  if (issuesFound > 0) {
    console.error('\nSome issues remain unresolved. Please check the output above.');
    process.exit(1);
  }
}