class Products {
  constructor() {
    this.products = {};
  }

  addProduct() {
    const id = Object.keys(this.products).length + 1;
    this.products[id] = { name: "", price: 0 };
    return id;
  }

  removeProduct() {
    const lastKey = Object.keys(this.products).slice(-1);
    delete this.products[lastKey];
    return lastKey;
  }

  getTotalPrice() {
    return Object.values(this.products).reduce(
      (total, product) => total + (product.price || 0),
      0
    );
  }

  editProduct(id, field, value) {
    this.products[id][field] = value;
  }
}

const productsInstance = new Products();

const createProductField = () => {
  const productId = productsInstance.addProduct();

  const tableButtons = document.getElementById("table-buttons");
  const productsList = document.getElementById("products");
  const productField = document.createElement("tr");
  const productHtml = createProductHtml();

  productField.id = productId;
  productField.innerHTML = productHtml;
  productsList.insertBefore(productField, tableButtons);


  productField.addEventListener("input", (e) => {
    if (e.target.id === "product-name") {
      productsInstance.editProduct(productId, "name", e.target.value);
    } else if (e.target.id === "product-price") {
      const price = parseFloat(e.target.value);
      console.log("🚀 ~ productField.addEventListener ~ price:", price)
      //todo handle validation

      
      productsInstance.editProduct(
        productId,
        "price",
        parseFloat(e.target.value)
      );
      updateTotalPrice();
    }
  });
};

const deleteProduct = () => {
  const productId = productsInstance.removeProduct();
  const product = document.getElementById(productId);
  product.remove();
  updateTotalPrice();
};

const updateTotalPrice = () => {
  const totalPrice = document.getElementById("total-price");
  totalPrice.innerText = productsInstance.getTotalPrice();
};

const createProductHtml = () => {
  return `
        <td class="w-1/2">
         <input id="product-name" type="text" placeholder="Toode" class="text-text w-full input input-ghost border-b-1 border-x-0 border-t-0 border rounded-none border-border pl-0" />
        </td>
        <td class="relative w-full input input-ghost border-b-1 border-x-0 border-t-0 border rounded-none border-border flex items-center gap-2 pl-0">
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
