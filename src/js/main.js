"use strict";

console.log(">> Ready :)");

// 3- Guardamos la info que tenemos en "data" en el array "products"

let products = []; // Cambia de "const" a "let" para poderla reutilizar

// 1- Cogemos los datos de la API con "fetch"

// Creamos una variable para guardar una función que recoja los datos del API
const getData = () => {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      products = data; // Guarda los 20 elementos del array
      showProducts();
    });
};

// 4- En una variable, guardamos la función que recorra el array y pinte los elementos en el HTML

const showProducts = () => {
    
};

// 2- Arrancamos la aplicación
getData(); // Invocamos la función



// 5- Escuchar eventos en los productos
