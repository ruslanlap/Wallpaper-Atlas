const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('index.html', 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(match, 'inline catalog script exists');
const dataMatch = match[1].match(/const items=(\[[\s\S]*?\]);/);
assert.ok(dataMatch, 'catalog data exists');
const items = vm.runInNewContext(dataMatch[1]);
test('catalog entries are complete, unique and use HTTPS', () => {
  assert.ok(items.length >= 8);
  const links = new Set();
  for (const entry of items) {
    assert.equal(entry.length, 5);
    for (const value of entry) assert.ok(typeof value === 'string' && value.trim());
    assert.equal(new URL(entry[3]).protocol, 'https:');
    assert.ok(!links.has(entry[3]), `duplicate URL ${entry[3]}`);
    links.add(entry[3]);
  }
});
test('inline JavaScript parses', () => assert.doesNotThrow(() => new vm.Script(match[1])));
test('catalog has accessible search and status', () => {
  assert.match(html, /aria-label="Search collections"/);
  assert.match(html, /aria-live="polite"/);
});
