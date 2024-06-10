/**
 * Represents a collection of products.
 */
class Products {
  /**
   * Constructs a new instance of the Products class.
   */
  constructor() {
    this.products = {};
  }

  /**
   * Adds a new product to the collection.
   * @returns {number} The ID of the newly added product.
   */
  addProduct() {
    const id = Object.keys(this.products).length + 1;
    this.products[id] = { name: "", price: 0 };
    return id;
  }

  /**
   * Removes the last product from the collection.
   * @returns {number} The ID of the removed product.
   */
  removeProduct() {
    const lastKey = Object.keys(this.products).slice(-1);
    delete this.products[lastKey];
    return lastKey;
  }

  /**
   * Calculates the total price of all products in the collection.
   * @returns {number} The total price.
   */
  getTotalPrice() {
    return Object.values(this.products).reduce(
      (total, product) => total + (product.price || 0),
      0
    );
  }

  /**
   * Retrieves all products in the collection.
   * @returns {Object} The products.
   */
  getProducts() {
    return this.products;
  }

  /**
   * Edits a specific field of a product.
   * @param {number} id - The ID of the product.
   * @param {string} field - The field to edit.
   * @param {any} value - The new value for the field.
   */
  editProduct(id, field, value) {
    this.products[id][field] = value;
  }
}

const productsInstance = new Products();

/**
 * Creates a new product field and adds it to the products list.
 * This function is called when a new product is added.
 */
const createProductField = () => {
  const productId = productsInstance.addProduct();

  const tableButtons = document.getElementById("table-buttons");
  const productsList = document.getElementById("products");
  const productField = document.createElement("tr");
  const productHtml = createProductHtml();

  productField.id = productId;
  productField.innerHTML = productHtml;
  productsList.insertBefore(productField, tableButtons);

  // Focus on name input field
  const productNameInput = productField.getElementsByTagName("input")[0];
  productNameInput.focus();

  productField.addEventListener("input", (e) => {
    if (e.target.id === "product-name") {
      productsInstance.editProduct(productId, "name", e.target.value);
    } else if (e.target.id === "product-price") {
      if (!isNumeric(e.target.value)) {
        e.target.value = null;
      }

      productsInstance.editProduct(
        productId,
        "price",
        parseFloat(e.target.value.replace(/,/g, "."))
      );
      updateTotalPrice();
    }
  });
};

/**
 * Checks if a string is numeric.
 * @param {string} str - The string to check.
 * @returns {boolean} True if the string is numeric, false otherwise.
 */
const isNumeric = (str) => {
  if (typeof str != "string") return false;
  // Remove commas before checking if it's numeric
  const noCommasStr = str.replace(/,/g, '.');
  return !isNaN(noCommasStr) && !isNaN(parseFloat(noCommasStr));
};

/**
 * Deletes a product from the DOM and updates the total price.
 */
const deleteProduct = () => {
  const productId = productsInstance.removeProduct();
  const product = document.getElementById(productId);
  product.remove();

  // If there are no products left, create a new product field
  if (Object.keys(productsInstance.getProducts()).length === 0) {
    createProductField();
  }

  updateTotalPrice();
};

/**
 * Updates the total price on the page.
 */
const updateTotalPrice = () => {
  const totalPrice = document.getElementById("total-price");
  totalPrice.innerText = productsInstance.getTotalPrice();
};

/**
 * Creates the HTML markup for a product.
 * @returns {string} The HTML markup for the product.
 */
const createProductHtml = () => {
  return `
        <td class="w-1/2">
         <input id="product-name" type="text" placeholder="Toode" class="text-text text-[16px] w-full input input-ghost border-b-1 border-x-0 border-t-0 border rounded-none border-border pl-0" />
        </td>
        <td class="relative w-full overflow-hidden input input-ghost border-b-1 border-x-0 border-t-0 border rounded-none border-border flex items-center gap-2 pl-0">
           <input id="product-price" type="text" placeholder="Hind" class="grow text-text" />
           <span class="absolute right-0 text-lg text-neutral">
           €
           </span>
        </td>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  createProductField();
  document
    .getElementById("add-product")
    .addEventListener("click", createProductField);
  document
    .getElementById("delete-product")
    .addEventListener("click", deleteProduct);
});
