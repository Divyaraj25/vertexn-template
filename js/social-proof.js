// js/social-proof.js

// Social Proof Popup
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.querySelector(".social-proof-popup");

  if (popup) {
    // Sample purchase data
    const purchases = [
      {
        name: "Priya",
        city: "Delhi",
        product: "Mini Blender",
        time: "2 minutes ago",
      },
      {
        name: "Rahul",
        city: "Mumbai",
        product: "Oil Dispenser",
        time: "5 minutes ago",
      },
      {
        name: "Amit",
        city: "Ahmedabad",
        product: "Mobile Holder",
        time: "12 minutes ago",
      },
      {
        name: "Sneha",
        city: "Surat",
        product: "Lint Remover",
        time: "15 minutes ago",
      },
      {
        name: "Vikram",
        city: "Pune",
        product: "Gym Bottle",
        time: "22 minutes ago",
      },
      {
        name: "Neha",
        city: "Bangalore",
        product: "USB Fan",
        time: "28 minutes ago",
      },
      {
        name: "Raj",
        city: "Chennai",
        product: "Acupressure Slippers",
        time: "35 minutes ago",
      },
      {
        name: "Kavita",
        city: "Kolkata",
        product: "Storage Rack",
        time: "42 minutes ago",
      },
    ];

    let currentIndex = 0;

    function showPurchase() {
      const purchase = purchases[currentIndex];

      const popupContent = popup.querySelector(".popup-content");
      if (popupContent) {
        popupContent.innerHTML = `
                    <img src="https://via.placeholder.com/40x40/667eea/ffffff?text=${purchase.name[0]}" alt="${purchase.name}">
                    <div>
                        <p><strong>${purchase.name} from ${purchase.city}</strong> bought <span>${purchase.product}</span></p>
                        <p class="time">${purchase.time}</p>
                    </div>
                `;
      }

      popup.classList.add("show");

      setTimeout(() => {
        popup.classList.remove("show");
      }, 4000);

      currentIndex = (currentIndex + 1) % purchases.length;
    }

    // Show first popup after 5 seconds
    setTimeout(() => {
      showPurchase();

      // Show subsequent popups every 8 seconds
      setInterval(showPurchase, 8000);
    }, 5000);
  }
});
