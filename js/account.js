// js/account.js

document.addEventListener("DOMContentLoaded", function () {
  // Tab switching
  const menuLinks = document.querySelectorAll(".account-menu a[data-tab]");
  const tabs = document.querySelectorAll(".account-tab");

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.dataset.tab;

      // Update active states
      menuLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");

      tabs.forEach((tab) => tab.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });

  // Order accordion
  const orderHeaders = document.querySelectorAll(".order-card-header");

  orderHeaders.forEach((header) => {
    header.addEventListener("click", function () {
      const body = this.nextElementSibling;
      const icon = this.querySelector(".fa-chevron-down");

      if (body.style.display === "none") {
        body.style.display = "block";
        icon.style.transform = "rotate(180deg)";
      } else {
        body.style.display = "none";
        icon.style.transform = "rotate(0deg)";
      }
    });
  });

  // Address actions
  const editAddressBtns = document.querySelectorAll(".edit-address");
  const deleteAddressBtns = document.querySelectorAll(".delete-address");
  const setDefaultBtns = document.querySelectorAll(".set-default");
  const addAddressBtn = document.querySelector(".add-address-btn");

  editAddressBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      alert("Edit address form would open here");
    });
  });

  deleteAddressBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (confirm("Are you sure you want to delete this address?")) {
        const addressCard = this.closest(".address-card");
        addressCard.style.animation = "slideOut 0.3s ease";
        setTimeout(() => {
          addressCard.remove();
        }, 300);
      }
    });
  });

  setDefaultBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const addressCards = document.querySelectorAll(".address-card");
      addressCards.forEach((card) => {
        card.classList.remove("default");
        const badge = card.querySelector(".address-badge");
        if (badge) badge.remove();
      });

      const currentCard = this.closest(".address-card");
      currentCard.classList.add("default");

      const badge = document.createElement("span");
      badge.className = "address-badge";
      badge.textContent = "Default";
      currentCard.insertBefore(badge, currentCard.firstChild);
    });
  });

  if (addAddressBtn) {
    addAddressBtn.addEventListener("click", function () {
      alert("Add new address form would open here");
    });
  }

  // Profile form
  const profileForm = document.querySelector(".profile-form");
  if (profileForm) {
    profileForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.innerHTML =
          '<i class="fas fa-check-circle"></i> Profile updated successfully!';

        this.insertAdjacentElement("beforebegin", successMsg);

        setTimeout(() => {
          successMsg.remove();
        }, 3000);
      }, 1500);
    });
  }

  // Settings form
  const settingsForm = document.querySelector(
    ".settings-section + .profile-actions button"
  );
  if (settingsForm) {
    settingsForm.addEventListener("click", function () {
      alert("Preferences saved successfully!");
    });
  }
});
