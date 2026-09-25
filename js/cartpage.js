import {cart} from './cart.js';
import {money} from './data.js';
import {mount,$,lineHTML,wireLines,totals,FREE_SHIP} from './ui.js';
mount();
let promo=sessionStorage.getItem('luma-promo')||'';
function render(){
  const t=totals(promo);
  if(!cart.items.length){$('#cart').innerHTML=`<div class="empty wide"><h2>Your cart is empty</h2><p>Find something you’ll use every day.</p><a class="btn" href="shop.html">Browse the shop</a></div>`;return}
  $('#cart').innerHTML=`<div class="cart-grid"><div><ul class="lines big">${cart.items.map(i=>lineHTML(i)).join('')}</ul><button class="link" id="clear">Empty cart</button></div>
  <aside class="summary"><h2>Order summary</h2>
   <div class="row"><span>Subtotal (${cart.count()} items)</span><span>${money(t.sub)}</span></div>
   ${t.discount?`<div class="row good"><span>LUMA10 (−10%)</span><span>−${money(t.discount)}</span></div>`:''}
   <div class="row"><span>Shipping</span><span>${t.shipping?money(t.shipping):'Free'}</span></div>
   ${t.shipping?`<p class="hint">Add ${money(FREE_SHIP-(t.sub-t.discount))} more for free shipping.</p>`:''}
   <div class="row total"><span>Total</span><b>${money(t.total)}</b></div>
   <form id="promo" class="promo"><label for="pc">Promo code</label><div><input id="pc" value="${promo}" placeholder="Try LUMA10"><button class="btn ghost">Apply</button></div><p id="pmsg" role="status"></p></form>
   <a class="btn block" href="checkout.html">Check out</a></aside></div>`;
  $('#clear').onclick=()=>cart.clear();
  $('#promo').onsubmit=e=>{e.preventDefault();const v=$('#pc').value.trim().toUpperCase();
    if(v==='LUMA10'){promo=v;sessionStorage.setItem('luma-promo',v);render();$('#pmsg').textContent='Code applied: 10% off.'}
    else{$('#pmsg').textContent=v?`“${v}” isn’t a valid code. Check the spelling or try LUMA10.`:'Enter a code first.';$('#pmsg').className='err'}};
}
wireLines($('#cart'));window.addEventListener('cart:change',render);render();
