const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json(); // Convert response body first
  if (res.ok) {
    return jsonResponse; // Return the valid response
  } else {
    throw { name: 'servicesError', message: jsonResponse }; // Send full error details
  }
}

export default class ExternalServices {
    constructor() {}

    // Fetch product data based on category
    async getData(category) {
        const response = await fetch(`${baseURL}/products/search/${category}`);
        return convertToJson(response);
    }

    // Find a specific product by ID
    async findProductById(id) {
        const response = await fetch(`${baseURL}/product/${id}`);
        return convertToJson(response);
    }

    // Checkout process: Sends order data to the backend
    async checkout(orderData) {
        const url = `${baseURL}/checkout`;

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`Checkout failed: ${response.statusText}`);
            }
            return await response.json(); // Returns server response (confirmation)
        } catch (error) {
            console.error("Error processing checkout:", error);
            return null;
        }
    }
}
