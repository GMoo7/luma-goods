import {cart} from './cart.js';
import {byId,COLORS,money} from './data.js';
import {art} from './art.js';
import {mount,$,$$,totals} from './ui.js';
mount();
const promo=sessionStorage.getItem('luma-promo')||'';
let ship='standard';
const SHIP={standard:{label:'Standard (4–6 days)',price:null},express:{label:'Express (1–2 days)',price:18}};
function sum(){
  const t=totals(promo);const s=SHIP[ship].price??t.shipping;const total=t.sub-t.discount+s;
  $('#sum').innerHTML=`<ul class="mini">${cart.items.map(i=>{const p=byId(i.id);return `<li><span class="thumb">${art(p,COLORS[i.color].hex)}<em>${i.qty}</em></span><span>${p.name}<small>${COLORS[i.color].name}${i.size?' / '+i.size:''}</small></span><b>${money(p.price*i.qty)}</b></li>`}).join('')}</ul>
  <div class="row"><span>Subtotal</span><span>${money(t.sub)}</span></div>${t.discount?`<div class="row good"><span>LUMA10</span><span>−${money(t.discount)}</span></div>`:''}
  <div class="row"><span>Shipping</span><span>${s?money(s):'Free'}</span></div><div class="row total"><span>Total</span><b>${money(total)}</b></div>`;
  return total;
}
if(!cart.items.length){$('#checkout').innerHTML=`<div class="empty wide"><h2>There’s nothing to check out yet</h2><a class="btn" href="shop.html">Browse the shop</a></div>`}
else{
  sum();
  $('#shipopts').onchange=e=>{ship=e.target.value;sum()};
  const fmt={card:v=>v.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 '),exp:v=>v.replace(/\D/g,'').slice(0,4).replace(/(\d{2})(?=\d)/,'$1/'),cvc:v=>v.replace(/\D/g,'').slice(0,4),zip:v=>v.slice(0,10)};
  $$('[data-fmt]').forEach(el=>el.addEventListener('input',()=>el.value=fmt[el.dataset.fmt](el.value)));
  const luhn=n=>{let s=0,d=false;for(let i=n.length-1;i>=0;i--){let x=+n[i];if(d){x*=2;if(x>9)x-=9}s+=x;d=!d}return s%10===0};
  const rules={email:v=>/^\S+@\S+\.\S+$/.test(v)||'Enter a valid email address.',first:v=>!!v.trim()||'Enter your first name.',last:v=>!!v.trim()||'Enter your last name.',
    addr:v=>v.trim().length>4||'Enter your street address.',city:v=>!!v.trim()||'Enter your city.',zip:v=>/^\d{5}(-\d{4})?$/.test(v)||'Enter a 5-digit ZIP code.',
    card:v=>{const n=v.replace(/\s/g,'');return (n.length===16&&luhn(n))||'Enter a valid 16-digit card number. For this demo, use 4242 4242 4242 4242.'},
    exp:v=>{const m=v.match(/^(\d{2})\/(\d{2})$/);if(!m||+m[1]<1||+m[1]>12)return 'Use MM/YY format.';const d=new Date(2000+ +m[2],+m[1]);return d>new Date()||'This card has expired.'},
    cvc:v=>/^\d{3,4}$/.test(v)||'Enter the 3 or 4 digits on the back.'};
  const check=el=>{const r=rules[el.name];if(!r)return true;const res=r(el.value);const f=el.closest('.field');const e=f.querySelector('.err');
    if(res===true){f.classList.remove('bad');el.removeAttribute('aria-invalid');e.textContent='';return true}
    f.classList.add('bad');el.setAttribute('aria-invalid','true');e.textContent=res;return false};
  $$('#co [name]').forEach(el=>el.addEventListener('blur',()=>el.value&&check(el)));
  $('#fill').onclick=()=>{Object.entries({email:'demo@lumagoods.shop',first:'Alex',last:'Rivera',addr:'212 Maple Street',city:'Portland',state:'OR',zip:'97205',card:'4242 4242 4242 4242',exp:'12/29',cvc:'123'}).forEach(([k,v])=>{const el=$(`#co [name=${k}]`);el.value=v;check(el)})};
  $('#co').onsubmit=e=>{e.preventDefault();const ok=$$('#co [name]').map(check).every(Boolean);
    if(!ok){$('#co [aria-invalid=true]').focus();return}
    const b=$('#pay');b.disabled=true;b.textContent='Processing…';
    setTimeout(()=>{const total=sum();const id='LG-'+Math.random().toString(36).slice(2,8).toUpperCase();const n=cart.count();const name=$('#co [name=first]').value;const email=$('#co [name=email]').value;
      cart.clear();sessionStorage.removeItem('luma-promo');
      $('#checkout').innerHTML=`<div class="done"><svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="30" fill="#EFD27A"/><path d="M20 33l8 8 16-18" fill="none" stroke="#2B3326" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <h1>Thanks, ${name}. Your order is placed.</h1><p>Order <b>${id}</b> · ${n} ${n===1?'item':'items'} · ${money(total)}</p><p>A confirmation is on its way to ${email}. (Demo store — no payment was taken and nothing will ship.)</p><a class="btn" href="shop.html">Keep shopping</a></div>`;
      window.scrollTo(0,0)},1100)};
}
