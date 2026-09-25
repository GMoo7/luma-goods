import {PRODUCTS,COLORS,CATEGORIES,byId,money} from './data.js';
import {art} from './art.js';
import {cart} from './cart.js';

export const $=(s,r=document)=>r.querySelector(s);
export const $$=(s,r=document)=>[...r.querySelectorAll(s)];
export const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const stars=r=>`<span class="stars" aria-label="Rated ${r} out of 5"><span style="width:${r/5*100}%"></span></span>`;
export const FREE_SHIP=90;

export function totals(promo){
  const sub=cart.items.reduce((s,i)=>s+byId(i.id).price*i.qty,0);
  const discount=promo==='LUMA10'?Math.round(sub*.1*100)/100:0;
  const shipping=sub===0||sub-discount>=FREE_SHIP?0:8;
  return {sub,discount,shipping,total:sub-discount+shipping};
}

export function card(p){
  const c=p.colors[0];
  const badge=p.stock===0?'<span class="badge out">Sold out</span>':p.was?'<span class="badge sale">Sale</span>':p.isNew?'<span class="badge">New</span>':'';
  return `<article class="card">
  <a href="product.html?id=${p.id}" class="card-img" data-art>${art(p,COLORS[c].hex)}${badge}</a>
  <div class="card-body">
    <div class="swatches" role="group" aria-label="Preview colour">${p.colors.map((k,i)=>`<button class="sw${i?'':' on'}" style="--c:${COLORS[k].hex}" data-color="${k}" aria-label="${COLORS[k].name}" aria-pressed="${!i}"></button>`).join('')}</div>
    <h3><a href="product.html?id=${p.id}">${esc(p.name)}</a></h3>
    <p class="price">${money(p.price)}${p.was?` <s>${money(p.was)}</s>`:''}</p>
    <p class="meta">${stars(p.rating)} <span>${p.reviews}</span></p>
  </div></article>`;
}
// Swatch hover/click on cards swaps the illustration colour
export function wireCards(root){
  root.addEventListener('click',e=>{const b=e.target.closest('.sw');if(!b)return;const cardEl=b.closest('.card');
    const p=byId(new URL(cardEl.querySelector('a').href).searchParams.get('id'));
    $$('.sw',cardEl).forEach(s=>{s.classList.toggle('on',s===b);s.setAttribute('aria-pressed',s===b)});
    const a=cardEl.querySelector('[data-art]');a.querySelector('svg').outerHTML=art(p,COLORS[b.dataset.color].hex);
    a.href=`product.html?id=${p.id}&color=${b.dataset.color}`});
}

