// Wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from local storage
export function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null; // Prevents errors if no data exists
}

// Save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    console.error(`Element not found: ${selector}`);
    return;
  }
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Function to render a list using a template
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) parentElement.innerHTML = "";
  if (!list || list.length === 0) {
    console.warn("No items to render.");
    return;
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// Load external template
export async function loadTemplate(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load template: ${path}`);
    return await res.text();
  } catch (error) {
    console.error(error);
    return ""; // Returns an empty string instead of failing completely
  }
}

// Render template with optional callback
export function renderWithTemplate(template, parentElement, data, callback) {
  if (!template || !parentElement) {
    console.error("Invalid template or parent element.");
    return;
  }
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

// Load Header and Footer
export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("../partials/header.html");
    const headerElement = document.querySelector("#main-header"); // Fixed typo
    if (!headerElement) {
      console.error("Header element not found.");
      return;
    }
    renderWithTemplate(headerTemplate, headerElement);
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

export function getParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}