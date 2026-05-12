// ===== GLOBAL VARIABLES =====
let root = document.getElementById("root");
let currentPage = 1;
const itemsPerPage = 8;
let editMode = false;
let currentEditId = null;
let cart = [];
let orders = [];

// ===== INITIALIZATION =====
loadHomePage();

// Fetch Footer
fetch("components/footer/footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    });

// Fetch Sidebar
fetch("components/sidebar/sidebar.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("sidebar").innerHTML = data;
    });

// ===== NAVIGATION HELPER =====
// Sidebar highlight-a handle panna orey helper function
function updateSidebarActive(activeId) {
    document.querySelectorAll("#sidebar .nav-link").forEach(btn => {
        btn.classList.remove("active", "text-white");
        btn.classList.add("text-dark");
    });

    let activeBtn = document.getElementById(activeId);
    if (activeBtn) {
        activeBtn.classList.remove("text-dark");
        activeBtn.classList.add("active", "text-white");
    }
}

// ===== PAGE LOADING FUNCTIONS =====

function loadHomePage(event) {
    if (event) event.preventDefault();
    fetch("components/home/home.html")
        .then(response => response.text())
        .then(data => {
            root.innerHTML = data;
            loadProducts();
            updateSidebarActive("nav-dashboard");
        });
}

function loadProductsPage(event) {
    if (event) event.preventDefault();
    fetch("components/products/products.html")
        .then(response => response.text())
        .then(data => {
            root.innerHTML = data;
            window.scrollTo(0, 0);
            currentPage = 1;
            setupAddProductForm();
            renderAdminTable();
            updateSidebarActive("nav-products");
        });
}

function loadOrdersPage(event) {
    if (event) event.preventDefault();
    fetch("components/orders/orders.html")
        .then(response => response.text())
        .then(data => {
            root.innerHTML = data;
            currentPage = 1;
            renderOrdersTable();
            updateSidebarActive("nav-orders");
        });
}

// ===== POS & CART SYSTEM =====

function addToCart(productId) {
    const product = inventory.find(item => item.id === productId);
    if (!product) return;

    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    displayCart();
    calculateTotal();
}

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-muted text-center mt-5">No items in cart</p>';
        return;
    }

    let cartHTML = "";
    cart.forEach((item, index) => {
        cartHTML += `
            <div class="cart-item mb-3 pb-3 border-bottom">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="flex-grow-1">
                        <h6 class="mb-1">${item.name}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} each</small>
                    </div>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">×</button>
                </div>
                <div class="d-flex justify-content-between align-items-center mt-2">
                    <div style="display: flex; align-items: center; gap: 5px;">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">−</button>
                        <input type="text" class="form-control text-center p-1" value="${item.quantity}" readonly style="width: 40px; font-weight: bold;">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
            </div>
        `;
    });
    cartContainer.innerHTML = cartHTML;
}

function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("cart-total").textContent = total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    calculateTotal();
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
    } else {
        displayCart();
        calculateTotal();
    }
}

// ===== INVENTORY DATA & CRUD =====

