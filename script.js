document.addEventListener("DOMContentLoaded", () => {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const productCards = document.getElementById("product-cards");
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "product-card";
                card.innerHTML = `
                    <img src="uploads/${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>
                    <p>Price: $${product.price}</p>
                    <p>Location: ${product.location}</p>
                    <p>Owner: ${product.owner}</p>
                `;
                productCards.appendChild(card);
            });
        });
});
