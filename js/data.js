// Product catalogue. Colors drive both variant pickers and the generated product art.
export const COLORS={
  sand:{name:'Sand',hex:'#D8C3A5'},olive:{name:'Olive',hex:'#6B7348'},ink:{name:'Ink',hex:'#26303B'},
  rust:{name:'Rust',hex:'#A5522F'},bone:{name:'Bone',hex:'#EDE6DA'},sky:{name:'Sky',hex:'#9DB7C9'},
  plum:{name:'Plum',hex:'#6E4058'},moss:{name:'Moss',hex:'#4E6147'},butter:{name:'Butter',hex:'#EFD27A'}
};
export const CATEGORIES=[
  {id:'bags',name:'Bags',blurb:'Totes, backpacks and everyday carry'},
  {id:'watches',name:'Watches',blurb:'Quiet, well-made timepieces'},
  {id:'accessories',name:'Accessories',blurb:'Wallets, eyewear and caps'},
  {id:'home',name:'Home',blurb:'Ceramics, lighting and textiles'},
  {id:'clothing',name:'Clothing',blurb:'Wardrobe staples in natural fibres'}
];
const P=(id,name,cat,shape,price,colors,opts={})=>({id,name,cat,shape,price,colors,sizes:opts.sizes||null,
  was:opts.was||null,rating:opts.rating||4.6,reviews:opts.reviews||48,stock:opts.stock??24,best:!!opts.best,isNew:!!opts.isNew,
  bg:opts.bg||'#EEF0EA',desc:opts.desc,details:opts.details||[]});
