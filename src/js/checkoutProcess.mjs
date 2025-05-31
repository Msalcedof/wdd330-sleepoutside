export default class CheckoutProcess {
    constructor(formId, cartKey) {
        this.form = document.querySelector(`#${formId}`);
        this.cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
        this.init();
    }

    init() {
        this.calculateSubtotal();
        this.calculateTotals();

        if (this.form) {
            this.form.addEventListener("submit", (event) => {
                event.preventDefault();
                
                if (this.validateForm()) { //  Run validation before proceeding
                    this.checkout();
                }
            });
        }
    }

    // Computes and displays the item subtotal
    calculateSubtotal() {
        let subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        document.querySelector("#subtotal").textContent = `$${subtotal.toFixed(2)}`;
    }

    // Formats cart items for order submission
    packageItems(items) {
        return items.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: 1 // Adjust if tracking item quantity
        }));
    }

    // Computes and displays tax, shipping, and order total
    calculateTotals() {
        let subtotal = this.cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
        let tax = subtotal * 0.06;
        let shipping = 10 + (this.cartItems.length > 1 ? (this.cartItems.length - 1) * 2 : 0);
        let orderTotal = subtotal + tax + shipping;

        document.querySelector("#tax").textContent = `$${tax.toFixed(2)}`;
        document.querySelector("#shipping").textContent = `$${shipping.toFixed(2)}`;
        document.querySelector("#order-total").textContent = `$${orderTotal.toFixed(2)}`;
    }

    // Validates form fields before submission
    validateForm() {
        const inputs = this.form.querySelectorAll("input[required]");
        let allFilled = Array.from(inputs).every(input => input.value.trim() !== "");

        if (!allFilled) {
            alertMessage("Please fill out all required fields.", true);
            return false; //  Prevent checkout if validation fails
        }

        console.log("Form is valid! Proceeding with checkout...");
        return true; //  Validation passed
    }

    async checkout() {
        const formData = new FormData(this.form);

        let orderData = {
            orderDate: new Date().toISOString(),
            fname: formData.get("fname"),
            lname: formData.get("lname"),
            street: formData.get("street"),
            city: formData.get("city"),
            state: formData.get("state"),
            zip: formData.get("zip"),
            cardNumber: formData.get("cardNumber"),
            expiration: formData.get("expiration"),
            code: formData.get("code"),
            items: this.packageItems(this.cartItems),
            orderTotal: document.querySelector("#order-total").textContent.replace("$", ""),
            shipping: document.querySelector("#shipping").textContent.replace("$", ""),
            tax: document.querySelector("#tax").textContent.replace("$", "")
        };

        try {
            const response = await this.externalServices.checkout(orderData);
            
            if (response) {
                console.log("Order successfully processed:", response);
                alertMessage("Order placed successfully! Redirecting...", true);

                localStorage.removeItem("so-cart"); //  Clear cart after checkout
                window.location.href = "success.html"; //  Redirect user to success page
            } else {
                throw { name: "checkoutError", message: "Failed to process order. Please try again." };
            }
        } catch (error) {
            console.error("Checkout error:", error);
    
            const errorMessage = error.message ? error.message : "An unexpected error occurred.";
            
            // Use `alertMessage()` instead of `alert()`
            alertMessage(`Error: ${errorMessage}`, true);
        }
    }
}
