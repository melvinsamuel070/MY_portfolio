const fs = require('fs');
const filePath = './index.html';

// 1. Read the file
let html = fs.readFileSync(filePath, 'utf8');

// 2. Create backup
fs.writeFileSync(filePath + '.backup', html);
console.log('Backup created');

// 3. GUARANTEED FIX for Jenkins command
const jenkinsFix = (content) => {
    // First try exact match replacement
    const original = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'`;
    const fixed = `echo 'deb https://pkg.jenkins.io/debian-stable binary/ &gt; /etc/apt/sources.list.d/jenkins.list'`;
    
    if (content.includes(original)) {
        return content.split(original).join(fixed);
    }

    // If exact match fails, try more flexible approaches
    const patterns = [
        // Variant with different spacing
        /echo\s+'deb\s+https:\/\/pkg\.jenkins\.io\/debian-stable\s+binary\/\s+>\s+\/etc\/apt\/sources\.list\.d\/jenkins\.list'/,
        // Variant with different quotes
        /echo\s+"deb\s+https:\/\/pkg\.jenkins\.io\/debian-stable\s+binary\/\s+>\s+\/etc\/apt\/sources\.list\.d\/jenkins\.list"/
    ];

    for (const pattern of patterns) {
        if (pattern.test(content)) {
            return content.replace(pattern, match => 
                match.replace('>', '&gt;')
            );
        }
    }

    return content;
};

html = jenkinsFix(html);

// 4. Write the fixed file
fs.writeFileSync(filePath, html);

// 5. VERIFICATION
const verifyFix = (content) => {
    const testPatterns = [
        /> \/etc\/apt\/sources\.list\.d\/jenkins\.list'/,  // Unescaped pattern
        /&gt; \/etc\/apt\/sources\.list\.d\/jenkins\.list'/ // Correct pattern
    ];

    if (testPatterns[0].test(content)) {
        console.error('❌ Fix FAILED: Unescaped > still present');
        return false;
    }

    if (testPatterns[1].test(content)) {
        console.log('✅ Fix VERIFIED: > is now properly escaped');
        return true;
    }

    console.error('❌ Jenkins command not found in file');
    return false;
};

if (verifyFix(html)) {
    console.log('The validator should now pass without errors');
} else {
    console.log('Manual intervention required - please check line 644');
}