export const PRODUCTS=[
 P('market-tote','Market Tote','bags','tote',68,['sand','olive','ink'],{best:true,rating:4.8,reviews:212,bg:'#EEF0EA',desc:'A roomy tote in heavyweight waxed canvas that softens with use. Fits a laptop, groceries or a weekend’s worth of layers.',details:['18 oz waxed cotton canvas','Vegetable-tanned leather handles','Inner zip pocket','40 × 36 × 14 cm']}),
 P('city-backpack','City Backpack','bags','backpack',128,['ink','moss','rust'],{best:true,rating:4.7,reviews:164,bg:'#E7ECEF',desc:'A clean-lined 20L backpack with a padded laptop sleeve and a water-resistant finish for daily commutes.',details:['Recycled nylon shell','Padded 15" laptop sleeve','Luggage pass-through','20 litres']}),
 P('crossbody-mini','Mini Crossbody','bags','crossbody',54,['rust','bone','plum'],{isNew:true,rating:4.5,reviews:37,bg:'#F2ECE8',desc:'Just big enough for a phone, keys and cardholder. Adjustable strap wears across the body or on the shoulder.',details:['Pebbled leather','Magnetic snap closure','Adjustable 120 cm strap']}),
 P('field-watch','Field Watch 38','watches','watch',189,['olive','ink','sand'],{best:true,rating:4.9,reviews:301,bg:'#EAEDE4',was:229,desc:'A 38mm field watch with a sapphire crystal and a quiet, legible dial. Water-resistant to 100 metres.',details:['Japanese automatic movement','Sapphire crystal','100 m water resistance','Quick-release strap']}),
 P('dress-watch','Slim Dress Watch','watches','watchSlim',245,['bone','ink','plum'],{rating:4.7,reviews:88,bg:'#F1EFEA',desc:'An ultra-slim 36mm case at 6.8mm thin. Made to disappear under a shirt cuff.',details:['Swiss quartz movement','316L stainless steel','6.8 mm case height','Italian leather strap']}),
 P('leather-wallet','Card Wallet','accessories','wallet',39,['rust','ink','olive'],{best:true,rating:4.8,reviews:410,bg:'#F3EDE6',desc:'Four card slots and a centre pocket for folded notes, cut from a single piece of full-grain leather.',details:['Full-grain leather','4 card slots + centre pocket','Hand-stitched edges']}),
 P('round-sunglasses','Round Sunglasses','accessories','sunglasses',82,['ink','rust','moss'],{isNew:true,rating:4.4,reviews:56,bg:'#EFF2F4',desc:'Acetate frames with polarised lenses and 100% UV protection. Comes with a recycled felt case.',details:['Italian acetate frame','Polarised lenses','UV400 protection']}),
 P('wool-cap','Wool Cap','accessories','cap',34,['olive','ink','butter'],{stock:0,rating:4.3,reviews:29,bg:'#F2F1E6',desc:'A six-panel cap in brushed wool with a leather adjuster strap.',details:['Brushed wool blend','Leather strap adjuster','One size fits most']}),
 P('stoneware-mug','Stoneware Mug','home','mug',24,['bone','sky','moss'],{best:true,rating:4.9,reviews:520,bg:'#EDF0F2',desc:'Wheel-thrown stoneware with a speckled glaze. Holds a generous 350ml and sits comfortably in two hands.',details:['Handmade stoneware','350 ml','Dishwasher and microwave safe'],sizes:null}),
 P('table-lamp','Dome Table Lamp','home','lamp',148,['butter','bone','olive'],{isNew:true,rating:4.6,reviews:44,bg:'#F4F0E4',desc:'A mushroom-shaped lamp with a frosted glass shade that casts a warm, even glow.',details:['Frosted glass shade','Dimmable LED, 2700K','Braided fabric cord','34 cm tall']}),
 P('bud-vase','Ribbed Bud Vase','home','vase',32,['sky','rust','bone'],{rating:4.5,reviews:73,bg:'#EFF1EE',was:42,desc:'A ribbed ceramic vase sized for a single stem or a handful of dried grasses.',details:['Glazed ceramic','Watertight','18 cm tall']}),
 P('soy-candle','Cedar Soy Candle','home','candle',28,['bone','moss','plum'],{rating:4.7,reviews:139,bg:'#F1EEE9',desc:'Cedarwood, vetiver and a hint of black pepper, poured into a reusable amber jar. Around 45 hours of burn time.',details:['Natural soy wax','Cotton wick','45-hour burn time']}),
 P('linen-shirt','Linen Camp Shirt','clothing','shirt',92,['bone','sky','olive'],{best:true,rating:4.6,reviews:176,sizes:['XS','S','M','L','XL'],bg:'#ECEFEA',desc:'A relaxed camp-collar shirt in washed European linen. Breathable, easy, and better with every wash.',details:['100% European linen','Garment washed','Relaxed fit','Corozo buttons']}),
 P('merino-crew','Merino Crew','clothing','sweater',118,['plum','moss','sand'],{isNew:true,rating:4.8,reviews:64,sizes:['XS','S','M','L','XL'],bg:'#F0ECEE',desc:'A fine-gauge crewneck in extra-fine merino. Warm without bulk, soft enough to wear against skin.',details:['100% extra-fine merino','Machine washable','Regular fit']}),
 P('wool-scarf','Lambswool Scarf','clothing','scarf',58,['rust','butter','ink'],{rating:4.7,reviews:91,bg:'#F4EFE6',was:74,desc:'Woven in Scotland from brushed lambswool, with hand-knotted fringe ends.',details:['100% lambswool','Woven in Scotland','180 × 30 cm']}),
 P('canvas-apron','Work Apron','home','apron',46,['ink','sand','moss'],{rating:4.5,reviews:52,bg:'#EEEEE8',desc:'A cross-back apron with two deep pockets, made for kitchens, studios and workshops.',details:['Heavy cotton canvas','Cross-back straps','Two front pockets']})
];
export const REVIEWS=[
 {name:'Hana K.',text:'The Market Tote has gone everywhere with me for a year. The canvas looks better now than the day it arrived.',product:'Market Tote',stars:5},
 {name:'Marcus T.',text:'I bought the Field Watch as a gift to myself and get asked about it every week. Keeps perfect time.',product:'Field Watch 38',stars:5},
 {name:'Elise R.',text:'Fast shipping, lovely packaging with no plastic, and the mug is even nicer in person.',product:'Stoneware Mug',stars:5}
];
export const byId=id=>PRODUCTS.find(p=>p.id===id);
export const money=n=>'$'+n.toFixed(2).replace(/\.00$/,'');
