
let checkbox = document.getElementById("checkbox");
function applyMode() {
  document.body.classList.toggle("darkMode", checkbox.checked);
}
document.addEventListener("DOMContentLoaded", applyMode);
checkbox.addEventListener("change", applyMode);


let jerseys = [
  { name: "Jersey GSW", image: "curryPDP.webp", description: "Maillot de Stephen Curry.", link: "produit.html", price: 300 },
  { name: "Travisscot x Barcelona", image: "traviss.PNG", description: "Maillot Barcelona collab Travis Scott.", link: "travis.html", price: 149 },
  { name: "Jersey SanTos", image: "neymar.webp", description: "Maillot Neymar JR en Santos.", link: "neymar.html", price: 199 },
  { name: "Jersey Grizzlies", image: "ja morant.webp", description: "Maillot Ja Morant.", link: "morant.html", price: 250 },
  { name: "Jersey Palestine", image: "p.webp", description: "Maillot de la Palestine.", link: "palestine.html", price: 100 },
  { name: "Jersey LAL", image: "lebron-james.webp", description: "Maillot de LeBron James.", link: "lebron.html", price: 300 },
];

// Sneakers
let sneakers = [
  { name: "Nike Air Jordan", image: "dior.webp", description: "Sneakers Jordan édition limitée.", link: "jordan.html", price: 220 },
  { name: "Adidas Yeezy", image: "yeezy.webp", description: "Sneakers Yeezy confortables.", link: "yeezy.html", price: 150 },
  { name: "Puma ", image: "puma1.webp", description: "Sneakers Puma X Neymar.", link: "puma.html", price: 250 },
  { name: "lamelo Ball ", image: "lamelo4.webp", description: "Sneakers Puma X Lamelo Ball.", link: "lamelo.html", price: 250 },

];


function renderProducts(list, wrapperId) {
  const wrapper = document.getElementById(wrapperId);
  wrapper.innerHTML = list.map(p => `
    <div class="card">
      <div class="front-page">
        <img src="${p.image}" alt="${p.name}" class="card-img">
        <div class="card-info"><h2 class="card-title">${p.name}</h2></div>
      </div>
      <div class="back-page">
        <div class="card-content">
          <h3>${p.name}</h3>
          <p class="card-desc">${p.description}</p>
          <button class="btn add-cart" data-name="${p.name}" data-price="${p.price}">Ajouter au panier</button>
          <a href="${p.link}"><button class="btn">Voir plus</button></a>
        </div>
      </div>
    </div>
  `).join("");

  
  wrapper.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(btn.dataset.name, parseFloat(btn.dataset.price), 1));
  });
}


renderProducts(jerseys, "jerseyWrapper");
renderProducts(sneakers, "sneakersWrapper");


const panierBtn = document.querySelector(".panier");
const cartSidebar = document.getElementById("cartSidebar");
const cartItems = document.getElementById("cartItems");
const totalDisplay = document.getElementById("total");
const closeCartBtn = document.querySelector(".closeCart");

let appliedDiscount = 0; 

panierBtn.addEventListener("click", () => cartSidebar.classList.toggle("active"));
closeCartBtn.addEventListener("click", () => cartSidebar.classList.remove("active"));

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function loadCart() {
  let cart = getCart();
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(function(item)  {
    total += item.price * item.qty;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} = ${(item.price * item.qty).toFixed(2)} € 
      <button class="close-btn">❌</button>`;
    li.querySelector(".close-btn").addEventListener("click", function()  {
      saveCart(cart.filter(i => i.name !== item.name));
      loadCart();
    });
    cartItems.appendChild(li);
  });

  if (appliedDiscount > 0) total -= (total * appliedDiscount) / 100;
  totalDisplay.textContent = total.toFixed(2);
}
document.addEventListener("DOMContentLoaded", loadCart);

function addToCart(name, price, qty) {
  let cart = getCart();
  let item = cart.find(i => i.name === name);
  item ? item.qty += qty : cart.push({ name, price, qty });
  saveCart(cart);
  loadCart();
}


document.getElementById("applyPromo").addEventListener("click", function()  {
  const code = document.getElementById("promoCode").value.trim().toUpperCase();
  const promoMessage = document.getElementById("promoMessage");

  if (code === "AL17") {
    appliedDiscount = 20;
    promoMessage.textContent = "✅ Code promo appliqué (-20%)";
    promoMessage.style.color = "green";
  } 
  else if(code==="VIP"){
        appliedDiscount = 80;
    promoMessage.textContent = "✅ Code promo appliqué (-80%)";
    promoMessage.style.color = "gold";
  }
  else {
    appliedDiscount = 0;
    promoMessage.textContent = "❌ Code promo invalide";
    promoMessage.style.color = "red";
  }
  loadCart();
});
