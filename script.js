let checkbox = document.getElementById("checkbox");
function applyMode() {
  document.body.classList.toggle("darkMode", checkbox.checked);
}
document.addEventListener("DOMContentLoaded", applyMode);
checkbox.addEventListener("change", applyMode);


let jerseys = [
  { name: "Jersey GSW", image: "curryPDP.webp", description: "Maillot de Stephen Curry.", link: "produit.html", price: 300 },
  { name: "Travisscot x Barcelona", image: "traviss.PNG", description: "Maillot Barcelona collab Travis Scott.", link: "travis.html", price: 149,
  oldPrice:199,
  rating:4.5
   },
  { name: "Jersey SanTos", image: "neymar.webp", description: "Maillot Neymar JR en Santos.", link: "neymar.html", price: 199 },
  { name: "Jersey Grizzlies", image: "ja morant.webp", description: "Maillot Ja Morant.", link: "morant.html", price: 250 },
  { name: "Jersey Palestine", image: "p.webp", description: "Maillot de la Palestine.", link: "palestine.html", price: 100,
  oldPrice:250,
  rating:5
   },
  { name: "Jersey LAL", image: "lebron-james.webp", description: "Maillot de LeBron James.", link: "lebron.html", price: 300,

   },
];

let sneakers = [
  { name: "Nike Air Jordan", image: "dior.webp", description: "Sneakers Jordan édition limitée.", link: "jordan.html", price: 220 ,
  oldPrice:380,
  rating:4.7
  },
  { name: "Adidas Yeezy", image: "yeezy.webp", description: "Sneakers Yeezy confortables.", link: "yeezy.html", price: 150,
  oldPrice:200,
  rating:3.5
   },
  { name: "Puma", image: "puma1.webp", description: "Sneakers Puma X Neymar.", link: "puma.html", price: 250 ,
  oldPrice:350,
  rating:4.5
  },
  { name: "Lamelo Ball", image: "lamelo4.webp", description: "Sneakers Puma X Lamelo Ball.", link: "lamelo.html", price: 250 ,
  oldPrice:350,
  rating:4.5
  },
];

function renderProducts(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = list.map(p => `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src="${p.image}" alt="${p.name}" class="card-img">
          <div class="card-info">
            <h2 class="card-title">${p.name}</h2>
            <div class="card-price">
              <span class="new-price">$${p.price}</span>
              ${p.oldPrice ? `<span class="old-price">$${p.oldPrice}</span>` : ""}
            </div>
            <div class="rating">★★★★★ <span class="rate-val">${p.rating || "5.0"}</span></div>
          </div>
        </div>
        <div class="card-back">
          <p>${p.description}</p>
          <div class="btn-group">
            <button class="btn add-cart" data-name="${p.name}" data-price="${p.price}">🛒 Ajouter</button>
            <a href="${p.link}" class="btn">🔎 Voir plus</a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}



renderProducts(jerseys, "jerseyWrapper");
renderProducts(sneakers, "sneakersWrapper");


let cartSidebar = document.getElementById("cartSidebar");
let cartItems = document.getElementById("cartItems");
let totalDisplay = document.getElementById("total");
let closeCartBtn = document.querySelector(".closeCart");

let appliedDiscount = 0;


let panierBtns = document.querySelectorAll(".panier");
panierBtns.forEach(btn => {
  btn.addEventListener("click", () => cartSidebar.classList.add("active"));
});

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
    let li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.qty} = ${(item.price * item.qty).toFixed(2)} DT 
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
  let code = document.getElementById("promoCode").value.trim().toUpperCase();
  let promoMessage = document.getElementById("promoMessage");

  if (code === "AL17") {
    appliedDiscount = 20;
    promoMessage.textContent = "✅ Code promo appliqué (-20%)";
    promoMessage.style.color = "green";
  } else if(code==="VIP") {
    appliedDiscount = 80;
    promoMessage.textContent = "✅ Code promo appliqué (-80%)";
    promoMessage.style.color = "gold";
  } else {
    appliedDiscount = 0;
    promoMessage.textContent = "❌ Code promo invalide";
    promoMessage.style.color = "red";
  }
  loadCart();
});

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".hamburger").classList.toggle("active");
}
function initAddToCartButtons() {
  document.querySelectorAll(".add-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      let name = btn.dataset.name;
      let price = parseFloat(btn.dataset.price);
      addToCart(name, price, 1);   
      cartSidebar.classList.add("active"); 
    });
  });
}


renderProducts(jerseys, "jerseyWrapper");
renderProducts(sneakers, "sneakersWrapper");
initAddToCartButtons();
