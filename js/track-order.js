// js/track-order.js

document.addEventListener("DOMContentLoaded", function () {
  const trackForm = document.getElementById("trackForm");
  const trackResult = document.getElementById("trackResult");
  const trackResult2 = document.getElementById("trackResult2");

  if (trackForm) {
    trackForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const orderId = document.getElementById("orderId").value;
      const email = document.getElementById("email").value;

      // Simulate API call
      if (orderId && email) {
        // Hide both results first
        if (trackResult) trackResult.style.display = "none";
        if (trackResult2) trackResult2.style.display = "none";

        // Show appropriate result based on order ID
        if (orderId.toLowerCase().includes("12345")) {
          if (trackResult) {
            trackResult.style.display = "block";
            // Smooth scroll to result
            trackResult.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else if (orderId.toLowerCase().includes("67890")) {
          if (trackResult2) {
            trackResult2.style.display = "block";
            trackResult2.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        } else {
          // Show demo result for any other ID
          if (trackResult) {
            trackResult.style.display = "block";
            trackResult.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      } else {
        alert("Please enter both Order ID and Email");
      }
    });
  }

  // SMS Tracking Form
  const smsForm = document.querySelector(".sms-track-form");
  if (smsForm) {
    smsForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const orderId = this.querySelector(
        'input[placeholder="Enter Order ID"]'
      ).value;
      const phone = this.querySelector(
        'input[placeholder="Phone Number"]'
      ).value;

      if (orderId && phone && phone.length === 10) {
        alert(`SMS updates will be sent to ${phone} for order ${orderId}`);
      } else {
        alert("Please enter valid Order ID and 10-digit phone number");
      }
    });
  }

  // Print functionality
  const printBtn = document.querySelector(
    ".order-actions .btn-outline:first-child"
  );
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  // Copy tracking number
  const trackingNumbers = document.querySelectorAll(
    ".timeline-step .step-content span"
  );
  trackingNumbers.forEach((element) => {
    const text = element.textContent;
    if (text.includes("Tracking:")) {
      const trackingDiv = document.createElement("div");
      trackingDiv.className = "tracking-copy";
      trackingDiv.innerHTML = `
                <span class="tracking-number">${text}</span>
                <button class="copy-track-btn"><i class="far fa-copy"></i></button>
            `;
      element.innerHTML = "";
      element.appendChild(trackingDiv);

      const copyBtn = trackingDiv.querySelector(".copy-track-btn");
      copyBtn.addEventListener("click", function () {
        const trackNum = trackingDiv
          .querySelector(".tracking-number")
          .textContent.replace("Tracking: ", "");
        navigator.clipboard.writeText(trackNum).then(() => {
          alert("Tracking number copied to clipboard!");
        });
      });
    }
  });
});
