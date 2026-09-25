import {PRODUCTS,CATEGORIES,COLORS} from './data.js';
import {mount,card,wireCards,$,$$,esc} from './ui.js';
mount();
const params=new URLSearchParams(location.search);
const state={q:params.get('q')||'',cat:params.get('cat')||'all',colors:new Set((params.get('colors')||'').split(',').filter(Boolean)),
  max:+params.get('max')||300,stock:params.get('stock')==='1',sale:params.get('sale')==='1',sort:params.get('sort')||'featured'};
const allColors=[...new Set(PRODUCTS.flatMap(p=>p.colors))];
$('#f-cats').innerHTML=[{id:'all',name:'All products'},...CATEGORIES].map(c=>`<label class="radio"><input type="radio" name="cat" value="${c.id}"${state.cat===c.id?' checked':''}><span>${c.name}</span><em>${c.id==='all'?PRODUCTS.length:PRODUCTS.filter(p=>p.cat===c.id).length}</em></label>`).join('');
$('#f-colors').innerHTML=allColors.map(k=>`<label class="chip-c" title="${COLORS[k].name}"><input type="checkbox" value="${k}"${state.colors.has(k)?' checked':''}><span style="--c:${COLORS[k].hex}"></span><span class="sr">${COLORS[k].name}</span></label>`).join('');
$('#q').value=state.q;$('#max').value=state.max;$('#stock').checked=state.stock;$('#sale').checked=state.sale;$('#sort').value=state.sort;
const SORTS={featured:(a,b)=>(b.best-a.best)||(b.reviews-a.reviews),'price-asc':(a,b)=>a.price-b.price,'price-desc':(a,b)=>b.price-a.price,rating:(a,b)=>b.rating-a.rating,newest:(a,b)=>b.isNew-a.isNew};
function sync(){
  const p=new URLSearchParams();if(state.q)p.set('q',state.q);if(state.cat!=='all')p.set('cat',state.cat);if(state.colors.size)p.set('colors',[...state.colors].join(','));
  if(state.max<300)p.set('max',state.max);if(state.stock)p.set('stock','1');if(state.sale)p.set('sale','1');if(state.sort!=='featured')p.set('sort',state.sort);
  history.replaceState(null,'',location.pathname+(p.toString()?'?'+p:''));
}
function render(){
  const q=state.q.trim().toLowerCase();
  let list=PRODUCTS.filter(p=>(state.cat==='all'||p.cat===state.cat)&&(!q||(p.name+' '+p.cat+' '+p.desc).toLowerCase().includes(q))
    &&(!state.colors.size||p.colors.some(c=>state.colors.has(c)))&&p.price<=state.max&&(!state.stock||p.stock>0)&&(!state.sale||p.was));
  list.sort(SORTS[state.sort]);
  const cat=CATEGORIES.find(c=>c.id===state.cat);
  $('#title').textContent=q?`Results for “${state.q}”`:cat?cat.name:'Shop all';
  $('#maxv').textContent='$'+state.max;
  $('#count').textContent=`${list.length} ${list.length===1?'product':'products'}`;
  const active=[...(state.cat!=='all'?[['cat',cat.name]]:[]),...(state.q?[['q','“'+state.q+'”']]:[]),...[...state.colors].map(c=>['color:'+c,COLORS[c].name]),...(state.max<300?[['max','Under $'+state.max]]:[]),...(state.stock?[['stock','In stock']]:[]),...(state.sale?[['sale','On sale']]:[])];
  $('#active').innerHTML=active.map(([k,l])=>`<button class="pill" data-k="${k}">${esc(l)} <span aria-hidden="true">×</span><span class="sr">Remove filter</span></button>`).join('')+(active.length?'<button class="link" data-k="all">Clear all</button>':'');
  $('#grid').innerHTML=list.length?list.map(card).join(''):`<div class="empty wide"><h3>No products match those filters</h3><p>Try removing a filter or searching for something broader, like “bag” or “linen”.</p><button class="btn" data-k="all">Clear all filters</button></div>`;
  sync();
}
let t;$('#q').addEventListener('input',e=>{clearTimeout(t);t=setTimeout(()=>{state.q=e.target.value;render()},180)});
$('#f-cats').onchange=e=>{state.cat=e.target.value;render()};
$('#f-colors').onchange=e=>{e.target.checked?state.colors.add(e.target.value):state.colors.delete(e.target.value);render()};
$('#max').oninput=e=>{state.max=+e.target.value;render()};
$('#stock').onchange=e=>{state.stock=e.target.checked;render()};
$('#sale').onchange=e=>{state.sale=e.target.checked;render()};
$('#sort').onchange=e=>{state.sort=e.target.value;render()};
document.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b||!b.closest('#active,#grid'))return;const k=b.dataset.k;
  if(k==='all'){Object.assign(state,{q:'',cat:'all',max:300,stock:false,sale:false});state.colors.clear();$('#q').value='';$('#max').value=300;$('#stock').checked=$('#sale').checked=false;$$('#f-colors input').forEach(i=>i.checked=false);$('#f-cats input[value=all]').checked=true}
  else if(k==='cat'){state.cat='all';$('#f-cats input[value=all]').checked=true}else if(k==='q'){state.q='';$('#q').value=''}
  else if(k.startsWith('color:')){const c=k.slice(6);state.colors.delete(c);$(`#f-colors input[value=${c}]`).checked=false}
  else if(k==='max'){state.max=300;$('#max').value=300}else{state[k]=false;$('#'+k).checked=false}
  render()});
$('#filters-toggle').onclick=()=>{const o=$('.filters').classList.toggle('open');$('#filters-toggle').setAttribute('aria-expanded',o)};
wireCards($('#grid'));render();
