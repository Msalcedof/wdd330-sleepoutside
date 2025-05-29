console.log("Product listing script loaded!");

import ProductData from "./externalServices.mjs";
import ProductList from "./productList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

loadHeaderFooter();

// Get the category from the URL dynamically
const category = getParam("category") || "tents"; // Default to "tents"

const dataSource = new ProductData();
const listElement = document.querySelector("#product-list"); 
const myList = new ProductList(category, dataSource, listElement);
myList.init();

// Update the page title dynamically
document.querySelector("h1").textContent = `Top Products: ${category}`;

// Debugging: Check if products load correctly
async function testAPI() {
    const response = await dataSource.getData(category);
    console.log("API Response Data:", response); // Ensures correct API data structure
}

testAPI(); // Call this function to verify API data in the Console

console.log("Product Listing JS Loaded!");
