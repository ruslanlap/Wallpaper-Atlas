const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('available previews render locally, fall back to originals, and are included in Pages', () => {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync('catalog.js', 'utf8'), context);
  const images = context.window.Atlas.images;
  const previewFiles = fs.readdirSync('previews', { recursive: true }).filter(p => p.endsWith('.jpg')).map(p => `previews/${p}`);
  assert.deepEqual(Array.from(images.filter(x => x.preview), x => x.preview).sort(), previewFiles.sort());
  const withPreview = images.find(x => x.id === 'mountain-lake');
  const withoutPreview = images.find(x => !x.preview);
  assert.equal(withPreview.preview, 'previews/desktop/mountain-lake.jpg');
  const nodes = new Map();
  const node = () => ({ value: '', children: [], events: {}, setAttribute() {}, getAttribute(name) { return this[name]; }, append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; }, addEventListener(name, fn) { this.events[name] = fn; } });
  const document = { getElementById(id) { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); }, createElement: node };
  vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), { document, location: { hash: '' }, history: { replaceState() {} }, localStorage: { getItem() { return '[]'; } }, URLSearchParams, window: { Atlas: { images: [withPreview, withoutPreview], collections: [], select: items => items } } });
  for (const card of nodes.get('grid').children) {
    const preview = card.children[0], img = preview.children[0];
    const wall = [withPreview, withoutPreview].find(x => x.title === img.alt);
    assert.equal(img.src, wall.preview || wall.url);
    assert.equal(preview.href, wall.url);
    assert.equal(card.children[2].children[0].href, wall.url);
    assert.equal(card.children[2].children[1].href, wall.source);
    if (wall.preview) { img.events.error(); assert.equal(img.src, wall.url); }
    img.events.error(); assert.equal(img.hidden, true); assert.equal(preview.href, wall.source);
  }
  assert.match(fs.readFileSync('.github/workflows/pages.yml', 'utf8'), /cp\s+-r\s+previews\s+_site\//);
});
