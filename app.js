const products = [

  {
    id: 1,
    name: "Floral Diya Holder",
    category: "diya",
    price: 120,
    image: "assets/product-5.jpg",
    description:
      "Colourful handmade diya holder for festive corners. Colours can be customised."
  },

  {
    id: 2,
    name: "Festive Toran Set",
    category: "toran",
    price: 499,
    image: "assets/product-2.jpg",
    description:
      "Handmade floral toran designed to add a beautiful festive touch to your entrance."
  },

  {
    id: 3,
    name: "Handmade Latkan",
    category: "latkan",
    price: 249,
    image: "assets/product-3.jpg",
    description:
      "Bright handmade flower latkan for doors, walls and festive corners."
  },

  {
    id: 4,
    name: "Flower Latkan Pair",
    category: "latkan",
    price: 469,
    image: "assets/product-4.jpg",
    description:
      "Pair of colourful handmade flower latkans. Custom colour combinations available."
  },

  {
    id: 5,
    name: "Classic Floral Diya",
    category: "diya",
    price: 120,
    image: "assets/product-6.jpg",
    description:
      "Pretty floral diya holder, perfect for festive gifting and home decoration."
  },

  {
    id: 6,
    name: "Pearl Elegance Diya",
    category: "decor",
    price: 230,
    image: "assets/product-5.jpg",
    description:
      "Elegant handmade floral decor piece for festive corners and gifting."
  }

];


let cart = [];


const productGrid =
  document.getElementById("productGrid");

const cartCount =
  document.getElementById("cartCount");

const cartDrawer =
  document.getElementById("cartDrawer");

const cartItems =
  document.getElementById("cartItems");

const cartTotal =
  document.getElementById("cartTotal");

const overlay =
  document.getElementById("overlay");

const mobileMenu =
  document.getElementById("mobileMenu");

const productModal =
  document.getElementById("productModal");


/* MONEY */

function money(value) {

  return "₹" +
    value.toLocaleString("en-IN");

}


/* PRODUCTS */

function renderProducts(filter = "all") {

  productGrid.innerHTML = "";

  const filteredProducts =
    products.filter(product => {

      if (filter === "all") {
        return true;
      }

      return product.category === filter;

    });


  filteredProducts.forEach(product => {

    const card =
      document.createElement("article");

    card.className = "product";


    card.innerHTML = `

      <div class="product-image">

        <img
          src="${product.image}"
          alt="${product.name}"
        >

        <span class="product-tag">
          HANDMADE
        </span>

      </div>


      <div class="product-info">

        <h3>
          ${product.name}
        </h3>


        <div class="product-meta">

          <span class="price">
            ${money(product.price)}
          </span>


          <button
            class="add-product"
            aria-label="Add product"
          >
            +
          </button>

        </div>

      </div>

    `;


    card.addEventListener("click", function (event) {

      if (
        !event.target.classList.contains(
          "add-product"
        )
      ) {

        openProductModal(product);

      }

    });


    card
      .querySelector(".add-product")
      .addEventListener("click", function (event) {

        event.stopPropagation();

        addToCart(product.id);

      });


    productGrid.appendChild(card);

  });

}


/* CART */

function addToCart(id) {

  const existing =
    cart.find(item => item.id === id);


  if (existing) {

    existing.quantity++;

  } else {

    cart.push({
      id: id,
      quantity: 1
    });

  }


  renderCart();

  openCart();

}


function removeFromCart(id) {

  cart =
    cart.filter(item => item.id !== id);

  renderCart();

}


function renderCart() {

  const totalItems =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  cartCount.textContent =
    totalItems;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div
        style="
          text-align:center;
          padding:70px 15px;
          color:#907d74;
        "
      >

        Your bag is waiting
        for something handmade ♡

      </div>

    `;

    cartTotal.textContent = "₹0";

    return;

  }


  let total = 0;


  cartItems.innerHTML =
    cart.map(item => {

      const product =
        products.find(
          p => p.id === item.id
        );


      const itemTotal =
        product.price * item.quantity;


      total += itemTotal;


      return `

        <div class="cart-item">

          <img
            src="${product.image}"
            alt="${product.name}"
          >


          <div>

            <strong>
              ${product.name}
            </strong>

            <small>
              ${money(product.price)}
              ×
              ${item.quantity}
            </small>

          </div>


          <button
            class="remove-item"
            onclick="removeFromCart(${product.id})"
          >
            Remove
          </button>

        </div>

      `;

    }).join("");


  cartTotal.textContent =
    money(total);

}


/* CART OPEN */

function openCart() {

  cartDrawer.classList.add("open");

  overlay.classList.add("show");

}


function closeCart() {

  cartDrawer.classList.remove("open");

  overlay.classList.remove("show");

}


document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


overlay.addEventListener(
  "click",
  closeCart
);


/* MOBILE MENU */

document
  .getElementById("menuBtn")
  .addEventListener(
    "click",
    () => {

      mobileMenu.classList.add("open");

    }
  );


document
  .getElementById("mobileClose")
  .addEventListener(
    "click",
    () => {

      mobileMenu.classList.remove(
        "open"
      );

    }
  );


document
  .querySelectorAll(".mobile-menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mobileMenu.classList.remove(
          "open"
        );

      }
    );

  });


/* FILTERS */

document
  .getElementById("filterToggle")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("filters")
        .classList.toggle("show");

    }
  );


document
  .querySelectorAll(
    ".filters button"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(
            ".filters button"
          )
          .forEach(btn => {

            btn.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        renderProducts(
          button.dataset.filter
        );

      }
    );

  });


/* PRODUCT MODAL */

function openProductModal(product) {

  document.getElementById(
    "modalImage"
  ).src = product.image;


  document.getElementById(
    "modalImage"
  ).alt = product.name;


  document.getElementById(
    "modalCategory"
  ).textContent =
    product.category.toUpperCase();


  document.getElementById(
    "modalTitle"
  ).textContent =
    product.name;


  document.getElementById(
    "modalPrice"
  ).textContent =
    money(product.price);


  document.getElementById(
    "modalDescription"
  ).textContent =
    product.description;


  document.getElementById(
    "modalAdd"
  ).onclick = function () {

    addToCart(product.id);

    closeProductModal();

  };


  productModal.classList.add(
    "show"
  );

}


function closeProductModal() {

  productModal.classList.remove(
    "show"
  );

}


document
  .getElementById("modalClose")
  .addEventListener(
    "click",
    closeProductModal
  );


productModal.addEventListener(
  "click",
  function (event) {

    if (
      event.target === productModal
    ) {

      closeProductModal();

    }

  }
);


/* SEARCH */

document
  .getElementById("searchBtn")
  .addEventListener(
    "click",
    () => {

      document
        .getElementById("shop")
        .scrollIntoView({
          behavior: "smooth"
        });

    }
  );


/* ORDER */

document
  .getElementById("orderBtn")
  .addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        alert(
          "Please add a product first."
        );

        return;

      }


      window.open(
        "https://instagram.com/kalakruti.house",
        "_blank"
      );

    }
  );


/* START */

renderProducts();

renderCart();