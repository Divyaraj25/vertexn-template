// js/contact.js

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = document.getElementById("contact-name").value;
      const email = document.getElementById("contact-email").value;
      const phone = document.getElementById("contact-phone").value;
      const subject = document.getElementById("contact-subject").value;
      const message = document.getElementById("contact-message").value;

      // Validate
      if (!name || !email || !subject || !message) {
        alert("Please fill in all required fields");
        return;
      }

      if (!isValidEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }

      // Show success message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        // Create success message
        const successMsg = document.createElement("div");
        successMsg.className = "success-message";
        successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for contacting us, ${name}. We'll get back to you within 24 hours.</p>
                `;

        contactForm.insertAdjacentElement("beforebegin", successMsg);
        contactForm.reset();

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        // Remove success message after 5 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      }, 1500);
    });
  }

  // Email validation helper
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Phone number formatting
  const phoneInput = document.getElementById("contact-phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 10) value = value.slice(0, 10);
      this.value = value;
    });
  }

  // Live chat button
  const chatBtn = document.querySelector(".help-card .btn-outline");
  if (chatBtn && chatBtn.textContent.includes("Start Chat")) {
    chatBtn.addEventListener("click", function (e) {
      e.preventDefault();
      alert("Live chat would open here. Our support team is available 24/7!");
    });
  }
});
