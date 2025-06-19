/*
  product-detail.js
  Este script se encarga de poblar la página de detalles del producto
  y manejar la adición de productos al carrito desde esta página.
*/

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const productName = params.get('product');
    const productPrice = params.get('price');
    const productImg = params.get('img');

    const nameElement = document.getElementById('product-name');
    const priceElement = document.getElementById('product-price');
    const imageElement = document.getElementById('product-image');
    const addToCartButton = document.querySelector('.add-to-cart-btn');
    const quantityInput = document.getElementById('quantity');

    // Poblar los detalles del producto
    if (nameElement) nameElement.textContent = productName || 'Producto no encontrado';
    if (priceElement) priceElement.textContent = productPrice ? `$${productPrice}` : '$0.00';
    if (imageElement) {
        imageElement.src = productImg || 'https://placehold.co/600x600/cccccc/ffffff?text=Imagen+no+disponible';
        imageElement.alt = productName || 'Imagen del producto';
    }

    // Añadir listener al botón de "Añadir al Carrito"
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            // Comprobar que tenemos toda la información necesaria
            if (!productName || !productPrice || !productImg) {
                alert("Error: No se pueden añadir productos sin detalles.");
                return;
            }
            
            const quantity = parseInt(quantityInput.value, 10);
            
            const product = {
                name: productName,
                price: parseFloat(productPrice),
                img: productImg,
                quantity: quantity
            };
            
            // Usamos la función global definida en script.js
            window.addToCart(product);
        });
    }
});
