const products = [
 {id:1,name:"Airdopes 311 Pro",category:"Earbuds",price:1099,mrp:4990,discount:"78% off",rating:"4.8",badge:"Bestseller",image:"assets/earbuds.svg",tone:"Built for all-day listening"},
 {id:2,name:"Rockerz 110",category:"Headphones",price:899,mrp:2490,discount:"64% off",rating:"4.7",badge:"Everyday pick",image:"assets/headphones.svg",tone:"Your daily dose of bass"},
 {id:3,name:"Stone 180",category:"Speakers",price:1199,mrp:2490,discount:"52% off",rating:"4.6",badge:"Fan favourite",image:"assets/speaker.svg",tone:"Take the music outside"},
 {id:4,name:"Nirvana Ion ANC",category:"Earbuds",price:1999,mrp:9990,discount:"80% off",rating:"4.9",badge:"Noise control",image:"assets/earbuds.svg",tone:"Tune out. Lock in."},
 {id:5,name:"Rockerz 412",category:"Headphones",price:1599,mrp:2999,discount:"47% off",rating:"4.8",badge:"New drop",image:"assets/headphones.svg",tone:"Comfort meets clarity"},
 {id:6,name:"Stone 350 Pro",category:"Speakers",price:2499,mrp:4990,discount:"50% off",rating:"4.5",badge:"Party mode",image:"assets/speaker.svg",tone:"Big sound, compact form"},
 {id:7,name:"Airdopes 161",category:"Earbuds",price:1099,mrp:2490,discount:"56% off",rating:"4.8",badge:"Value pick",image:"assets/earbuds.svg",tone:"Ready when you are"},
 {id:8,name:"Rockerz 650 Pro",category:"Headphones",price:3499,mrp:8990,discount:"61% off",rating:"4.8",badge:"Premium sound",image:"assets/headphones.svg",tone:"Make every track count"}
];
let activeFilter="All", cart=[];
const grid=document.getElementById("productGrid");
const money=n=>"₹"+n.toLocaleString("en-IN");
function renderProducts(){
 let list=products.filter(p=>activeFilter==="All"||p.category===activeFilter);
 const sort=document.getElementById("sortSelect")?.value;
 if(sort==="low") list.sort((a,b)=>a.price-b.price);
 if(sort==="high") list.sort((a,b)=>b.price-a.price);
 grid.innerHTML=list.map(p=>`<article class="product-card">
   <div class="product-image"><span class="product-badge">${p.badge}</span><img src="${p.image}" alt="${p.name} product illustration"></div>
   <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="rating"><span>★</span> ${p.rating} · ${p.tone}</div>
   <div class="price-row"><b class="price">${money(p.price)}</b><span class="mrp">${money(p.mrp)}</span><span class="discount">${p.discount}</span></div>
   <button class="add-btn" data-add="${p.id}">ADD TO CART +</button></div></article>`).join("");
}
function setFilter(filter){
 activeFilter=filter;
 document.querySelectorAll(".filter-pill").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
 renderProducts();
}
document.querySelectorAll(".filter-pill").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
document.querySelectorAll("[data-filter-link]").forEach(a=>a.addEventListener("click",()=>setFilter(a.dataset.filterLink)));
document.getElementById("sortSelect").addEventListener("change",renderProducts);
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(!btn)return;addToCart(Number(btn.dataset.add));});
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});updateCart();showToast("Added to your cart");}
function updateCart(){
 const count=cart.reduce((n,x)=>n+x.qty,0),subtotal=cart.reduce((n,x)=>n+products.find(p=>p.id===x.id).price*x.qty,0);
 document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("cartSubtotal").textContent=money(subtotal);
 const holder=document.getElementById("cartItems");
 holder.innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-line"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)} · Qty ${x.qty}</p></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join(""):`<div class="empty-cart"><span>♫</span><h3>Your cart is taking a breather.</h3><p>Add a sound pick to get things started.</p></div>`;
}
document.getElementById("cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;cart=cart.filter(x=>x.id!==Number(b.dataset.remove));updateCart();});
const drawer=document.getElementById("cartDrawer"),backdrop=document.getElementById("cartBackdrop");
function openCart(){drawer.classList.add("open");backdrop.classList.add("open");drawer.setAttribute("aria-hidden","false");}
function closeCart(){drawer.classList.remove("open");backdrop.classList.remove("open");drawer.setAttribute("aria-hidden","true");}
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);backdrop.addEventListener("click",closeCart);
document.getElementById("checkoutBtn").addEventListener("click",()=>showToast(cart.length?"Demo checkout — connect a payment flow for production.":"Your cart is empty"));
const toast=document.getElementById("toast");let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2300);}
document.getElementById("searchToggle").addEventListener("click",()=>{document.getElementById("searchPanel").classList.add("open");document.getElementById("searchInput").focus();});
document.getElementById("closeSearch").addEventListener("click",()=>document.getElementById("searchPanel").classList.remove("open"));
document.getElementById("searchInput").addEventListener("input",e=>{const q=e.target.value.toLowerCase();grid.innerHTML=products.filter(p=>`${p.name} ${p.category} ${p.tone}`.toLowerCase().includes(q)).map(p=>`<article class="product-card"><div class="product-image"><span class="product-badge">${p.badge}</span><img src="${p.image}" alt="${p.name}"></div><div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><div class="price-row"><b class="price">${money(p.price)}</b><span class="mrp">${money(p.mrp)}</span></div><button class="add-btn" data-add="${p.id}">ADD TO CART +</button></div></article>`).join("")||"<p>No matching products. Try another search.</p>";});
document.getElementById("menuToggle").addEventListener("click",()=>document.querySelector(".desktop-nav").classList.toggle("open"));
renderProducts();updateCart();
