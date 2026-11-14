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
test('search, favorites and empty state work together', () => {
  class Element {
    constructor(){this.children=[];this.value='';this.style={};this.events={};this.dataset={};this.classList={toggle(){}};}
    append(...nodes){this.children.push(...nodes)}
    replaceChildren(){this.children=[]}
    setAttribute(){}
    addEventListener(name, fn){this.events[name]=fn}
    querySelectorAll(){return []}
  }
  const elements=Object.fromEntries(['search','grid','count','empty','surprise'].map(k=>['#'+k,new Element()]));
  const storage={};
  const context={URLSearchParams,location:{hash:''},history:{replaceState(){}},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},document:{querySelector:k=>elements[k],querySelectorAll:()=>[],createElement:()=>new Element()}};
  vm.runInNewContext(match[1],context);
  assert.equal(elements['#grid'].children.length,items.length);
  elements['#search'].value='catppuccin';elements['#search'].events.input();
  assert.equal(elements['#grid'].children.length,1);
  const card=elements['#grid'].children[0];
  card.children[1].children[3].events.click();
  assert.equal(JSON.parse(storage['atlas-favorites']).length,1);
  elements['#search'].value='no-such-wallpaper-xyz';elements['#search'].events.input();
  assert.equal(elements['#grid'].children.length,0);
  assert.equal(elements['#empty'].style.display,'block');
});
