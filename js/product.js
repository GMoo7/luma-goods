import {PRODUCTS,COLORS,CATEGORIES,byId,money} from './data.js';
import {art} from './art.js';
import {cart} from './cart.js';
import {mount,card,wireCards,$,$$,stars,openDrawer,toast} from './ui.js';
mount();
const params=new URLSearchParams(location.search);
const p=byId(params.get('id'))||PRODUCTS[0];
let color=p.colors.includes(params.get('color'))?params.get('color'):p.colors[0],size=null,qty=1,view=0;
document.title=`${p.name} — Luma Goods`;
document.querySelector('meta[name=description]').content=`${p.name}, ${money(p.price)}. ${p.desc}`.slice(0,158);
const cat=CATEGORIES.find(c=>c.id===p.cat);
$('#crumbs').innerHTML=`<a href="index.html">Home</a> / <a href="shop.html?cat=${cat.id}">${cat.name}</a> / <span>${p.name}</span>`;
function gallery(){
  $('#main-img').innerHTML=art(p,COLORS[color].hex,view);
  $('#thumbs').innerHTML=[0,1,2].map(v=>`<button class="${v===view?'on':''}" data-v="${v}" aria-label="View ${v+1}" aria-pressed="${v===view}">${art(p,COLORS[color].hex,v)}</button>`).join('');
}
$('#thumbs').onclick=e=>{const b=e.target.closest('button');if(!b)return;view=+b.dataset.v;gallery()};
const sold=p.stock===0;
$('#info').innerHTML=`
 <h1>${p.name}</h1>
 <p class="meta">${stars(p.rating)} <a href="#reviews-sec">${p.rating} · ${p.reviews} reviews</a></p>
 <p class="big-price">${money(p.price)}${p.was?` <s>${money(p.was)}</s> <span class="badge sale">Save ${money(p.was-p.price)}</span>`:''}</p>
 <p>${p.desc}</p>
 <fieldset><legend>Colour: <b id="cname">${COLORS[color].name}</b></legend><div class="swatches" id="colors">${p.colors.map(k=>`<button class="sw lg${k===color?' on':''}" style="--c:${COLORS[k].hex}" data-c="${k}" aria-label="${COLORS[k].name}" aria-pressed="${k===color}"></button>`).join('')}</div></fieldset>
 ${p.sizes?`<fieldset><legend>Size</legend><div class="sizes" id="sizes">${p.sizes.map(s=>`<button data-s="${s}" aria-pressed="false">${s}</button>`).join('')}</div><p class="err" id="size-err" hidden>Choose a size to continue.</p></fieldset>`:''}
 <div class="buy">
   <div class="qty"><button id="dec" aria-label="Decrease quantity">−</button><output id="qv" aria-live="polite">1</output><button id="inc" aria-label="Increase quantity">+</button></div>
   <button class="btn grow" id="add"${sold?' disabled':''}>${sold?'Sold out':'Add to cart'}</button>
 </div>
 <p class="stock">${sold?'Out of stock — back in about 3 weeks.':p.stock<10?`Only ${p.stock} left in stock.`:'In stock, ships in 1–2 business days.'}</p>
 <details open><summary>Details</summary><ul>${p.details.map(d=>`<li>${d}</li>`).join('')}</ul></details>
 <details><summary>Shipping &amp; returns</summary><p>Free shipping over $90. Free returns within 30 days, no questions asked.</p></details>`;
$('#colors').onclick=e=>{const b=e.target.closest('button');if(!b)return;color=b.dataset.c;$$('#colors .sw').forEach(s=>{s.classList.toggle('on',s===b);s.setAttribute('aria-pressed',s===b)});$('#cname').textContent=COLORS[color].name;gallery();history.replaceState(null,'',`?id=${p.id}&color=${color}`)};
if(p.sizes)$('#sizes').onclick=e=>{const b=e.target.closest('button');if(!b)return;size=b.dataset.s;$$('#sizes button').forEach(s=>s.setAttribute('aria-pressed',s===b));$('#size-err').hidden=true};
const setQ=n=>{qty=Math.max(1,Math.min(10,n));$('#qv').textContent=qty};
$('#dec').onclick=()=>setQ(qty-1);$('#inc').onclick=()=>setQ(qty+1);
$('#add').onclick=()=>{if(p.sizes&&!size){$('#size-err').hidden=false;$('#sizes button').focus();return}
  cart.add(p.id,color,size,qty);toast(`Added ${qty} × ${p.name} to your cart`);openDrawer()};
gallery();
$('#rel').innerHTML=PRODUCTS.filter(x=>x.cat===p.cat&&x.id!==p.id).concat(PRODUCTS.filter(x=>x.best&&x.cat!==p.cat)).slice(0,4).map(card).join('');
wireCards($('#rel'));
const R=[['Beautiful quality','Exactly as pictured and clearly well made. Would buy again.','Jordan P.',5],['Great everyday piece','I use it daily. The colour is slightly deeper in person, which I prefer.','Sam W.',5],['Good, runs small','Lovely material. I’d suggest going one size up if you’re between sizes.','Alex M.',4]];
$('#reviews').innerHTML=R.map(([t,b,n,s])=>`<article class="review">${stars(s)}<h3>${t}</h3><p>${b}</p><small>${n} · Verified buyer</small></article>`).join('');
