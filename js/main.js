// js/main.js

document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      mainNav.classList.toggle("active");
      this.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!mainNav?.contains(e.target) && !mobileToggle?.contains(e.target)) {
      mainNav?.classList.remove("active");
      mobileToggle?.classList.remove("active");
    }
  });

  // Back to Top Button
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Announcement Bar Carousel
  const announcementItems = document.querySelectorAll(".announcement-item");
  let currentAnnouncement = 0;

  if (announcementItems.length > 0) {
    setInterval(() => {
      announcementItems[currentAnnouncement].classList.remove("active");
      currentAnnouncement =
        (currentAnnouncement + 1) % announcementItems.length;
      announcementItems[currentAnnouncement].classList.add("active");
    }, 3000);
  }

  // Countdown Timer
  function updateCountdown() {
    const daysSpan = document.querySelector(".days");
    const hoursSpan = document.querySelector(".hours");
    const minutesSpan = document.querySelector(".minutes");
    const secondsSpan = document.querySelector(".seconds");

    if (daysSpan && hoursSpan && minutesSpan && secondsSpan) {
      // Set countdown to 2 days from now
      const countdownDate = new Date();
      countdownDate.setDate(countdownDate.getDate() + 2);
      countdownDate.setHours(23, 59, 59);

      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysSpan.textContent = days.toString().padStart(2, "0");
      hoursSpan.textContent = hours.toString().padStart(2, "0");
      minutesSpan.textContent = minutes.toString().padStart(2, "0");
      secondsSpan.textContent = seconds.toString().padStart(2, "0");
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Product Quick View
  const quickViewBtns = document.querySelectorAll(".action-btn .fa-eye");

  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      // Implement quick view modal here
      console.log("Quick view clicked");
    });
  });

  // Add to Cart
  const addToCartBtns = document.querySelectorAll(
    ".action-btn .fa-shopping-cart"
  );

  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const cartCount = document.querySelector(".cart-count");
      if (cartCount) {
        const currentCount = parseInt(cartCount.textContent);
        cartCount.textContent = currentCount + 1;

        // Animation
        cartCount.style.transform = "scale(1.3)";
        setTimeout(() => {
          cartCount.style.transform = "scale(1)";
        }, 200);
      }
    });
  });

  // Wishlist
  const wishlistBtns = document.querySelectorAll(
    ".action-btn .fa-heart, .action-btn .far.fa-heart"
  );

  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      this.classList.toggle("far");
      this.classList.toggle("fas");

      if (this.classList.contains("fas")) {
        this.style.color = "var(--accent-color)";
      } else {
        this.style.color = "";
      }
    });
  });

  // Product Image Gallery (for product pages)
  const productThumbnails = document.querySelectorAll(".thumbnail-image");
  const mainImage = document.querySelector(".main-product-image");

  productThumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const imageUrl = this.dataset.image || this.src;
      if (mainImage) {
        mainImage.src = imageUrl;

        // Remove active class from all thumbnails
        productThumbnails.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked thumbnail
        this.classList.add("active");
      }
    });
  });

  // Quantity Selector
  const quantityInput = document.querySelector(".quantity-input");
  const decreaseBtn = document.querySelector(".decrease-qty");
  const increaseBtn = document.querySelector(".increase-qty");

  if (decreaseBtn && increaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        quantityInput.value = value - 1;
      }
    });

    increaseBtn.addEventListener("click", function () {
      let value = parseInt(quantityInput.value);
      quantityInput.value = value + 1;
    });
  }

  // Pincode Checker
  const checkPincodeBtn = document.querySelector(".check-pincode");
  const pincodeInput = document.querySelector(".pincode-input");

  if (checkPincodeBtn && pincodeInput) {
    checkPincodeBtn.addEventListener("click", function () {
      const pincode = pincodeInput.value.trim();

      if (pincode.length === 6 && /^\d+$/.test(pincode)) {
        // Simulate pincode check
        const deliveryMessage = document.querySelector(".delivery-message");
        if (deliveryMessage) {
          deliveryMessage.innerHTML =
            "✅ Available! Delivery in 3-5 business days";
          deliveryMessage.style.color = "var(--success-color)";
        }
      } else {
        alert("Please enter a valid 6-digit pincode");
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#") {
        e.preventDefault();

        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Lazy loading images
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Form validation
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");

          // Add error message
          const errorMsg = document.createElement("span");
          errorMsg.className = "error-message";
          errorMsg.textContent = "This field is required";

          if (!field.nextElementSibling?.classList.contains("error-message")) {
            field.insertAdjacentElement("afterend", errorMsg);
          }
        } else {
          field.classList.remove("error");
          const nextEl = field.nextElementSibling;
          if (nextEl?.classList.contains("error-message")) {
            nextEl.remove();
          }
        }
      });

      if (isValid) {
        // Submit form (simulated)
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.textContent = "Processing...";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;

          // Show success message
          const successMsg = document.createElement("div");
          successMsg.className = "success-message";
          successMsg.textContent = "Form submitted successfully!";

          form.insertAdjacentElement("beforebegin", successMsg);

          setTimeout(() => {
            successMsg.remove();
          }, 3000);

          form.reset();
        }, 1500);
      }
    });
  });
});
