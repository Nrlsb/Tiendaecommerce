/*
  script.js
  Este archivo contiene toda la lógica de JavaScript para la interactividad de la página.
*/

// Esperamos a que todo el contenido del DOM (la estructura HTML) esté completamente cargado y parseado.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Funcionalidad del Menú Móvil ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Añadimos un listener para el evento 'click' en el botón del menú.
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            // Alternamos la clase 'hidden' para mostrar u ocultar el menú.
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Funcionalidad del Carrito de Compras (Simulación) ---
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const notificationModal = document.getElementById('notification-modal');
    
    // Inicializamos el contador del carrito. Podríamos cargarlo de localStorage si quisiéramos persistencia.
    let cartCount = 0;

    // Solo procedemos si encontramos los elementos necesarios en el DOM.
    if (cartCountElement && notificationModal && addToCartButtons.length > 0) {
        
        // Iteramos sobre cada botón de "Añadir al carrito".
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Incrementar el contador del carrito en la variable.
                cartCount++;
                // Actualizamos el texto del elemento en el HTML.
                cartCountElement.textContent = cartCount;
                
                // 2. Animar el contador para dar feedback visual.
                cartCountElement.classList.add('transform', 'scale-150', 'transition-transform', 'duration-200');
                setTimeout(() => {
                    // Removemos la clase de animación después de un breve período.
                    cartCountElement.classList.remove('transform', 'scale-150');
                }, 200);

                // 3. Mostrar la notificación de "Producto añadido".
                showNotification();
            });
        });

        /**
         * Muestra una notificación emergente en la esquina de la pantalla.
         * La notificación aparece y se desvanece después de 3 segundos.
         */
        function showNotification() {
            // Hacemos visible la notificación.
            notificationModal.classList.remove('opacity-0', 'translate-y-10');
            notificationModal.classList.add('opacity-100', 'translate-y-0');

            // Configuramos un temporizador para ocultarla automáticamente.
            setTimeout(() => {
                notificationModal.classList.remove('opacity-100', 'translate-y-0');
                notificationModal.classList.add('opacity-0', 'translate-y-10');
            }, 3000); // La notificación se oculta después de 3 segundos.
        }
    }
});