const LOGO=`<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#EFD27A"/><path d="M26 10a11 11 0 1 0 0 20a13 13 0 0 1 0-20z" fill="#2B3326"/></svg>`;
function header(){
  const path=location.pathname.split('/').pop()||'index.html';
  const link=(h,t)=>`<a href="${h}"${path===h.split('?')[0]&&!h.includes('?')?' aria-current="page"':''}>${t}</a>`;
  return `<div class="announce">Free shipping on orders over $${FREE_SHIP}. Code <b>LUMA10</b> takes 10% off your first order.</div>
  <header class="head"><div class="wrap">
    <a class="logo" href="index.html">${LOGO}<span>Luma Goods</span></a>
    <nav class="nav" aria-label="Main">${link('shop.html','Shop all')}${CATEGORIES.slice(0,4).map(c=>link(`shop.html?cat=${c.id}`,c.name)).join('')}</nav>
    <form class="hsearch" action="shop.html" role="search"><label class="sr" for="hq">Search products</label><input id="hq" name="q" type="search" placeholder="Search"></form>
    <button class="cart-btn" aria-label="Open cart"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg><span class="count" aria-live="polite">0</span></button>
  </div></header>`;
}
function footer(){
  return `<footer class="foot"><div class="wrap">
  <div class="cols"><div><a class="logo" href="index.html">${LOGO}<span>Luma Goods</span></a><p>Everyday objects, made to last. A fictional store built as a portfolio demo.</p></div>
  <div><h4>Shop</h4><ul>${CATEGORIES.map(c=>`<li><a href="shop.html?cat=${c.id}">${c.name}</a></li>`).join('')}</ul></div>
  <div><h4>Help</h4><ul><li>Shipping &amp; returns</li><li>Size guide</li><li>Care instructions</li><li>Contact us</li></ul></div>
  <div><h4>Join the list</h4><form class="news" id="news"><label class="sr" for="ne">Email</label><input id="ne" type="email" placeholder="you@email.com" required><button>Sign up</button></form><p class="news-msg" role="status"></p></div></div>
  <div class="base">© ${new Date().getFullYear()} Luma Goods — demo store. No real orders are placed. Built by Hashir.</div></div></footer>`;
}
function drawer(){
  return `<div class="scrim" hidden></div><aside class="drawer" aria-label="Cart" aria-hidden="true" tabindex="-1">
  <div class="dr-head"><h2>Your cart</h2><button class="x" aria-label="Close cart">×</button></div>
  <div class="dr-body"></div><div class="dr-foot"></div></aside><div class="toast" role="status" aria-live="polite"></div>`;
}
export function lineHTML(i,compact){
  const p=byId(i.id);const c=COLORS[i.color];
  return `<li class="line" data-key="${i.key}">
    <a href="product.html?id=${p.id}&color=${i.color}" class="thumb">${art(p,c.hex)}</a>
    <div class="line-info"><a href="product.html?id=${p.id}&color=${i.color}"><b>${esc(p.name)}</b></a><span>${c.name}${i.size?' / '+i.size:''}</span>
      <div class="qty sm"><button data-act="dec" aria-label="Decrease quantity">−</button><output>${i.qty}</output><button data-act="inc" aria-label="Increase quantity">+</button></div></div>
    <div class="line-end"><b>${money(p.price*i.qty)}</b><button class="link" data-act="rm">Remove</button></div></li>`;
}
export function wireLines(root){
  root.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const k=b.closest('.line').dataset.key;const it=cart.items.find(i=>i.key===k);
    if(b.dataset.act==='inc')cart.setQty(k,it.qty+1);if(b.dataset.act==='dec')cart.setQty(k,it.qty-1);if(b.dataset.act==='rm')cart.remove(k)});
}
function renderDrawer(){
  const body=$('.dr-body'),foot=$('.dr-foot');const t=totals();
  if(!cart.items.length){body.innerHTML=`<div class="empty"><p>Your cart is empty.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;foot.innerHTML='';return}
  const left=FREE_SHIP-t.sub;
  body.innerHTML=`<div class="ship-bar"><p>${left>0?`Add <b>${money(left)}</b> for free shipping`:'You’ve unlocked free shipping'}</p><div><span style="width:${Math.min(100,t.sub/FREE_SHIP*100)}%"></span></div></div><ul class="lines">${cart.items.map(i=>lineHTML(i)).join('')}</ul>`;
  foot.innerHTML=`<div class="row"><span>Subtotal</span><b>${money(t.sub)}</b></div><a class="btn block" href="checkout.html">Check out</a><a class="btn ghost block" href="cart.html">View cart</a>`;
}
let lastFocus;
export function openDrawer(){lastFocus=document.activeElement;renderDrawer();$('.drawer').classList.add('open');$('.drawer').setAttribute('aria-hidden','false');$('.scrim').hidden=false;document.body.style.overflow='hidden';$('.drawer .x').focus()}
function closeDrawer(){$('.drawer').classList.remove('open');$('.drawer').setAttribute('aria-hidden','true');$('.scrim').hidden=true;document.body.style.overflow='';lastFocus&&lastFocus.focus()}
export function toast(msg){const t=$('.toast');t.textContent=msg;t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2400)}

export function mount(){
  document.body.insertAdjacentHTML('afterbegin',header());
  document.body.insertAdjacentHTML('beforeend',footer()+drawer());
  const upd=()=>{$('.count').textContent=cart.count();$('.cart-btn').setAttribute('aria-label',`Open cart, ${cart.count()} items`);if($('.drawer').classList.contains('open'))renderDrawer()};
  upd();window.addEventListener('cart:change',upd);
  $('.cart-btn').onclick=openDrawer;$('.drawer .x').onclick=closeDrawer;$('.scrim').onclick=closeDrawer;
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('.drawer').classList.contains('open'))closeDrawer()});
  wireLines($('.dr-body'));
  const q=new URLSearchParams(location.search).get('q');if(q)$('#hq').value=q;
  $('#news').onsubmit=e=>{e.preventDefault();$('.news-msg').textContent='You’re on the list. Watch your inbox for 10% off.';e.target.reset()};
}
