const fs = require('fs');
const filePath = './index.html';

// 1. Read the file
let html = fs.readFileSync(filePath, 'utf8');

// 2. Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Backup created');

// 3. Nuclear option for Jenkins command fix
const jenkinsFix = (content) => {
  // Try exact match first
  const exactMatch = "echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'";
  const fixedVersion = "echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'";
  
  if (content.includes(exactMatch)) {
    return content.split(exactMatch).join(fixedVersion);
  }

  // Try more flexible matching
  const variants = [
    /echo\s*'deb\s*https:\/\/pkg\.jenkins\.io\/debian-stable\s*binary\/\s*>\s*\/etc\/apt\/sources\.list\.d\/jenkins\.list'/,
    /echo\s*"deb\s*https:\/\/pkg\.jenkins\.io\/debian-stable\s*binary\/\s*>\s*\/etc\/apt\/sources\.list\.d\/jenkins\.list"/
  ];

  for (const variant of variants) {
    if (variant.test(content)) {
      return content.replace(variant, match => match.replace('>', '&gt;'));
    }
  }

  // Final fallback - brute force line 644
  const lines = content.split('\n');
  if (lines.length > 643 && lines[643].includes('>')) {
    lines[643] = lines[643].replace('>', '&gt;');
    return lines.join('\n');
  }

  return content;
};

html = jenkinsFix(html);

// 4. Write the fixed file
fs.writeFileSync(filePath, html);

// 5. Verify the fix
const verifyFix = (content) => {
  const badPatterns = [
    /echo[^>]*>\/etc\/apt/,
    /pkg\.jenkins\.io[^>]*>/
  ];

  return !badPatterns.some(pattern => pattern.test(content));
};

if (verifyFix(html)) {
  console.log('✅ Jenkins command successfully fixed');
  console.log('The validator should now pass');
} else {
  console.error('❌ Fix not applied successfully');
  console.error('Please manually check line 644 in your file');
  console.error('Replace > with &gt; in the Jenkins command');
}