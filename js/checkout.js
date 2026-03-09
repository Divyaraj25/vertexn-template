// js/checkout.js

document.addEventListener("DOMContentLoaded", function () {
  // Payment method toggle
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  const cardPaymentForm = document.getElementById("card-payment");

  paymentOptions.forEach((option) => {
    option.addEventListener("change", function () {
      if (this.value === "card" || this.id === "card") {
        if (cardPaymentForm) cardPaymentForm.style.display = "block";
      } else {
        if (cardPaymentForm) cardPaymentForm.style.display = "none";
      }
    });
  });

  // Place order
  const placeOrderBtn = document.querySelector(".place-order");

  if (placeOrderBtn) {
    placeOrderBtn.addEventListener("click", function (e) {
      e.preventDefault();

      // Validate form (simplified)
      const requiredFields = document.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add("error");
          isValid = false;

          // Scroll to first error
          if (isValid === false) {
            field.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          field.classList.remove("error");
        }
      });

      if (isValid) {
        // Show processing state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        this.disabled = true;

        // Simulate order processing
        setTimeout(() => {
          // Redirect to success page
          window.location.href = "order-success.html";
        }, 2000);
      } else {
        alert("Please fill in all required fields");
      }
    });
  }

  // Shipping address copy to billing
  const sameAsShipping = document.querySelector(
    'input[type="checkbox"][checked]'
  );
  if (sameAsShipping) {
    sameAsShipping.addEventListener("change", function () {
      // Toggle billing address section if exists
      const billingSection = document.querySelector(".billing-address");
      if (billingSection) {
        billingSection.style.display = this.checked ? "none" : "block";
      }
    });
  }

  // Format card number
  const cardNumber = document.getElementById("card-number");
  if (cardNumber) {
    cardNumber.addEventListener("input", function (e) {
      let value = this.value.replace(/\s/g, "");
      if (value.length > 0) {
        value = value.match(new RegExp(".{1,4}", "g")).join(" ");
        this.value = value;
      }
    });
  }

  // Format expiry date
  const expiry = document.getElementById("expiry");
  if (expiry) {
    expiry.addEventListener("input", function (e) {
      let value = this.value.replace(/\//g, "");
      if (value.length >= 2) {
        value = value.substring(0, 2) + "/" + value.substring(2, 4);
        this.value = value;
      }
    });
  }
});
