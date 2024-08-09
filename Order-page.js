document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#orderTable tbody');
    const checkoutButton = document.getElementById('checkoutButton');
    const addToFavoritesButton = document.getElementById('addToFavoritesButton');
    const applyFavoritesButton = document.getElementById('applyFavoritesButton');
    var accordionButton = document.querySelector('.accordion-button');
    var accordionContent = document.querySelector('.accordion-content');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Function to add items to the cart
    document.addEventListener('click', (event) => {
        const addToCartButton = event.target.closest('.order-page-button');
        if (!addToCartButton) return;

        const item = addToCartButton.closest('.order-page-products');
        if (!item) return;

        const name = item.querySelector('.order-page-content-topic').textContent.trim();
        const priceItem = item.querySelector('.order-page-content').textContent.trim();
        const price = parseFloat(priceItem.replace(/,/g, '').split('Rs. ')[1].split('/')[0]);
        const quantityInput = item.querySelector('input[type="number"]');
        const quantity = parseFloat(quantityInput.value);
        const category = item.dataset.category;

        let unit;
        if (['Vegetables', 'Fruits', 'Meat and Seafood'].includes(category)) {
            unit = 'kg';
        } else if (['Dairy Products', 'Baking and Cooking Ingredients'].includes(category)) {
            unit = 'unit';
        } else {
            unit = 'unit'; 
        }

        if (!isNaN(quantity) && quantity > 0) {
            const existingItem = cart.find(cartItem => cartItem.name === name);
            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                const totalPrice = price * quantity;
                cart.push({ name, price, quantity, totalPrice, unit });
            }

            localStorage.setItem('cart', JSON.stringify(cart)); 
            updateTable();
            alert(`${name} has been added to the cart`);
            updateTotalPrice();
        } else {
            alert('Invalid quantity. Please enter a valid quantity');
        }
    });

    // Function to update the table
    function updateTable() {
        tableBody.innerHTML = "";
        cart.forEach(item => {
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = item.name;
            newRow.insertCell(1).textContent = `${item.quantity} ${item.unit}`;
            newRow.insertCell(2).textContent = item.totalPrice.toFixed(2);

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.addEventListener('click', () => removeItem(newRow));
            newRow.insertCell(3).appendChild(removeButton);
        });

        updateTotalPrice();
    }

    // Creating a function to update the total price of the table
    function updateTotalPrice() {
        const totalPrice = cart.reduce((sum, item) => sum + item.totalPrice, 0);
        document.getElementById('total-price').textContent = `Total Price: Rs. ${totalPrice.toFixed(2)}`;
    }

    // Creating a function to remove an item from the order table
    function removeItem(row) {
        const itemName = row.cells[0].textContent;
        row.remove();
        cart = cart.filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateTotalPrice();
    }

    // Creating a function to display cart
    function displayCart() {
        updateTable();
    }

    // Creating a function to add to favorites
    function addToFavorites() {
        localStorage.setItem('favorites', JSON.stringify(cart));
        alert("Favorites saved");
    }

    // Creating a function to apply favorites
    function applyFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites) {
            cart = favorites;
            localStorage.setItem('cart', JSON.stringify(cart)); 
            displayCart();
            alert("Favorites applied!");
        } else {
            alert("No favorites found");
        }
    }

    // Adding event listeners
    addToFavoritesButton.addEventListener('click', addToFavorites);
    applyFavoritesButton.addEventListener('click', applyFavorites);


    // Checkout button functionality
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        // Saving the cart data to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Redirect to the checkout page
        window.location.href = './Check-Out-page.html';
    });

    displayCart();

});


