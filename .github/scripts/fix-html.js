import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';

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
