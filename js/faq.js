// js/faq.js

document.addEventListener("DOMContentLoaded", function () {
  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      // Close other open items
      const isOpen = item.classList.contains("active");

      if (!isOpen) {
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });
      }

      item.classList.toggle("active");
    });
  });

  // FAQ Search
  const searchInput = document.getElementById("faqSearch");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const searchTerm = this.value.toLowerCase().trim();
      const faqItems = document.querySelectorAll(".faq-item");
      const categoryGroups = document.querySelectorAll(".faq-category-group");

      if (searchTerm.length < 2) {
        // Reset all
        faqItems.forEach((item) => {
          item.style.display = "block";
        });
        categoryGroups.forEach((group) => {
          group.style.display = "block";
        });
        return;
      }

      // Search in questions and answers
      faqItems.forEach((item) => {
        const question = item
          .querySelector(".faq-question h4")
          .textContent.toLowerCase();
        const answer = item
          .querySelector(".faq-answer")
          .textContent.toLowerCase();

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Hide empty categories
      categoryGroups.forEach((group) => {
        const visibleItems = group.querySelectorAll(
          '.faq-item[style="display: block"]'
        );
        if (visibleItems.length === 0) {
          group.style.display = "none";
        } else {
          group.style.display = "block";
        }
      });
    });
  }

  // Category Filter
  const categoryBtns = document.querySelectorAll(".faq-category");
  const categoryGroups = document.querySelectorAll(".faq-category-group");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Update active button
      categoryBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.dataset.category;

      if (category === "all") {
        categoryGroups.forEach((group) => {
          group.style.display = "block";
        });
      } else {
        categoryGroups.forEach((group) => {
          if (group.dataset.category === category) {
            group.style.display = "block";
          } else {
            group.style.display = "none";
          }
        });
      }
    });
  });

  // Expand first FAQ item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add("active");
  }
});
