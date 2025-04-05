document.getElementById("upload-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {};
    formData.forEach((value, key) => {
        newProduct[key] = value;
    });
    // Append to `products.json` and upload image (requires backend logic)
    alert("Feature requires a local server setup!");
});
