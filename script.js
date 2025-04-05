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
