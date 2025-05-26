import { getParam, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const productId = getParam("id"); // Retrieves the product ID from the URL
const dataSource = new ProductData(); // No category needed, API handles it

// Function to load product details dynamically
async function loadProductDetails() {
  try {
    if (!productId) {
      console.error("No product ID found in URL");
      return;
    }

    const product = await dataSource.findProductById(productId);
    console.log("Product Data:", product); // Debugging check

    if (!product) {
      console.error("Product not found");
      return;
    }

    // Now update the page with product details
    document.getElementById("product-name").textContent = product.Name;
    document.getElementById("product-image").src = product.PrimaryLarge;
    document.getElementById("product-image").alt = product.Name;
    document.getElementById("product-description").textContent = product.Description;

    // Attach event listener to "Add to Cart" button if product exists
    const addToCartBtn = document.getElementById("addToCart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => addProductToCart(product));
    }
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

// Function to add product to cart
function addProductToCart(product) {
  if (!product) {
    console.error("Invalid product data. Cannot add to cart.");
    return;
  }

  setLocalStorage("so-cart", product);
  console.log(`${product.Name} added to cart!`);
}

// Call the function when the page loads
loadProductDetails();
