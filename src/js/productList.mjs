import { renderListWithTemplate } from "./utils.mjs";

renderList(list);{
  renderListWithTemplate(productCardTemplate, this.listElement, list);
}


function productCardTemplate(product) {
  return `
    <div class="product-card">
      <img src="${product.PrimaryMedium}" alt="${product.Name}">
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <span>$${product.price}</span>
    </div>
  `;
}



export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);
  }

  renderList(list) {
    const htmlStrings = list.map(productCardTemplate);
    this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
  }
}
