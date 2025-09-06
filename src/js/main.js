"use strict";

console.log("Tamoh ready");

const inputSearch = document.querySelector(".search__input");
const buttonSearch = document.querySelector(".search__button");
const productList = document.querySelector(".product__list");

// Array para guardar los productos
let products = [];

// Array para guardar los productos del carrito
let cart = [];

// Variable para guardar una función que recoja los datos del API con fetch
const getData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Guarda los elementos del array
      showProducts(products); // Muestra los productos después de cargarlos
      showCart();  
    })

    .catch((error) => console.error("Error cargando API:", error)); // Muestra si hay error con la API
};

// Arrancamos la página
getData();

// Función para coger los datos y crear el elemento de HTML
const renderProducts = (product) => {
  let productHtmlCode = "";
  let buttonClass = "product__btn";
  let buttonText = "Comprar";

  const isInCart = cart.some((item) => item.id === product.id);

  if (isInCart) {
    buttonClass = "product__btn in-cart";
    buttonText = "Eliminar";
  } else {
    buttonClass = "product__btn";
    buttonText = "Comprar";
  }

  productHtmlCode = `<li class="product__card">
    
    <img src="${product.image}" class="product__image" alt="${product.title}" width="150" "height="200" />

    <h3 class="product__title">${product.title}</h3>

    <p class="product__price">${product.price}€</p>

    <button class="${buttonClass}" data-id="${product.id}">

        ${buttonText}

      </button>

  </li>`;

  return productHtmlCode;
};

// Función que recorre el array y lo pinta en HTML
const showProducts = (products) => {
  let productsListCode = "";

  for (const product of products) {
    productsListCode += renderProducts(product);
  }

  // Incluye el contenido en el DOM
  productList.innerHTML = productsListCode;

  const buttons = document.querySelectorAll(".product__btn");

  buttons.forEach((button) => {
    button.addEventListener("click", handleCartButton);
  });
};

// Al hacer clic sobre el botón de Buscar, la aplicación debe filtrar los productos por su nombre.

const handleSearchButton = () => {
  const inputResult = inputSearch.value.toLowerCase();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(inputResult)
  );

  showFilteredProducts(filteredProducts);
};

const showFilteredProducts = (filteredList) => {
  if (filteredList.length === 0) {
    productList.innerHTML = 
    `
  <li class="no__results">Oops! You better try again.</li>

`;
  } else {
    let filteredProducts = "";

    for (const product of filteredList) {
      filteredProducts += renderProducts(product);
    }
    productList.innerHTML = filteredProducts;

    const buttons = document.querySelectorAll(".product__btn");

    buttons.forEach((button) => {
      button.addEventListener("click", handleCartButton);
    });
  }
};

buttonSearch.addEventListener("click", handleSearchButton);

const cartList = document.querySelector(".cart__list");

const showCart = () => {
  let cartHtml = "";

  if (cart.length === 0) {
    cartHtml = `<li class="empty__cart">

    <span>Oh, my. Your cart is empty</span>

    <img src="https://cdn-icons-png.flaticon.com/512/11010/11010851.png" width="150" "height="200" class="cart_icon" />
    
    </li>
    
    `;
  } else {
    for (const item of cart) {
      cartHtml += `

        <li class="cart__item">

          <img src="${item.image}" alt="${item.title}" class="cart__image"  />

          <span class="item__title">${item.title}</span> <span class="item__price">${item.price}€</span>
          
          <button class="remove__btn" data-id="${item.id}">✖</button>
        </li>

      `;
    }

    cartHtml = `<button class="empty__cart-btn">Clear Cart</button>"`;
    
  }

  cartList.innerHTML = cartHtml;

  // Vaciando el carrito
  const emptyCartButton = document.querySelector(".empty__cart-btn");

  emptyCartButton.addEventListener("click", () => {
    cart = []; // Vacía el carrito
    showCart(); // Actualiza la vista del carrito
    showProducts(products); // Actualiza los botones de los productos
  });

  // Eliminando productos del carrito
  const removeButtons = document.querySelectorAll(".remove__btn");

  removeButtons.forEach((button) => {
    button.addEventListener("click", handleRemoveFromCart);
  });
};

const handleRemoveFromCart = (event) => {
  const productId = parseInt(event.target.dataset.id);

  const index = cart.findIndex((item) => item.id === productId);

  if (index !== -1) {
    cart.splice(index, 1); // Elimina el producto del carrito
  }

  showProducts(products);
  showCart();
};

// Añadiendo & Quitando productos del carrito
const handleCartButton = (event) => {
  const button = event.target;

  const productId = parseInt(button.dataset.id);

  const product = products.find((item) => item.id === productId);

  const index = cart.findIndex((item) => item.id === productId);

  if (index === -1) {
    cart.push(product); // Si no tengo el producto en el carrito, me lo añade
  } else {
    cart.splice(index, 1); // Si tengo el producto en el carrito, me lo quita
  }

  showProducts(products);
  showCart();
};
