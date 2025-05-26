import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import { getParam, setLocalStorage } from "./utils.mjs";

const productId = getParam("id"); // Retrieves the product ID from the URL
const dataSource = new ProductData(); // No category needed, API handles it

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

async function loadProductDetails() {
    const product = await dataSource.findProductById(productId);
    console.log("Product Data:", product); // Debugging check

    // Now update the page with product details (example)
    document.getElementById("product-name").textContent = product.Name;
    document.getElementById("product-image").src = product.PrimaryLarge;
    document.getElementById("product-description").textContent = product.Description;
}

// Call the function when the page loads
loadProductDetails();



// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
