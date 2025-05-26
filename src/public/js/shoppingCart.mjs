import { loadTemplate, renderWithTemplate } from "./utils.mjs";

export default class ShoppingCart {
    constructor() {
        this.cartItems = this.getCartItems();
    }

    getCartItems() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    async renderCart() {
        const parentElement = document.querySelector("#cart-list");
        
        if (this.cartItems.length === 0) {
            parentElement.innerHTML = "<p>Your cart is empty.</p>";
            return; // Stops execution if no items exist
        }

        const template = await loadTemplate("../partials/cartItem.html");
        renderWithTemplate(template, parentElement, this.cartItems);
    }

    updateCart(newCartItems) {
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        this.cartItems = newCartItems;
        this.renderCart(); // Re-render the updated cart
    }
}
