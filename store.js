if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  const removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (let i = 0; i < removeCartItemButtons.length; i++) {
    let button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  const quantityInput = document.getElementsByClassName("cart-quantity-input");
  for (let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener("change", quantityChanged);
  }

  const addToCartButtons = document.getElementsByClassName("shop-item-button");
  for (let i = 0; i < addToCartButtons.length; i++) {
    let button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function addToCartClicked(event) {
  let button = event.target;
  const shopItems = button.parentElement.parentElement;
  const title =
    shopItems.getElementsByClassName("shop-item-title")[0].innerText;
  const imgSrc = shopItems.getElementsByClassName("shop-item-image")[0].src;
  const price =
    shopItems.getElementsByClassName("shop-item-price")[0].innerText;
  addItemToCart(title, imgSrc, price);
  updateCartTotal();
}

function addItemToCart(title, imgSrc, price) {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  const cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert(
        `You already have ${title} in your cart, Increase Quantity Instead`
      );
      return;
    }
  }
  let cartRowContent = `
                <div class="cart-item cart-column">
                <img
                  class="cart-item-image"
                  src="${imgSrc}"
                  alt=""
                  width="100"
                  height="100"
                />
                <span class="cart-item-title">${title}</span>
              </div>
              <span class="cart-price cart-column">${price}</span>
              <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1" />
                <button class="btn btn-danger" type="button">REMOVE</button>
              </div>
  `;
  cartRow.innerHTML = cartRowContent;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function removeCartItem(event) {
  let button = event.target;
  button.parentElement.parentElement.remove();
  updateCartTotal();
}

function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-items")[0];
  const cartRows = cartItems.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    const priceElement = cartRow.getElementsByClassName("cart-price")[0];
    let price = parseFloat(priceElement.innerText.replace("$", ""));
    const quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total;
}
