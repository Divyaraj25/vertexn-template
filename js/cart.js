// js/cart.js

document.addEventListener("DOMContentLoaded", function () {
  // Cart quantity update
  const cartDecreaseBtns = document.querySelectorAll(".cart-decrease");
  const cartIncreaseBtns = document.querySelectorAll(".cart-increase");
  const cartQuantities = document.querySelectorAll(".cart-quantity");
  const cartItemTotals = document.querySelectorAll(".cart-item-total");
  const cartItemPrices = document.querySelectorAll(".cart-item-price");
  const subtotalEl = document.querySelector(".summary-row span:last-child");
  const totalEl = document.querySelector(".summary-row.total span:last-child");
  const discountEl = document.querySelector(
    ".summary-row.discount span:last-child"
  );
  const freeShippingProgress = document.querySelector(".progress");
  const freeShippingText = document.querySelector(".free-shipping-progress p");

  // Update cart totals
  function updateCartTotals() {
    let subtotal = 0;
    const shipping = 99; // Fixed shipping
    let discount = 0;

    cartItemTotals.forEach((total, index) => {
      const price = parseFloat(
        cartItemPrices[index].textContent.replace("₹", "").replace(",", "")
      );
      const qty = parseInt(cartQuantities[index].value);
      const itemTotal = price * qty;
      total.textContent = "₹" + itemTotal.toLocaleString("en-IN");
      subtotal += itemTotal;
    });

    // Apply discount if coupon applied
    const discountRow = document.querySelector(".summary-row.discount");
    if (discountRow && discountRow.style.display !== "none") {
      discount = Math.round(subtotal * 0.1); // 10% discount
      discountEl.textContent = "-₹" + discount.toLocaleString("en-IN");
    }

    const total = subtotal + shipping - discount;

    // Update summary
    if (subtotalEl)
      subtotalEl.textContent = "₹" + subtotal.toLocaleString("en-IN");
    if (totalEl) totalEl.textContent = "₹" + total.toLocaleString("en-IN");

    // Update free shipping progress
    if (freeShippingProgress && freeShippingText) {
      const freeShippingThreshold = 499;
      if (subtotal >= freeShippingThreshold) {
        freeShippingProgress.style.width = "100%";
        freeShippingText.innerHTML =
          "<strong>Congratulations! You get FREE Shipping!</strong>";
      } else {
        const remaining = freeShippingThreshold - subtotal;
        const progress = (subtotal / freeShippingThreshold) * 100;
        freeShippingProgress.style.width = progress + "%";
        freeShippingText.innerHTML = `Add ₹${remaining} more to get <strong>FREE Shipping</strong>!`;
      }
    }
  }

  // Quantity decrease
  cartDecreaseBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let value = parseInt(cartQuantities[index].value);
      if (value > 1) {
        cartQuantities[index].value = value - 1;
        updateCartTotals();
      }
    });
  });

  // Quantity increase
  cartIncreaseBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      let value = parseInt(cartQuantities[index].value);
      cartQuantities[index].value = value + 1;
      updateCartTotals();
    });
  });

  // Remove item
  const removeBtns = document.querySelectorAll(".remove-item");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const cartItem = this.closest(".cart-item");
      cartItem.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        cartItem.remove();
        updateCartTotals();

        // Check if cart is empty
        const cartItems = document.querySelectorAll(".cart-item");
        if (cartItems.length === 0) {
          document.querySelector(".cart-items").innerHTML =
            '<div class="empty-cart"><i class="fas fa-shopping-cart"></i><h3>Your cart is empty</h3><a href="category.html" class="btn btn-primary">Shop Now</a></div>';
        }
      }, 300);
    });
  });

  // Apply coupon
  const applyCoupon = document.querySelector(".apply-coupon");
  const couponInput = document.querySelector(".coupon-input");

  if (applyCoupon) {
    applyCoupon.addEventListener("click", function () {
      const code = couponInput.value.trim().toUpperCase();
      const validCoupons = ["PREPAID10", "FIRST5", "VERTEXN20"];

      if (validCoupons.includes(code)) {
        const discountRow = document.querySelector(".summary-row.discount");
        const couponMsg = document.querySelector(".coupon-code p");

        if (discountRow) {
          discountRow.style.display = "flex";
          if (couponMsg) {
            couponMsg.innerHTML = `<i class="fas fa-tag"></i> Coupon "${code}" applied successfully!`;
            couponMsg.style.color = "var(--success-color)";
          }
        }
        updateCartTotals();
        couponInput.value = "";
      } else {
        alert("Invalid coupon code");
      }
    });
  }

  // Proceed to checkout
  const checkoutBtn = document.querySelector(".proceed-checkout");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      window.location.href = "checkout.html";
    });
  }

  // Initialize
  updateCartTotals();
});
