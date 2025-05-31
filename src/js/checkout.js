import CheckoutProcess from "./checkoutProcess.mjs";

document.addEventListener("DOMContentLoaded", () => {
    const checkout = new CheckoutProcess("checkout-form", "so-cart"); // Initialize CheckoutProcess
    
    // Add submit event listener to validate and process checkout
    document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
        e.preventDefault(); // Stop default form submission

        const myForm = document.forms[0]; // Get the form
        const chk_status = myForm.checkValidity(); // Check if all fields pass validation
        myForm.reportValidity(); // Show validation messages

        if (chk_status) {
            myCheckout.checkout(); // Proceed only if the form is valid
        }
    });
});
