// js/search.js

// Search Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchToggle = document.querySelector(".search-toggle");
  const searchOverlay = document.createElement("div");
  searchOverlay.className = "search-overlay";
  searchOverlay.innerHTML = `
        <div class="search-container">
            <button class="search-close"><i class="fas fa-times"></i></button>
            <div class="search-box">
                <input type="text" placeholder="Search for products... (e.g., blender, holder, rack)" id="search-input">
                <button class="search-submit"><i class="fas fa-search"></i></button>
            </div>
            <div class="search-results">
                <div class="search-suggestions">
                    <h4>Popular Searches</h4>
                    <div class="suggestion-tags">
                        <span class="suggestion-tag">Mini Blender</span>
                        <span class="suggestion-tag">Oil Dispenser</span>
                        <span class="suggestion-tag">Mobile Holder</span>
                        <span class="suggestion-tag">Lint Remover</span>
                        <span class="suggestion-tag">Storage Rack</span>
                        <span class="suggestion-tag">Gym Bottle</span>
                    </div>
                </div>
                <div class="search-products"></div>
            </div>
        </div>
    `;

  document.body.appendChild(searchOverlay);

  const searchInput = document.getElementById("search-input");
  const searchResults = document.querySelector(".search-products");
  const searchSuggestions = document.querySelector(".search-suggestions");

  // Sample product database
  const products = [
    {
      name: "Premium Glass Oil Dispenser (500ml)",
      category: "Kitchen",
      price: "₹399",
      oldPrice: "₹999",
      rating: 4.5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Oil",
    },
    {
      name: "Portable Mini Blender - USB Rechargeable",
      category: "Kitchen",
      price: "₹599",
      oldPrice: "₹999",
      rating: 5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Blender",
    },
    {
      name: "360° Rotating Magnetic Mobile Holder",
      category: "Mobile",
      price: "₹299",
      oldPrice: "₹599",
      rating: 4,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Holder",
    },
    {
      name: "Electric Lint Remover - Rechargeable",
      category: "Home",
      price: "₹449",
      oldPrice: "₹899",
      rating: 5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Lint",
    },
    {
      name: "Stainless Steel Kitchen Rack",
      category: "Kitchen",
      price: "₹799",
      oldPrice: "₹1599",
      rating: 4.5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Rack",
    },
    {
      name: "Vacuum Suction Mobile Holder",
      category: "Mobile",
      price: "₹199",
      oldPrice: "₹399",
      rating: 4,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Suction",
    },
    {
      name: "Acupressure Slippers",
      category: "Health",
      price: "₹349",
      oldPrice: "₹999",
      rating: 4.5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Slippers",
    },
    {
      name: "Gym Shaker Bottle",
      category: "Gym",
      price: "₹249",
      oldPrice: "₹499",
      rating: 4,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Gym",
    },
    {
      name: "Neckband USB Fan",
      category: "Electronics",
      price: "₹399",
      oldPrice: "₹799",
      rating: 4.5,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Fan",
    },
    {
      name: "Bathroom Corner Rack",
      category: "Bathroom",
      price: "₹299",
      oldPrice: "₹599",
      rating: 4,
      image: "https://via.placeholder.com/50x50/f9f9f9/333333?text=Bathroom",
    },
  ];

  if (searchToggle) {
    searchToggle.addEventListener("click", function (e) {
      e.preventDefault();
      searchOverlay.classList.add("active");
      searchInput.focus();
    });
  }

  document
    .querySelector(".search-close")
    .addEventListener("click", function () {
      searchOverlay.classList.remove("active");
      searchInput.value = "";
      searchResults.innerHTML = "";
      searchSuggestions.style.display = "block";
    });

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResults.innerHTML = "";
      searchSuggestions.style.display = "block";
      return;
    }

    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );

    displaySearchResults(filteredProducts);
  });

  function displaySearchResults(results) {
    if (results.length === 0) {
      searchResults.innerHTML =
        '<p class="no-results">No products found. Try different keywords.</p>';
      searchSuggestions.style.display = "none";
      return;
    }

    searchSuggestions.style.display = "none";

    let html = '<div class="results-grid">';

    results.forEach((product) => {
      html += `
                <div class="result-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="result-info">
                        <h4>${product.name}</h4>
                        <p class="result-category">${product.category}</p>
                        <div class="result-price">
                            <span class="current">${product.price}</span>
                            <span class="old">${product.oldPrice}</span>
                        </div>
                        <div class="result-rating">
                            ${getStarRating(product.rating)}
                        </div>
                    </div>
                </div>
            `;
    });

    html += "</div>";
    searchResults.innerHTML = html;
  }

  function getStarRating(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars += '<i class="fas fa-star"></i>';
      } else if (i - 0.5 === rating) {
        stars += '<i class="fas fa-star-half-alt"></i>';
      } else {
        stars += '<i class="far fa-star"></i>';
      }
    }
    return stars;
  }

  // Suggestion tags click
  document.querySelectorAll(".suggestion-tag").forEach((tag) => {
    tag.addEventListener("click", function () {
      searchInput.value = this.textContent;
      searchInput.dispatchEvent(new Event("input"));
    });
  });

  // Close on escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
      searchOverlay.classList.remove("active");
    }
  });
});
