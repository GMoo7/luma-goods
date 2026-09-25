import {PRODUCTS,CATEGORIES,COLORS,REVIEWS,byId} from './data.js';
import {art} from './art.js';
import {mount,card,wireCards,$,stars} from './ui.js';
mount();
// Hero: three objects the visitor can recolour with one control
const hero=['market-tote','field-watch','stoneware-mug'].map(byId);
const palette=['sand','olive','rust','sky'];
const drawHero=k=>{$('#hero-art').innerHTML=hero.map((p,i)=>`<a href="product.html?id=${p.id}" class="h-obj h${i}" aria-label="${p.name}">${art(p,COLORS[k].hex)}</a>`).join('')};
$('#hero-pal').innerHTML=palette.map((k,i)=>`<button class="sw lg${i?'':' on'}" style="--c:${COLORS[k].hex}" data-k="${k}" aria-pressed="${!i}" aria-label="Show in ${COLORS[k].name}"></button>`).join('');
$('#hero-pal').onclick=e=>{const b=e.target.closest('button');if(!b)return;document.querySelectorAll('#hero-pal .sw').forEach(s=>{s.classList.toggle('on',s===b);s.setAttribute('aria-pressed',s===b)});drawHero(b.dataset.k);$('#hero-name').textContent=COLORS[b.dataset.k].name};
drawHero('sand');
$('#cats').innerHTML=CATEGORIES.map(c=>{const p=PRODUCTS.find(x=>x.cat===c.id);return `<a class="cat" href="shop.html?cat=${c.id}">${art(p,COLORS[p.colors[0]].hex)}<span><b>${c.name}</b>${c.blurb}</span></a>`}).join('');
$('#featured').innerHTML=PRODUCTS.filter(p=>p.isNew).slice(0,4).map(card).join('');
$('#best').innerHTML=PRODUCTS.filter(p=>p.best).sort((a,b)=>b.reviews-a.reviews).slice(0,4).map(card).join('');
wireCards($('#featured'));wireCards($('#best'));
$('#reviews').innerHTML=REVIEWS.map(r=>`<figure class="review">${stars(r.stars)}<blockquote>“${r.text}”</blockquote><figcaption><b>${r.name}</b> on ${r.product}</figcaption></figure>`).join('');
