const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');

async function fixHtmlFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');

  // Escape unescaped '&' (ignore already escaped entities)
  content = content.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/g, '&amp;');

  // Find all IDs
  const idRegex = /id="([^"]+)"/g;
  const ids = {};
  let match;

  // Collect IDs
  while ((match = idRegex.exec(content)) !== null) {
    const id = match[1];
    ids[id] = (ids[id] || 0) + 1;
  }

  // For IDs with duplicates, rename duplicates by appending suffix
  for (const id in ids) {
    if (ids[id] > 1) {
      let count = 0;
      content = content.replace(new RegExp(`id="${id}"`, 'g'), () => {
        count++;
        return count === 1 ? `id="${id}"` : `id="${id}-${count}"`;
      });
    }
  }

  // Fix empty <img src=""> or missing src attribute
  // If src="" or src missing, add src="placeholder.png"
  content = content.replace(/<img([^>]*?)src=(['"])(['"])([^>]*?)>/g, '<img$1src=$2placeholder.png$2$4>');
  content = content.replace(/<img((?!src=)[^>]*?)>/g, '<img$1 src="placeholder.png">');

  await fs.writeFile(filePath, content, 'utf8');
}

async function main() {
  const files = glob.sync('**/*.html', {
    ignore: ['node_modules/**', '.git/**'],
  });

  for (const file of files) {
    await fixHtmlFile(file);
    console.log(`Fixed HTML issues in: ${file}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});



// .github/scripts/fix-html.js
const fs = require('fs');

const filePath = './index.html'; // Adjust if your file is somewhere else

let html = fs.readFileSync(filePath, 'utf8');

// This function removes duplicate attributes in all HTML tags, preserving the first occurrence.
html = html.replace(/<([a-zA-Z]+)(\s+[^>]+)>/g, (match, tagName, attrs) => {
  // attrs = string like ' src="a.png" src="b.png" alt="img" src="c.png"'
  // Goal: keep only first src, remove others

  // Split attributes by spaces, but careful with quoted strings
  // We'll parse attrs with regex to get all attr name=value pairs

  const attrRegex = /([^\s=]+)(="[^"]*")?/g;
  let seen = new Set();
  let cleanedAttrs = [];
  let m;
  while ((m = attrRegex.exec(attrs)) !== null) {
    const attrName = m[1];
    const attrValue = m[2] || '';
    if (!seen.has(attrName)) {
      seen.add(attrName);
      cleanedAttrs.push(`${attrName}${attrValue}`);
    }
  }

  return `<${tagName} ${cleanedAttrs.join(' ')}>`;
});

fs.writeFileSync(filePath, html);
console.log('Removed duplicate attributes in:', filePath);
