/*
  script.js
  Este archivo contiene la lógica de JavaScript compartida en todo el sitio,
  incluyendo la gestión del carrito de compras y el menú móvil.
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Gestión del Carrito de Compras (LocalStorage) ---

    const cartCountElement = document.getElementById('cart-count');
    const notificationModal = document.getElementById('notification-modal');
    
    // Función para añadir un producto al carrito
    window.addToCart = function(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Generar un ID único para el producto para evitar duplicados
        const productId = `${product.name.replace(/\s+/g, '-')}-${product.price}`;

        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            // Si el producto ya existe, incrementa la cantidad
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            // Si no existe, lo añade al carrito
            cart.push({ ...product, id: productId });
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Actualizar el contador y mostrar notificación
        updateCartCount();
        showNotification();
    }

    // Función para actualizar el contador de items en el ícono del carrito
    function updateCartCount() {
        if (!cartCountElement) return;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        // Suma la cantidad de todos los productos en el carrito
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Animar el contador
        cartCountElement.classList.add('transform', 'scale-150', 'transition-transform', 'duration-200');
        setTimeout(() => {
            cartCountElement.classList.remove('transform', 'scale-150');
        }, 200);
    }
    
    // Función para mostrar notificación emergente
    function showNotification() {
        if (!notificationModal) return;
        notificationModal.classList.remove('opacity-0', 'translate-y-10');
        notificationModal.classList.add('opacity-100', 'translate-y-0');

        setTimeout(() => {
            notificationModal.classList.remove('opacity-100', 'translate-y-0');
            notificationModal.classList.add('opacity-0', 'translate-y-10');
        }, 3000);
    }

    // --- Funcionalidad del Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Carga inicial del contador del carrito
    updateCartCount();

    // Escuchar cambios en el storage para actualizar el contador en tiempo real entre pestañas
    window.addEventListener('storage', updateCartCount);
});
