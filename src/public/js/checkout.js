import { loadHeaderFooter } from "../../js/utils.mjs";
import ShoppingCart from "./shoppingCart.mjs";

loadHeaderFooter();



const cart = new ShoppingCart();
cart.renderCart(); // Render the shopping cart dynamically