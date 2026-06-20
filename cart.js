// State Tracking Matrix array
let cart = [];

// DOM Elements Selection
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartNavButton = document.querySelector('.cart-nav-link'); 
const cartBadge = document.querySelector('.cart-badge');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalPrice = document.getElementById('cart-total-price');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

// Toggle Drawer UI Actions
function toggleCart() {
    cartDrawer.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

if(cartNavButton) cartNavButton.addEventListener('click', (e) => { e.preventDefault(); toggleCart(); });
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Add Item Logic Event Trigger (Main product page button)
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const id = button.getAttribute('data-id');
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));

        const existingItem = cart.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        updateCartUI();
        
        // Auto-open drawer to show the product was added successfully
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
    });
});

// Change Quantity Functions via +/- Buttons
function changeQuantity(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        removeFromCart(id);
    } else {
        updateCartUI();
    }
}

// Directly Update Quantity when user types in a specific number
function updateTypedQuantity(id, value) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    let newQty = parseInt(value);

    // If they delete everything or type 0, remove it. If they type a weird symbol, default to 1.
    if (isNaN(newQty) || newQty <= 0) {
        removeFromCart(id);
    } else {
        item.quantity = newQty;
        updateCartUI();
    }
}

// Remove Item Entirely Function
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Update the visual representation state
function updateCartUI() {
    // 1. Update Notification Badges counts
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if(cartBadge) cartBadge.textContent = totalItems;

    // 2. Clear out current items container layout
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-message">Your cart is empty.</p>';
        cartTotalPrice.textContent = '$0.00';
        return;
    }

    // 3. Render dynamically aggregated rows with editable inputs
    let runningTotal = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        runningTotal += itemTotal;

        const row = document.createElement('div');
        row.className = 'cart-item-row';
        row.innerHTML = `
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span class="cart-item-single-price">$${item.price.toFixed(2)} each</span>
            </div>
            
            <div class="cart-item-controls">
                <div class="quantity-stepper">
                    <button class="stepper-btn" onclick="changeQuantity('${item.id}', -1)">-</button>
                    <!-- Upgraded to an input type number field for manual selection -->
                    <input type="number" 
                           class="stepper-input" 
                           value="${item.quantity}" 
                           min="1"
                           onchange="updateTypedQuantity('${item.id}', this.value)"
                           onfocus="this.select()"> <!-- Auto-highlights the number on click -->
                    <button class="stepper-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                <span class="cart-item-total-price">$${itemTotal.toFixed(2)}</span>
                <button class="delete-item-btn" onclick="removeFromCart('${item.id}')">🗑️</button>
            </div>
        `;
        cartItemsContainer.appendChild(row);
    });

    // 4. Print running mathematical total output
    cartTotalPrice.textContent = `$${runningTotal.toFixed(2)}`;
}