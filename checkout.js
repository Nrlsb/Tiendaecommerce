/*
  checkout.js
  Maneja la lógica de la página de finalización de compra.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Selectores de elementos del DOM
    const orderSummaryContainer = document.getElementById('order-summary-container');
    const subtotalElement = document.getElementById('summary-subtotal');
    const shippingElement = document.getElementById('summary-shipping');
    const totalElement = document.getElementById('summary-total');
    const checkoutForm = document.getElementById('checkout-form');

    const shippingCost = 10.00; // Costo de envío fijo

    // Obtener el carrito de localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Si el carrito está vacío, redirigir a la página del carrito
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return; // Detener la ejecución del script
    }

    // Función para renderizar el resumen del pedido
    function renderOrderSummary() {
        orderSummaryContainer.innerHTML = ''; // Limpiar
        let subtotal = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'flex justify-between items-center';
            itemElement.innerHTML = `
                <div class="flex items-center space-x-3">
                    <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded-md">
                    <div>
                        <p class="font-semibold">${item.name}</p>
                        <p class="text-sm text-gray-600">Cantidad: ${item.quantity}</p>
                    </div>
                </div>
                <span class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderSummaryContainer.appendChild(itemElement);
            subtotal += item.price * item.quantity;
        });

        // Actualizar los totales
        const total = subtotal + shippingCost;
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Manejar el envío del formulario
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevenir el envío real del formulario

        // Validación simple
        let isValid = true;
        checkoutForm.querySelectorAll('input[required]').forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('border-red-500');
            } else {
                input.classList.remove('border-red-500');
            }
        });

        if (isValid) {
            // Simular proceso de pago
            console.log("Procesando pago...");

            // Limpiar el carrito de localStorage
            localStorage.removeItem('cart');
            
            // Redirigir a la página de agradecimiento
            window.location.href = 'thank-you.html';
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });

    // Carga inicial del resumen
    renderOrderSummary();
});
