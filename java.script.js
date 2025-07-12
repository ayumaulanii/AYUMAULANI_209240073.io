// Cart functionality
let cart = [];

document.addEventListener('DOMContentLoaded', function () {
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    const cartCounter = document.getElementById('cart-counter');

    // Toggle cart sidebar
    cartBtn.addEventListener('click', function () {
        cartSidebar.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });

    closeCartBtn.addEventListener('click', function () {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    });

    cartOverlay.addEventListener('click', function () {
        cartSidebar.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
        document.body.style.overflow = '';
    });

    // Add to cart functionality
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price'));

            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }

            updateCart();
        });
    });

    function updateCart() {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCounter.textContent = totalItems;

        const cartItemsContainer = document.getElementById('cart-items');
        const emptyCartMessage = document.getElementById('empty-cart-message');

        if (cart.length === 0) {
            emptyCartMessage.classList.remove('hidden');
            cartItemsContainer.innerHTML = '';
            cartItemsContainer.appendChild(emptyCartMessage);
            document.getElementById('cart-subtotal').textContent = '$0.00';
            return;
        }

        emptyCartMessage.classList.add('hidden');
        cartItemsContainer.innerHTML = '';

        let subtotal = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'flex justify-between items-center mb-4 pb-4 border-b';
            cartItem.innerHTML = `
                <div class="flex items-center">
                    <div class="w-16 h-16 bg-gray-200 rounded mr-4 overflow-hidden">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b5357cb1-90d4-4de9-b6a8-03f231be1de8.png" alt="${item.name}" class="w-full h-full object-cover">
                    </div>
                    <div>
                        <h3 class="font-medium">${item.name}</h3>
                        <p class="text-gray-500">$${item.price.toFixed(2)}</p>
                        <button class="remove-item text-pink-600 hover:text-pink-700 text-sm mt-1" data-id="${item.id}">Remove</button>
                    </div>
                </div>
                <div class="flex items-center">
                    <button class="decrement-item w-8 h-8 border rounded flex items-center justify-center" data-id="${item.id}">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="increment-item w-8 h-8 border rounded flex items-center justify-center" data-id="${item.id}">+</button>
                </div>
            `;

            cartItemsContainer.appendChild(cartItem);
        });

        document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;

        // Event Listeners
        document.querySelectorAll('.increment-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                const item = cart.find(item => item.id === itemId);
                if (item) {
                    item.quantity += 1;
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.decrement-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === itemId);

                if (itemIndex !== -1) {
                    cart[itemIndex].quantity -= 1;
                    if (cart[itemIndex].quantity <= 0) {
                        cart.splice(itemIndex, 1);
                    }
                    updateCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const itemId = this.getAttribute('data-id');
                const itemIndex = cart.findIndex(item => item.id === itemId);
                if (itemIndex !== -1) {
                    cart.splice(itemIndex, 1);
                    updateCart();
                }
            });
        });
    }
});
