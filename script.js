// script.js
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const productList = document.getElementById('productList');
    const searchBar = document.getElementById('searchBar');
    const categoryFilter = document.getElementById('categoryFilter');

    const renderProducts = (data) => {
      productList.innerHTML = '';
      data.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="uploads/${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>${product.category} - $${product.price}</p>
          <p>By ${product.owner} | ${product.phone}</p>
          <p>${product.location}</p>
        `;
        productList.appendChild(div);
      });
    };

    const filterProducts = () => {
      const search = searchBar.value.toLowerCase();
      const category = categoryFilter.value;
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search) &&
        (category === '' || p.category === category)
      );
      renderProducts(filtered);
    };

    searchBar.addEventListener('input', filterProducts);
    categoryFilter.addEventListener('change', filterProducts);

    renderProducts(products);
  });

// upload.js
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  alert("In Netlify-hosted version, image saving and JSON editing require serverless functions or external service.");
});

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  const preview = document.getElementById('preview');
  const file = e.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const searchBar = document.getElementById("searchBar");
  const categoryFilter = document.getElementById("categoryFilter");

  fetch("products.json")
    .then(response => response.json())
    .then(products => {
      let allProducts = products;

      function displayProducts(filtered) {
        productList.innerHTML = "";

        filtered.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";

          card.innerHTML = `
            <img src="uploads/${product.image}" alt="Product Image" />
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

        const filtered = allProducts.filter(product => {
          const matchesCategory = !selectedCategory || product.category.toLowerCase() === selectedCategory.toLowerCase();
          const matchesSearch = product.name.toLowerCase().includes(searchTerm);
          return matchesCategory && matchesSearch;
        });

        displayProducts(filtered);
      }

      searchBar.addEventListener("input", applyFilters);
      categoryFilter.addEventListener("change", applyFilters);

      displayProducts(allProducts);
    })
    .catch(err => {
      productList.innerHTML = "<p style='color: red;'>Error loading products.</p>";
      console.error(err);
    });
});
