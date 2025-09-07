console.log("Tamoh ready");const m=document.querySelector(".search__input"),u=document.querySelector(".search__button"),d=document.querySelector(".product__list");let s=[],n=[];const h=()=>{fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{s=t,i(s),a()}).catch(t=>console.error("Error cargando API:",t))};h();const p=t=>{let c="",o="product__btn",e="Comprar";return n.some(r=>r.id===t.id)?(o="product__btn in-cart",e="Eliminar"):(o="product__btn",e="Comprar"),c=`<li class="product__card">
    
    <img src="${t.image}" class="product__image" alt="${t.title}" width="150" height="200" />

    <h3 class="product__title">${t.title}</h3>

    <p class="product__price">${t.price}€</p>

    <button class="${o}" data-id="${t.id}">

        ${e}

      </button>

  </li>`,c},i=t=>{let c="";for(const e of t)c+=p(e);d.innerHTML=c,document.querySelectorAll(".product__btn").forEach(e=>{e.addEventListener("click",_)})},b=()=>{const t=m.value.toLowerCase(),c=s.filter(o=>o.title.toLowerCase().includes(t));f(c)},f=t=>{if(t.length===0)d.innerHTML=`
  <li class="no__results">Oops! You better try again.</li>

`;else{let c="";for(const e of t)c+=p(e);d.innerHTML=c,document.querySelectorAll(".product__btn").forEach(e=>{e.addEventListener("click",_)})}};u&&u.addEventListener("click",b);const g=document.querySelector(".cart__list"),a=()=>{let t="";if(n.length===0)t=`<li class="empty__cart">

    <span>Oh, my. Your cart is empty</span>

    <img src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png" width="150" "height="200" class="cart_icon" />
    
    </li>
    
    `;else{for(const e of n)t+=`

        <li class="cart__item">

          <img src="${e.image}" alt="${e.title}" class="cart__image"  />

          <span class="item__title">${e.title}</span> <span class="item__price">${e.price}€</span>
          
          <button class="remove__btn" data-id="${e.id}">✖</button>
        </li>

      `;t+='<button class="empty__cart-btn">Clear Cart</button>'}g.innerHTML=t;const c=document.querySelector(".empty__cart-btn");c&&c.addEventListener("click",()=>{n=[],a(),i(s)}),document.querySelectorAll(".remove__btn").forEach(e=>{e.addEventListener("click",y)})},y=t=>{const c=parseInt(t.target.dataset.id),o=n.findIndex(e=>e.id===c);o!==-1&&n.splice(o,1),i(s),a()},_=t=>{const c=t.target,o=parseInt(c.dataset.id),e=s.find(r=>r.id===o),l=n.findIndex(r=>r.id===o);l===-1?n.push(e):n.splice(l,1),i(s),a()};
//# sourceMappingURL=main.js.map
