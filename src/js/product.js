import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve existing cart or initialize an empty array
    cart.push(product); // Append new product instead of replacing
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
