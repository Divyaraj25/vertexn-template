// js/wishlist.js

document.addEventListener("DOMContentLoaded", function () {
  // Remove from wishlist
  const removeBtns = document.querySelectorAll(".remove-from-wishlist");
  const wishlistItems = document.querySelectorAll(".wishlist-item");
  const wishlistCount = document.querySelector(".wishlist-count span");

  removeBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const item = this.closest(".wishlist-item");
      item.style.animation = "slideOut 0.3s ease";

      setTimeout(() => {
        item.remove();
        updateWishlistCount();

        // Check if wishlist is empty
        const remainingItems = document.querySelectorAll(".wishlist-item");
        if (remainingItems.length === 0) {
          document.querySelector(".wishlist-grid").innerHTML = `
                        <div class="empty-wishlist">
                            <i class="far fa-heart"></i>
                            <h3>Your wishlist is empty</h3>
                            <p>Save your favorite items here and shop them later!</p>
                            <a href="category.html" class="btn btn-primary">Shop Now</a>
                        </div>
                    `;
        }
      }, 300);
    });
  });

  function updateWishlistCount() {
    const remainingItems = document.querySelectorAll(".wishlist-item").length;
    if (wishlistCount) {
      wishlistCount.textContent = remainingItems;
    }
  }

  // Add all to cart
  const addAllBtn = document.querySelector(
    ".wishlist-actions .btn-outline:last-child"
  );
  if (addAllBtn) {
    addAllBtn.addEventListener("click", function () {
      const cartCount = document.querySelector(".cart-count");
      const currentCount = parseInt(cartCount.textContent);
      const wishlistItems = document.querySelectorAll(".wishlist-item").length;

      cartCount.textContent = currentCount + wishlistItems;

      // Animation
      cartCount.style.transform = "scale(1.3)";
      setTimeout(() => {
        cartCount.style.transform = "scale(1)";
      }, 200);

      alert(`${wishlistItems} items added to cart!`);
    });
  }

  // Share wishlist
  const shareBtn = document.querySelector(
    ".wishlist-actions .btn-outline:first-child"
  );
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      // Create shareable link (demo)
      const dummyLink = "https://vertexn.com/wishlist/abc123";

      // Copy to clipboard
      navigator.clipboard.writeText(dummyLink).then(() => {
        alert("Wishlist link copied to clipboard!");
      });
    });
  }

  // Social share buttons
  const shareButtons = document.querySelectorAll(".share-btn");
  shareButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const platform = this.classList[1];
      alert(`Sharing to ${platform} - This would open share dialog`);
    });
  });
});
