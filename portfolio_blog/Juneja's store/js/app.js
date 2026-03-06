let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(product, price) {
  cart.push({ product, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
}

function displayCart() {
  let cartItems = document.getElementById("cart-items");
  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.product} - ₹${item.price} <button onclick="removeItem(${index})">Remove</button></li>`;
  });

  document.getElementById("cart-total").textContent = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  alert("Thank you for shopping at Juneja's Store! Your order will be delivered soon.");
  cart = [];
  localStorage.removeItem("cart");
  displayCart();
}

// Run cart display if on cart.html
if (document.getElementById("cart-items")) {
  displayCart();
}
