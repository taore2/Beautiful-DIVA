const products = [
  {
    id: 1,
    name: "Parfum Élégance",
    category: "Cosmétiques",
    price: 10000
  },

  {
    id: 2,
    name: "Crème Visage Éclat",
    category: "Cosmétiques",
    price: 5000
  },

  {
    id: 3,
    name: "Huile Capillaire",
    category: "Cosmétiques",
    price: 3500
  },

  {
    id: 4,
    name: "Smartphone Android",
    category: "Téléphones",
    price: 85000
  },

  {
    id: 5,
    name: "iPhone",
    category: "Téléphones",
    price: 250000
  },

  {
    id: 6,
    name: "Tablette Android",
    category: "Tablettes",
    price: 75000
  },

  {
    id: 7,
    name: "Écouteurs Bluetooth",
    category: "Accessoires",
    price: 10000
  },

  {
    id: 8,
    name: "Chargeur rapide",
    category: "Accessoires",
    price: 5000
  },

  {
    id: 9,
    name: "Power Bank 20 000 mAh",
    category: "Accessoires",
    price: 15000
  }
];

let cart = [];
let selectedCategory = "Tous";

function formatPrice(price) {
  return price.toLocaleString("fr-FR");
}

function displayProducts() {

  const container = document.getElementById("products");

  const search =
    document.getElementById("search").value.toLowerCase();

  container.innerHTML = "";

  const filtered = products.filter(product => {

    const categoryOK =
      selectedCategory === "Tous" ||
      product.category === selectedCategory;

    const searchOK =
      product.name.toLowerCase().includes(search);

    return categoryOK && searchOK;
  });

  filtered.forEach(product => {

    container.innerHTML += `
      <article class="product">

        <div class="product-image">
          DIVA
        </div>

        <h3>${product.name}</h3>

        <p class="category">
          ${product.category}
        </p>

        <p class="price">
          ${formatPrice(product.price)} FCFA
        </p>

        <button onclick="addToCart(${product.id})">
          Ajouter au panier
        </button>

      </article>
    `;
  });
}

function filterCategory(category) {

  selectedCategory = category;

  displayProducts();
}

function addToCart(id) {

  const product = products.find(p => p.id === id);

  cart.push(product);

  updateCart();

  alert("Produit ajouté au panier !");
}

function updateCart() {

  document.getElementById("cartCount").textContent =
    cart.length;

  const container =
    document.getElementById("cartItems");

  container.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {

    total += product.price;

    container.innerHTML += `
      <div class="cart-product">

        <strong>${product.name}</strong>

        <p>
          ${formatPrice(product.price)} FCFA
        </p>

        <button onclick="removeFromCart(${index})">
          Supprimer
        </button>

      </div>
    `;
  });

  document.getElementById("cartTotal").textContent =
    formatPrice(total);
}

function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}

function openCart() {

  document.getElementById("cartModal").style.display =
    "block";
}

function closeCart() {

  document.getElementById("cartModal").style.display =
    "none";
}

function sendOrder() {

  if (cart.length === 0) {

    alert("Votre panier est vide.");

    return;
  }

  let message =
    "Bonjour COSMÉTIQUES & TECHNOLOGIES DIVA.%0A%0A";

  message += "Je souhaite commander :%0A";

  let total = 0;

  cart.forEach(product => {

    message +=
      "- " +
      product.name +
      " : " +
      formatPrice(product.price) +
      " FCFA%0A";

    total += product.price;
  });

  message +=
    "%0ATotal : " +
    formatPrice(total) +
    " FCFA";

  const whatsapp =
    "https://wa.me/2250707307811?text=" +
    message;

  window.open(whatsapp, "_blank");
}

displayProducts();