let inventory = [
    { id: 1, name: "Classic Black Blouse", price: 24.99, size: "M", color: "Black", category: "TOPS", image: "assets/img/1.jpg" },
    { id: 2, name: "Khaki Casual Blazer", price: 45.00, size: "L", color: "Khaki", category: "BLAZERS", image: "assets/img/2.jpg" },
    { id: 3, name: "Beige Button-Down Dress", price: 35.50, size: "S", color: "Beige", category: "DRESSES", image: "assets/img/3.jpg" },
    { id: 4, name: "Light Blue Office Shirt", price: 29.99, size: "M", color: "Blue", category: "SHIRTS", image: "assets/img/4.jpg" },
    { id: 5, name: "Dusty Pink Basic Top", price: 15.99, size: "M", color: "Pink", category: "TOPS", image: "assets/img/5.jpg" },
    { id: 6, name: "Navy Blue Pleated Skirt", price: 32.00, size: "S", color: "Navy", category: "SKIRTS", image: "assets/img/6.jpg" },
    { id: 7, name: "Floral Midi Skirt", price: 28.50, size: "L", color: "Floral", category: "SKIRTS", image: "assets/img/7.jpg" },
    { id: 8, name: "Brown Polo Shirt", price: 19.99, size: "M", color: "Brown", category: "SHIRTS", image: "assets/img/brown.jpg" },
    { id: 9, name: "Essential White T-Shirt", price: 12.99, size: "S", color: "White", category: "TOPS", image: "assets/img/white.jpg" },
    { id: 10, name: "Gold Chain Necklace", price: 18.99, color: "Gold", category: "JEWELLERY", image: "assets/img/necklace.jpg" },
    { id: 11, name: "Silver Bracelet", price: 22.50, color: "Silver", category: "JEWELLERY", image: "assets/img/bracelet.jpg" },
    { id: 12, name: "Classic Digital Watch", price: 45.99, color: "Black", category: "WATCHES", image: "assets/img/watch.jpg" },
    { id: 13, name: "Hair Clip Set", price: 12.99, color: "Multicolor", category: "HAIR ACCESSORIES", image: "assets/img/hair-clip.jpg" },
    { id: 14, name: "Leather Wallet", price: 35.00, color: "Brown", category: "WALLETS", image: "assets/img/wallet.jpg" },
    { id: 15, name: "UV Protection Sunglasses", price: 55.00, color: "Black", category: "SUNGLASSES", image: "assets/img/sunglasses.jpg" },
    { id: 16, name: "Canvas Tote Bag", price: 39.99, color: "Beige", category: "BAGS", image: "assets/img/tote-bag.jpg" },
    { id: 17, name: "Black Crossbody Bag", price: 49.50, color: "Black", category: "BAGS", image: "assets/img/crossbody.jpg" },
    { id: 18, name: "Leather Handbag", price: 75.00, color: "Burgundy", category: "BAGS", image: "assets/img/handbag.jpg" },
    { id: 19, name: "White Sneakers", price: 65.00, size: "M", color: "White", category: "SHOES", image: "assets/img/sneakers.jpg" },
    { id: 20, name: "Black Formal Heels", price: 55.00, size: "S", color: "Black", category: "SHOES", image: "assets/img/heels.jpg" },
    { id: 21, name: "Brown Leather Boots", price: 85.00, size: "M", color: "Brown", category: "SHOES", image: "assets/img/boots.jpg" }
];

function getNextProductId() {
    return inventory.length === 0 ? 1 : Math.max(...inventory.map(item => item.id)) + 1;
}

function addProduct(productData) {
    const newProduct = {
        id: getNextProductId(),
        ...productData,
        price: Number(productData.price),
        category: productData.category.toUpperCase()
    };
    inventory.push(newProduct);
    renderAdminTable();
    renderProducts(inventory);
    alert(`Product added: ${newProduct.name}`);
}

function deleteProduct(productId) {
    if (confirm("Are you sure you want to delete this product? 🗑️")) {
        inventory = inventory.filter(item => item.id !== productId);
        cart = cart.filter(item => item.id !== productId);
        renderAdminTable();
        renderProducts(inventory);
        displayCart();
        calculateTotal();
    }
}

