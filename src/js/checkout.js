import CheckoutProcess from "./checkoutProcess.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
    new CheckoutProcess("checkout-form", "so-cart"); // Pass the Local Storage key
});


document.addEventListener("DOMContentLoaded", () => {
    new CheckoutProcess("checkout-form");
});

document.addEventListener("DOMContentLoaded", () => {
    new CheckoutProcess("checkout-form");
});


document.querySelector("#checkout-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default submission

    // Simple validation check for empty inputs
    let inputs = document.querySelectorAll("#checkout-form input[required]");
    let allFilled = Array.from(inputs).every(input => input.value.trim() !== "");

    if (!allFilled) {
        alert("Please fill out all required fields.");
        return;
    }

    // If all fields are filled, proceed to process the order
    console.log("Form submitted successfully!"); // This will be replaced with actual checkout logic
});
