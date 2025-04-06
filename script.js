document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const searchBar = document.getElementById("searchBar");
  const categoryFilter = document.getElementById("categoryFilter");

  fetch("products.json")
    .then(response => response.json())
    .then(products => {
      function displayProducts(filtered) {
        productList.innerHTML = "";

        filtered.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";

          // Path to image should match location of uploads folder relative to index.html
          card.innerHTML = `
            <img src="uploads/${product.image}" alt="Product Image" onerror="this.src='fallback.jpg'" />
            <h2>${product.name}</h2>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p><strong>Owner:</strong> ${product.owner}</p>
            <p><strong>Location:</strong> ${product.location}</p>
            <p><strong>Phone:</strong> <a href="tel:${product.phone}" style="color:#ffcc00">${product.phone}</a></p>
          `;

          productList.appendChild(card);
        });
      }

      function applyFilters() {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        const filtered = products.filter(product => {
          const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory.toLowerCase();
          const matchesSearch = product.name.toLowerCase().includes(searchTerm);
          return matchesCategory && matchesSearch;
        });

        displayProducts(filtered);
      }

      // Initial display and event listeners
      displayProducts(products);
      searchBar.addEventListener("input", applyFilters);
      categoryFilter.addEventListener("change", applyFilters);
    })
    .catch(err => {
      productList.innerHTML = "<p style='color: red;'>Error loading products.</p>";
      console.error(err);
    });
});