function editProduct(productId) {
    const product = inventory.find(item => item.id === productId);
    if (!product) return;

    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-size").value = product.size || "";
    document.getElementById("product-color").value = product.color || "";

    const previewImg = document.getElementById("image-preview");
    if (previewImg) {
        previewImg.src = product.image;
        previewImg.style.display = "block";
    }

    const submitBtn = document.querySelector("#add-product-form button[type='submit']");
    submitBtn.textContent = "Update Product 🔄";
    submitBtn.className = "btn btn-warning btn-sm w-100 fw-bold mt-2";

    editMode = true;
    currentEditId = productId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupAddProductForm() {
    const form = document.getElementById("add-product-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const imageInput = document.getElementById("product-image");
        const file = imageInput.files[0];

        const processSave = (imageData) => {
            const productData = {
                name: document.getElementById("product-name").value,
                price: document.getElementById("product-price").value,
                category: document.getElementById("product-category").value,
                image: imageData,
                size: document.getElementById("product-size").value,
                color: document.getElementById("product-color").value
            };

            if (editMode) {
                const index = inventory.findIndex(p => p.id === currentEditId);
                if (index !== -1) {
                    inventory[index] = { ...inventory[index], ...productData, price: Number(productData.price) };
                    alert("Product Updated Successfully! ✅");
                }
                editMode = false;
                currentEditId = null;
                const submitBtn = form.querySelector("button[type='submit']");
                submitBtn.textContent = "Add Product";
                submitBtn.className = "btn btn-dark btn-sm w-100 fw-bold mt-2";
            } else {
                addProduct(productData);
            }

            form.reset();
            const previewImg = document.getElementById("image-preview");
            if (previewImg) previewImg.style.display = "none";
            renderAdminTable();
        };

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => processSave(e.target.result);
            reader.readAsDataURL(file);
        } else if (editMode) {
            processSave(inventory.find(p => p.id === currentEditId).image);
        } else {
            alert("Please select an image!");
        }
    });
}

// ===== RENDERING & PAGINATION =====

function loadProducts() {
    renderProducts(inventory);
}

function renderProducts(items) {
    const container = document.getElementById("product-list");
    if (!container) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

    let htmlString = "";
    paginatedItems.forEach(item => {
        htmlString += `
          <div class="col">
            <div class="card shadow-sm border-0 h-100" onclick="addToCart(${item.id})" style="cursor: pointer;"> 
              <img src="${item.image}" class="card-img-top" style="height: 160px; object-fit: cover;">
              <div class="card-body p-2 text-center bg-light">
                <h6 class="card-title mb-0 text-truncate" style="font-size: 14px;">${item.name}</h6>
                <p class="text-success fw-bold mb-0 mt-1">$${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        `;
    });
    container.innerHTML = htmlString || '<p class="text-center w-100 mt-4">No products found.</p>';
    renderPaginationControls(items.length);
}

function renderPaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    let paginationHTML = `
        <div class="d-flex justify-content-center w-100">
            <button class="btn btn-sm btn-outline-dark me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Prev</button>
            <span class="align-self-center mx-3 fw-bold">Page ${currentPage} of ${totalPages}</span>
            <button class="btn btn-sm btn-outline-dark" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next</button>
        </div>
    `;
    const container = document.getElementById("pagination-controls");
    if (container) container.innerHTML = paginationHTML;
}

function changePage(step) {
    currentPage += step;
    loadProducts();
}

