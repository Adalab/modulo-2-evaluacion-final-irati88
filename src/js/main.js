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
    })
    .catch((error) => console.error("Error cargando API:", error)); // Muestra si hay error con la API
};

// Arrancamos la página
getData();

// Función para coger los datos y crear el elemento de HTML
const renderProducts = (product) => {
  let productHtmlCode = "";
  
  productHtmlCode = `<li class="product__card">
    <img
      src="${product.image}"
      class="product__image"
      alt="${product.title}"
    />
    <h3 class="product__title">${product.title}</h3>
    <p class="product__price">${product.price}€</p>
    <button class="product__btn">Comprar</button>
  </li>`;
  return productHtmlCode;
};

// Función que recorre el array y lo pinta en HTML
const showProducts = (products) => {
  let productsListCode = "";
  for (const product of products) {
    productsListCode += renderProducts(product);
  }
  const buttons = document.querySelectorAll(".product__btn");
  console.log(buttons); // Muestra un array vacío?

  const handleBuyButton = () => {
    console.log("click en comprar");
  };

  //buyButton.addEventListener("click", handleBuyButton);
  productList.innerHTML = productsListCode;
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
  let filteredProducts = "";
  for (const product of filteredList) {
    filteredProducts += renderProducts(product);
  }

  if (filteredList.length === 0) {
    productList.innerHTML = "<p>No se encontraron productos.</p>"; // No me sale
  } else {
    productList.innerHTML = filteredProducts;
  }
};

buttonSearch.addEventListener("click", handleSearchButton);

// Al hacer clic sobre el botón Comprar

// El color de fondo y el de fuente cambian y cambia el texto del botón Comprar por Eliminar,
// indicando que es un producto añadido al carrito
