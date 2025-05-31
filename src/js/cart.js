import { getLocalStorage, alertMessage } from "./utils.mjs"; //  Added the suggested import

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];

    // Generate the HTML for each item in the cart
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    // Call subtotal calculation after rendering cart items
    calculateSubtotal(cartItems);
}

function cartItemTemplate(item) {
    return `
    <li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img src="${item.Image}" alt="${item.Name}" />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">Qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${item.Id}">Add to Cart</button> <!--  Added a button -->
    </li>`;
}

// Calculate subtotal based on cart items
function calculateSubtotal(cartItems) {
    let subtotal = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
    
    // Update the subtotal in the cart page
    document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
}

// Add feedback when adding items to the cart
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            alertMessage("Item added to cart!", true); // Shows confirmation message
        });
    });

    const checkoutBtn = document.querySelector("#checkout-btn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            window.location.href = "checkout/index.html";
        });
    }
});

// Render cart contents on page load
renderCartContents();
calculateSubtotal();
