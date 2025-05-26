import ProductData from "./ProductData.mjs";
import ProductList from "./productList.mjs";

//team activity 03

import { loadHeaderFooter } from "./utils.mjs";
loadHeaderFooter();

//upper is for w03

const dataSource = new ProductData("tents");

const listElement = document.querySelector("#product-list");
const productList = new ProductList("tents", dataSource, listElement);
productList.init();

