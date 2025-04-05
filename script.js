document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();

    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const navLinks = document.querySelector(".nav-links");

    // Toggle mobile menu
    hamburgerMenu.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // Search filter for product cards
    const searchInput = document.getElementById("search-input");
    const productCards = document.querySelectorAll(".card-container .card");

    searchInput.addEventListener("input", function () {
        const filter = searchInput.value.toLowerCase();
        productCards.forEach(card => {
            const productName = card.querySelector("h1").textContent.toLowerCase();
            card.style.display = productName.includes(filter) ? "" : "none";
        });
    });
});

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById("cart-count").textContent = totalCount;
}

// Function to add product to cart
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Function to remove item from cart
function removeFromCart(productName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    openCartModal(); // Refresh the modal after removal
}

// Function to open cart modal
// Function to open cart modal
function openCartModal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");

    // Clear previous cart items in the modal
    cartItemsContainer.innerHTML = '';

    // Create table structure
    let table = document.createElement('table');
    table.classList.add('cart-table');

    // Add table headers (without "Total Price")
    let headers = document.createElement('tr');
    headers.innerHTML = `
        <th>P. Name</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Remove</th>
    `;
    table.appendChild(headers);

    // Display cart items in the table
    if (cart.length > 0) {
        cart.forEach(item => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price}</td>
                <td>${item.quantity}</td>
                <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
            `;
            table.appendChild(row);
        });

        // Add a row for the total price (only at the bottom)
        let totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td colspan="1" style="text-align: right;">Total:</td>
            <td>$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</td>
        `;
        table.appendChild(totalRow);
    } else {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    }

    // Append the table to the modal
    cartItemsContainer.appendChild(table);

    // Show the cart modal
    document.getElementById("cart-modal").style.display = "block";
}

// Function to close cart modal
function closeCartModal() {
    document.getElementById("cart-modal").style.display = "none";
}

// Function to open product modal
function openProductModal(name, img, price, color, size, shipping) {
    document.getElementById("product-img").src = img;
    document.getElementById("product-name").textContent = name;
    document.getElementById("product-color").textContent = color;
    document.getElementById("product-size").textContent = size;
    
    // Store product data for modal cart addition
    document.getElementById("add-to-cart-modal").onclick = function () {
        addToCart(name, price);
    };

    document.getElementById("product-modal").style.display = "block";
}

// Function to close product modal
function closeProductModal() {
    document.getElementById("product-modal").style.display = "none";
}
