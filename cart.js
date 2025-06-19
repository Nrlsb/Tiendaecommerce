/*
  cart.js
  Este script maneja la lógica de la página del carrito de compras.
*/

document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalPriceElement = document.getElementById('subtotal-price');
    const totalPriceElement = document.getElementById('total-price');
    const shippingCost = 10.00; // Costo de envío fijo

    // Función para renderizar los items del carrito
    function renderCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="text-center text-gray-500 py-8">Tu carrito está vacío.</p>';
            cartSummary.classList.add('hidden');
            return;
        }

        cartSummary.classList.remove('hidden');

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex items-center justify-between py-4 border-b';
            itemElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <img src="${item.img}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                    <div>
                        <p class="font-bold text-lg">${item.name}</p>
                        <p class="text-gray-600">$${item.price}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input w-20 p-2 border border-gray-300 rounded-lg text-center">
                    <p class="font-bold w-24 text-right">$${(item.price * item.quantity).toFixed(2)}</p>
                    <button data-index="${index}" class="remove-btn text-red-500 hover:text-red-700 transition-all"><i class="fa-solid fa-trash-alt fa-lg"></i></button>
                </div>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        updateCartTotals();
        addEventListenersToCartItems();
    }

    // Función para actualizar los totales
    function updateCartTotals() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const total = subtotal + shippingCost;
        
        subtotalPriceElement.textContent = `$${subtotal.toFixed(2)}`;
        totalPriceElement.textContent = `$${total.toFixed(2)}`;
    }

    // Función para añadir event listeners a los botones de los items
    function addEventListenersToCartItems() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.getAttribute('data-index');
                const newQuantity = parseInt(e.target.value, 10);
                updateQuantity(index, newQuantity);
            });
        });

        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                //currentTarget para asegurar que obtenemos el botón
                const index = e.currentTarget.getAttribute('data-index');
                removeItem(index);
            });
        });
    }

    // Función para actualizar la cantidad
    function updateQuantity(index, quantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart[index]) {
            cart[index].quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart(); // Re-renderizar todo el carrito
            window.dispatchEvent(new Event('storage')); // Notificar a otros scripts
        }
    }

    // Función para remover un item
    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.splice(index, 1); // Remover el item del array
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-renderizar
        window.dispatchEvent(new Event('storage')); // Notificar
    }

    // Carga inicial
    renderCart();
});
