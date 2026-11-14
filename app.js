/* No framework, tracking, build step or remote JavaScript. */
(() => {
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(location.hash.slice(1));
  let favorites;
  try { const stored = JSON.parse(localStorage.getItem('atlas-image-favorites') || '[]'); favorites = new Set(Array.isArray(stored) ? stored : []); }
  catch { favorites = new Set(); }
  $('search').value = params.get('q') || '';
  $('platform').value = ['all','mac','windows','linux','android','iphone'].includes(params.get('filter')) ? params.get('filter') : 'all';
  $('style').value = ['Nature','Abstract','Architecture','Space'].includes(params.get('style')) ? params.get('style') : 'all';
  let savedOnly = params.get('saved') === '1';
  function element(tag, text, cls) { const node=document.createElement(tag); if(text) node.textContent=text; if(cls) node.className=cls; return node; }
  function link(text, url) { const a=element('a',text); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; return a; }
  function render() {
    const state={q:$('search').value,filter:$('platform').value,style:$('style').value,saved:savedOnly?'1':'0'};
    try { history.replaceState(null,'','#'+new URLSearchParams(state)); } catch {}
    const images=window.Atlas.select(window.Atlas.images,state,favorites);
    $('saved').setAttribute('aria-pressed',String(savedOnly));
    $('count').textContent=`${images.length} / ${window.Atlas.images.length} wallpapers`;
    $('empty').hidden=images.length>0; $('grid').replaceChildren();
    for(const wall of images) {
      const card=element('article',null,'card');
      const preview=link('',wall.url); preview.className='image-link'; preview.setAttribute('aria-label',`Open ${wall.title} original image`);
      const img=element('img'); img.src=wall.url;img.alt=wall.title;img.loading='lazy';img.decoding='async';img.width=wall.width;img.height=wall.height;
      img.addEventListener('error',()=>{img.hidden=true;const message=element('span','Preview unavailable — open original source','failure');preview.append(message);preview.href=wall.source;},{once:true});preview.append(img);
      const head=element('div',null,'card-head'), info=element('div'); info.append(element('h2',wall.title),element('p',`${wall.width} × ${wall.height} · ${wall.style}`));
      const save=element('button',favorites.has(wall.id)?'★':'☆','save');save.type='button';save.setAttribute('aria-label',`Save ${wall.title}`);save.setAttribute('aria-pressed',String(favorites.has(wall.id)));
      save.addEventListener('click',()=>{favorites.has(wall.id)?favorites.delete(wall.id):favorites.add(wall.id);try{localStorage.setItem('atlas-image-favorites',JSON.stringify([...favorites]));}catch{}if(savedOnly){render()}else{save.textContent=favorites.has(wall.id)?'★':'☆';save.setAttribute('aria-pressed',String(favorites.has(wall.id)));}});
      head.append(info,save);const links=element('div',null,'card-links');links.append(link('Open original ↗',wall.url),link(`Source: ${wall.collection} ↗`,wall.source));card.append(preview,head,links);$('grid').append(card);
    }
  }
  for(const source of window.Atlas.collections){const li=element('li');li.append(link(source[0]+' ↗',source[3]),element('small',source[2]));$('sources').append(li);}
  $('search').addEventListener('input',render);$('platform').addEventListener('change',render);$('style').addEventListener('change',render);$('saved').addEventListener('click',()=>{savedOnly=!savedOnly;render()});
  function reset(){$('search').value='';$('platform').value='all';$('style').value='all';savedOnly=false;render()}
  $('reset').addEventListener('click',reset);$('clear-empty').addEventListener('click',reset);render();
})();
