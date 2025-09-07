console.log("Tamoh ready");const _=document.querySelector(".search__input"),m=document.querySelector(".search__button"),d=document.querySelector(".product__list");let s=[],n=[];const h=()=>{fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{s=t,a(s),i()}).catch(t=>console.error("Error cargando API:",t))};h();const u=t=>{let o="",c="product__btn",e="Comprar";return n.some(r=>r.id===t.id)?(c="product__btn in-cart",e="Eliminar"):(c="product__btn",e="Comprar"),o=`<li class="product__card">
    
    <img src="${t.image}" class="product__image" alt="${t.title}" width="150" "height="200" />

    <h3 class="product__title">${t.title}</h3>

    <p class="product__price">${t.price}€</p>

    <button class="${c}" data-id="${t.id}">

        ${e}

      </button>

  </li>`,o},a=t=>{let o="";for(const e of t)o+=u(e);d.innerHTML=o,document.querySelectorAll(".product__btn").forEach(e=>{e.addEventListener("click",p)})},b=()=>{const t=_.value.toLowerCase(),o=s.filter(c=>c.title.toLowerCase().includes(t));f(o)},f=t=>{if(t.length===0)d.innerHTML=`
  <li class="no__results">Oops! You better try again.</li>

`;else{let o="";for(const e of t)o+=u(e);d.innerHTML=o,document.querySelectorAll(".product__btn").forEach(e=>{e.addEventListener("click",p)})}};m.addEventListener("click",b);const g=document.querySelector(".cart__list"),i=()=>{let t="";if(n.length===0)t=`<li class="empty__cart">

    <span>Oh, my. Your cart is empty</span>

    <img src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png" width="150" "height="200" class="cart_icon" />
    
    </li>
    
    `;else{for(const e of n)t+=`

        <li class="cart__item">

          <img src="${e.image}" alt="${e.title}" class="cart__image"  />

          <span class="item__title">${e.title}</span> <span class="item__price">${e.price}€</span>
          
          <button class="remove__btn" data-id="${e.id}">✖</button>
        </li>

      `;t='<button class="empty__cart-btn">Clear Cart</button>"'}g.innerHTML=t,document.querySelector(".empty__cart-btn").addEventListener("click",()=>{n=[],i(),a(s)}),document.querySelectorAll(".remove__btn").forEach(e=>{e.addEventListener("click",y)})},y=t=>{const o=parseInt(t.target.dataset.id),c=n.findIndex(e=>e.id===o);c!==-1&&n.splice(c,1),a(s),i()},p=t=>{const o=t.target,c=parseInt(o.dataset.id),e=s.find(r=>r.id===c),l=n.findIndex(r=>r.id===c);l===-1?n.push(e):n.splice(l,1),a(s),i()};
//# sourceMappingURL=main.js.map
