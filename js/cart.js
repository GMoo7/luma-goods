// Cart store: persisted in localStorage, broadcasts a "cart:change" event on every update.
const KEY='luma-cart-v1';
const read=()=>{try{return JSON.parse(localStorage.getItem(KEY))||[]}catch{return[]}};
let items=read();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(items))}catch{} window.dispatchEvent(new CustomEvent('cart:change',{detail:items}))};
const key=(id,color,size)=>[id,color,size||''].join('|');
export const cart={
  get items(){return items},
  count(){return items.reduce((n,i)=>n+i.qty,0)},
  add(id,color,size,qty=1){const k=key(id,color,size);const f=items.find(i=>i.key===k);
    if(f)f.qty=Math.min(f.qty+qty,10);else items.push({key:k,id,color,size,qty:Math.min(qty,10)});save()},
  setQty(k,q){const f=items.find(i=>i.key===k);if(!f)return;if(q<=0)items=items.filter(i=>i.key!==k);else f.qty=Math.min(q,10);save()},
  remove(k){items=items.filter(i=>i.key!==k);save()},
  clear(){items=[];save()}
};
window.addEventListener('storage',e=>{if(e.key===KEY){items=read();window.dispatchEvent(new CustomEvent('cart:change',{detail:items}))}});
