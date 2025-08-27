let images = ["n1.webp", "n2.webp", "n3.webp","n4.webp"];

let current = 0;
let mainImage = document.getElementById("mainImage");

document.getElementById("next").addEventListener("click", function () {
  current = (current + 1) % images.length;
  mainImage.src = images[current];
});

document.getElementById("prev").addEventListener("click", function () {
  current = (current - 1 + images.length) % images.length;
  mainImage.src = images[current];
});
let buttons = document.querySelectorAll(".size-btn");
let selected = document.getElementById("selectedSize");

buttons.forEach((btn) => {
  btn.addEventListener("click", function () {
    buttons.forEach((b) => b.classList.remove("active"));

    btn.classList.add("active");

    selected.textContent = btn.textContent;
  });
});

let qty = 1;
const qtyDisplay = document.getElementById("qty");

function changeQty(val) {
  qty = Math.max(1, qty + val)
  qtyDisplay.textContent = qty;
}

function addToCartFromProduct() {
  const productName = "Jersey NEymar JR"; 
  const price = 199; 
  const qty = parseInt(document.getElementById("qty").textContent);

 
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  let existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name: productName, price: price, qty: qty });
  }


  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${qty} x ${productName} ajouté au panier !`);
}


document.querySelector(".btn").addEventListener("click", addToCartFromProduct);
