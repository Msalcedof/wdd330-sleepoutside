import CheckoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const checkout = new CheckoutProcess("checkout-form", "so-cart"); // Initialize CheckoutProcess
    
    // Add submit event listener to validate and process checkout
    document.querySelector("#checkout-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default submission

        // Simple validation check for empty inputs
        let inputs = document.querySelectorAll("#checkout-form input[required]");
        let allFilled = Array.from(inputs).every(input => input.value.trim() !== "");

        if (!allFilled) {
            alert("Please fill out all required fields.");
            return;
        }

        // Proceed with checkout if all fields are filled
        checkout.checkout();
    });
});
