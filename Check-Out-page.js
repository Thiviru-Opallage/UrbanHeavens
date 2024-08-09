document.addEventListener('DOMContentLoaded', function() {
    // Retrieve cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderSummaryElement = document.getElementById('orderSummary');

    // Function to display the order summary
    function displayOrderSummary(cart, orderSummaryElement) {
        if (cart.length === 0) {
            orderSummaryElement.innerHTML = "<p>No items in the cart.</p>";
            return;
        }
        orderSummaryElement.innerHTML = "<h2>Order Summary</h2>";
        cart.forEach(item => {
            let itemElement = document.createElement('p');
            itemElement.textContent = `${item.name} - Rs. ${item.price} x ${item.quantity}`;
            orderSummaryElement.appendChild(itemElement);
        });
    }

    // Displaying the order summary
    displayOrderSummary(cart, orderSummaryElement);

    // Function to Handle form submission
    document.querySelector(".submit-button").addEventListener("click", function(event) {
        if (cart.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        let userDetails = getUserDetails();
        console.log("User Details:", userDetails); 

        if (!validateUserDetails(userDetails)) {
            alert("Please fill out all required fields.");
            return;
        }

        // Calculate the delivery date to display the delivery date 3 days from now
        let deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 3);
        let formattedDate = deliveryDate.toLocaleDateString('en-GB'); 

        // Display thank you message with delivery date
        alert(`Thank you for your purchase, ${userDetails.name}! Your order will be delivered by ${formattedDate}.`);

        localStorage.removeItem('cart');

        // After submitting the form redirect to the home page
        window.location.href = 'index.html';
    });

    // Creating a function to get user details
    function getUserDetails() {
        return {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phoneNum').value.trim(),
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            zipCode: document.getElementById('ZipCode').value.trim(),
            cardHolder: document.getElementById('cardHolder').value.trim(),
            cardNumber: document.getElementById('cardNum').value.trim(),
            expiryMonth: document.getElementById('expiryMonth').value.trim()
        };
    }

    // Creating a function to validate user information
    function validateUserDetails(userDetails) {
        console.log("Validating:", userDetails);

        for (let key in userDetails) {
            if (userDetails[key] === "") {
                return false;
            }
        }
        return true;
    }

    // Card input and display functions
    const cardHolderInput = document.getElementById('cardHolder');
    const cardNumberInput = document.getElementById('cardNum');
    const expiryMonthInput = document.getElementById('expiryMonth');

    const displayCardHolder = document.getElementById('displayCardHolder');
    const displayCardNumber = document.getElementById('displayCardNumber');
    const displayExpiry = document.getElementById('displayExpiry');
    const cardNumberError = document.getElementById('cardNumberError');

    cardHolderInput.addEventListener('input', function () {
        displayCardHolder.textContent = cardHolderInput.value || 'Card Holder';
    });

    cardNumberInput.addEventListener('input', function () {
        let cardNumber = cardNumberInput.value.replace(/\D/g, ''); 
        if (cardNumber.length > 16) {
            cardNumber = cardNumber.slice(0, 16); 
        }
        cardNumberInput.value = cardNumber; 
        if (cardNumber.length === 16) {
            const formattedCardNumber = cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
            displayCardNumber.textContent = formattedCardNumber;
            cardNumberError.style.display = 'none';
        } else {
            displayCardNumber.textContent = '#### #### #### ####';
            cardNumberError.style.display = 'block';
        }
    });

    expiryMonthInput.addEventListener('input', function () {
        const expiryDate = expiryMonthInput.value;
        if (expiryDate) {
            const [month, year] = expiryDate.split('-');
            displayExpiry.textContent = `Expires: ${month}/${year.slice(-2)}`;
        } else {
            displayExpiry.textContent = 'Expires: MM/YY';
        }
    });

    expiryMonthInput.addEventListener('input', function () {
        const expiryDate = expiryMonthInput.value;
        if (expiryDate) {
            const [year, month] = expiryDate.split('-');
            displayExpiry.textContent = `Expires: ${month}/${year.slice(-2)}`;
        } else {
            displayExpiry.textContent = 'Expires: MM/YY';
        }
    });
});
