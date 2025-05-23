const fs = require('fs');
const cheerio = require('cheerio');

const filePath = './index.html';

let html = fs.readFileSync(filePath, 'utf8');
const $ = cheerio.load(html);

// For each <img> tag:
$('img').each((i, el) => {
  const attribs = el.attribs;
  const srcs = [];

  // Collect all src attributes (yes, can be multiple due to malformed HTML)
  // Because in cheerio/el.attribs, duplicate attributes get overwritten,
  // we'll parse raw HTML string of the element instead:

  const rawHtml = $.html(el);
  // Match all src="..."
  const srcMatches = [...rawHtml.matchAll(/src="[^"]*"/g)];
  if (srcMatches.length <= 1) {
    // No duplicates, nothing to do
    return;
  }

  // Keep only the first src attribute
  // Build new attributes string without any src attributes
  let newAttrs = rawHtml
    .replace(/src="[^"]*"/g, '') // remove all src
    .replace(/^<img\s*/, '<img '); // clean up in case spaces got messed

  // Append first src attribute after <img
  newAttrs = newAttrs.replace(
    /^<img\s*/,
    `<img ${srcMatches[0][0]} `
  );

  // Replace old element with fixed one
  $(el).replaceWith(newAttrs);
});

// Write back fixed HTML
fs.writeFileSync(filePath, $.html());

console.log('Duplicate src attributes removed using cheerio');