function renderAdminTable() {
    const container = document.getElementById("admin-table-container");
    if (!container) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = inventory.slice(startIndex, startIndex + itemsPerPage);

    let tableHTML = `
        <div class="card shadow-sm">
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead class="table-light">
                        <tr>
                            <th>ID</th><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th class="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    paginatedItems.forEach((item) => {
        tableHTML += `
            <tr>
                <td>${item.id}</td>
                <td><img src="${item.image}" style="width: 40px; height: 40px; object-fit: cover;" class="rounded shadow-sm"></td>
                <td class="fw-bold">${item.name}</td>
                <td><span class="badge bg-info text-dark">${item.category}</span></td>
                <td class="text-success fw-bold">$${item.price.toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editProduct(${item.id})">✏️</button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct(${item.id})">🗑️</button>
                </td>
            </tr>
        `;
    });

    tableHTML += `</tbody></table></div></div>`;
    container.innerHTML = tableHTML;
    renderAdminPagination(inventory.length);
}

function renderAdminPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    let paginationHTML = `
        <div class="d-flex justify-content-center align-items-center gap-3">
            <button type="button" class="btn btn-sm btn-outline-dark" ${currentPage === 1 ? 'disabled' : ''} onclick="changeAdminPage(-1)">&laquo; Prev</button>
            <span class="fw-bold">Page ${currentPage} of ${totalPages}</span>
            <button type="button" class="btn btn-sm btn-outline-dark" ${currentPage === totalPages ? 'disabled' : ''} onclick="changeAdminPage(1)">Next &raquo;</button>
        </div>
    `;
    const container = document.getElementById("admin-pagination-controls");
    if (container) container.innerHTML = paginationHTML;
}

function changeAdminPage(step) {
    currentPage += step;
    renderAdminTable();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== PAYMENT & ORDERS HISTORY =====

function processPayment() {
    if (cart.length === 0) {
        alert("Cart empty-ah irukku! Products-a add pannunga. 🛒");
        return;
    }

    let total = document.getElementById("cart-total").textContent;
    const newOrder = {
        id: "#ORD-" + Math.floor(1000 + Math.random() * 9000),
        date: new Date().toLocaleString(),
        items: [...cart],
        total: total
    };
    orders.unshift(newOrder);

    let iframe = document.createElement('iframe');
    iframe.style.position = 'absolute'; iframe.style.width = '0px'; iframe.style.height = '0px'; iframe.style.border = 'none';
    document.body.appendChild(iframe);

    let receiptHTML = `
        <html>
        <head>
            <style>
                @page { size: auto; margin: 0mm; }
                body { font-family: 'Courier New', monospace; width: 80mm; margin: 0 auto; padding: 20px; text-align: center; }
                .header { border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
                .item-row { display: flex; justify-content: space-between; margin: 5px 0; font-size: 14px; }
                .total-row { border-top: 1px dashed #000; margin-top: 10px; padding-top: 10px; font-weight: bold; font-size: 18px; display: flex; justify-content: space-between; }
            </style>
        </head>
        <body>
            <div class="header"><h2>FashionRack 👗</h2><p>Receipt Date: ${newOrder.date}</p></div>
            ${cart.map(item => `<div class="item-row"><span>${item.name} x${item.quantity}</span><span>$${(item.price * item.quantity).toFixed(2)}</span></div>`).join('')}
            <div class="total-row"><span>TOTAL:</span><span>$${total}</span></div>
            <p>Thank you for shopping! ✅</p>
        </body></html>
    `;

    let doc = iframe.contentWindow.document;
    doc.open(); doc.write(receiptHTML); doc.close();

    setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
        clearCart();
    }, 500);
}

function clearCart() {
    cart = [];
    displayCart();
    calculateTotal();
    alert("Payment Successful! Cart cleared. 💸");
}

function renderOrdersTable() {
    const container = document.getElementById("orders-table-container");
    if (!container) return;

    if (orders.length === 0) {
        container.innerHTML = '<div class="p-5 text-center text-muted">No orders found yet.</div>';
        return;
    }

    let tableHTML = `<table class="table table-hover align-middle mb-0"><thead class="table-light"><tr><th>Order ID</th><th>Date</th><th>Total</th><th class="text-center">Action</th></tr></thead><tbody>`;
    orders.forEach(order => {
        tableHTML += `<tr><td class="fw-bold text-primary">${order.id}</td><td>${order.date}</td><td class="fw-bold text-success">$${order.total}</td><td class="text-center"><button class="btn btn-sm btn-outline-dark" onclick="viewOrderDetails('${order.id}')">👁️ View</button></td></tr>`;
    });
    tableHTML += `</tbody></table>`;
    container.innerHTML = tableHTML;
}

function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    let modalHTML = `
        <div class="mb-3 border-bottom pb-2"><strong>Order:</strong> ${order.id}<br><small>${order.date}</small></div>
        <ul class="list-group mb-3">
            ${order.items.map(item => `<li class="list-group-item d-flex justify-content-between"><div>${item.name} (x${item.quantity})</div><span>$${(item.price * item.quantity).toFixed(2)}</span></li>`).join('')}
        </ul>
        <div class="d-flex justify-content-between fw-bold fs-5"><span>Total:</span><span class="text-success">$${order.total}</span></div>
    `;

    document.getElementById("orderModalBody").innerHTML = modalHTML;
    new bootstrap.Modal(document.getElementById('orderModal')).show();
}

function searchProducts() {
    const term = document.getElementById("pos-search").value.toLowerCase();
    const filtered = inventory.filter(item => item.name.toLowerCase().includes(term) || item.category.toLowerCase().includes(term));
    currentPage = 1;
    renderProducts(filtered);
}