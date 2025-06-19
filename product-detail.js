/*
  product-detail.js
  Este script se encarga de poblar la página de detalles del producto
  leyendo los parámetros de la URL.
*/

// Se ejecuta cuando el contenido del HTML ha sido cargado.
document.addEventListener('DOMContentLoaded', () => {

    // Creamos un objeto para acceder fácilmente a los parámetros de la URL.
    const params = new URLSearchParams(window.location.search);

    // Obtenemos los valores para 'product', 'price', y 'img'.
    const productName = params.get('product');
    const productPrice = params.get('price');
    const productImg = params.get('img');

    // Seleccionamos los elementos del DOM que vamos a actualizar.
    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const imageElement = document.getElementById('product-image');

    // Actualizamos el contenido de los elementos con la información del producto.
    // Usamos operadores lógicos OR (||) para poner un texto por defecto si no se encuentra un parámetro.
    if (nameElement) {
        nameElement.textContent = productName || 'Producto no encontrado';
    }
    if (priceElement) {
        // Formateamos el precio para que se vea como moneda.
        priceElement.textContent = productPrice ? `$${productPrice}` : '$0.00';
    }
    if (imageElement) {
        imageElement.src = productImg || 'https://placehold.co/600x600/cccccc/ffffff?text=Imagen+no+disponible';
        // También actualizamos el texto 'alt' por accesibilidad.
        imageElement.alt = productName || 'Imagen del producto';
    }
});
