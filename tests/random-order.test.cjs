const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function open(random) {
  const nodes = new Map();
  const node = () => ({ value: '', hidden: false, children: [], events: {}, setAttribute() {}, append(...items) { this.children.push(...items); }, replaceChildren() { this.children = []; }, addEventListener(name, fn) { this.events[name] = fn; } });
  const document = { getElementById(id) { if (!nodes.has(id)) nodes.set(id, node()); return nodes.get(id); }, createElement: node };
  const images = Array.from({ length: 24 }, (_, id) => ({ id, title: String(id), width: 1920, height: 1080, url: '', source: '', style: 'Nature' }));
  const math = Object.create(Math); math.random = random;
  vm.runInNewContext(fs.readFileSync('app.js', 'utf8'), { document, location: { hash: '' }, history: { replaceState() {} }, localStorage: { getItem() { return '[]'; } }, URLSearchParams, Math: math, window: { Atlas: { images, collections: [], select: items => items } } });
  const ids = () => nodes.get('grid').children.map(card => card.children[1].children[0].children[0].textContent);
  return { nodes, ids };
}

test('each page load shuffles once while pagination preserves the order', () => {
  const first = open(() => 0);
  const second = open(() => 0.999);
  const initial = first.ids();
  assert.equal(initial.length, 12);
  assert.notDeepEqual(initial, second.ids());
  first.nodes.get('more').events.click();
  assert.deepEqual(first.ids().slice(0, 12), initial);
  assert.equal(new Set(first.ids()).size, 24);
});
