let navBar = document.getElementById("navBar")
let root = document.getElementById("root")
let currentPage = 1;
const itemsPerPage = 8; 


loadHomePage();


let footerElement = document.getElementById("footer");

fetch("components/footer/footer.html")
    .then(response => response.text())
    .then(data => {
        footerElement.innerHTML += data;
    });

let sideBar = document.getElementById("sidebar");

fetch("components/sidebar/sidebar.html")
.then(response => response.text())
.then(data => {
    sideBar.innerHTML += data;
})

// ===== CART SYSTEM - DEFINE EARLY =====
let cart = [ ];

// Add to cart function
function addToCart(productId) {
    const product = inventory.find(item => item.id === productId);
    if (!product) {
        alert("Product not found!");
        return;
    }
    
    const existingCartItem = cart.find(item => item.id === productId);
    if (existingCartItem) {
        existingCartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity: 1
        });
    }
    
    displayCart();
    calculateTotal();
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-muted text-center mt-5">No items in cart</p>';
        return;
    }
    
    let cartHTML = "";
    cart.forEach((item, index) => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
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
                        <button class="btn btn-sm btn-outline-secondary" style="width: 30px; padding: 2px;" onclick="updateQuantity(${index}, -1)">−</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly style="width: 40px; padding: 4px; font-weight: bold;">
                        <button class="btn btn-sm btn-outline-secondary" style="width: 30px; padding: 2px;" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <strong>$${itemTotal}</strong>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
}

function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = total.toFixed(2);
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
        return;
    }
    displayCart();
    calculateTotal();
}

let inventory = [
  {
    id: 1,
    name: "Classic Black Blouse",
    price: 24.99,
    size: "M",
    color: "Black",
    category: "TOPS",
    image: "assets/img/1.jpg" 
  },
  {
    id: 2,
    name: "Khaki Casual Blazer",
    price: 45.00,
    size: "L",
    color: "Khaki",
    category: "BLAZERS",
    image: "assets/img/2.jpg"
  },
  {
    id: 3,
    name: "Beige Button-Down Dress",
    price: 35.50,
    size: "S",
    color: "Beige",
    category: "DRESSES",
    image: "assets/img/3.jpg"
  },
  {
    id: 4,
    name: "Light Blue Office Shirt",
    price: 29.99,
    size: "M",
    color: "Blue",
    category: "SHIRTS",
    image: "assets/img/4.jpg"
  },
  {
    id: 5,
    name: "Dusty Pink Basic Top",
    price: 15.99,
    size: "M",
    color: "Pink",
    category: "TOPS",
    image: "assets/img/5.jpg"
  },
  {
    id: 6,
    name: "Navy Blue Pleated Skirt",
    price: 32.00,
    size: "S",
    color: "Navy",
    category: "SKIRTS",
    image: "assets/img/6.jpg"
  },
  {
    id: 7,
    name: "Floral Midi Skirt",
    price: 28.50,
    size: "L",
    color: "Floral",
    category: "SKIRTS",
    image: "assets/img/7.jpg"
  },
  {
    id: 8,
    name: "Brown Polo Shirt",
    price: 19.99,
    size: "M",
    color: "Brown",
    category: "SHIRTS",
    image: "assets/img/brown.jpg"
  },
  {
    id: 9,
    name: "Essential White T-Shirt",
    price: 12.99,
    size: "S",
    color: "White",
    category: "TOPS",
    image: "assets/img/white.jpg"
  },
  // ===== ACCESSORIES CATEGORY =====
  {
    id: 10,
    name: "Gold Chain Necklace",
    price: 18.99,
    color: "Gold",
    category: "JEWELLERY",
    image: "assets/img/necklace.jpg"
  },
  {
    id: 11,
    name: "Silver Bracelet",
    price: 22.50,
    color: "Silver",
    category: "JEWELLERY",
    image: "assets/img/bracelet.jpg"
  },
  {
    id: 12,
    name: "Classic Digital Watch",
    price: 45.99,
    color: "Black",
    category: "WATCHES",
    image: "assets/img/watch.jpg"
  },
  {
    id: 13,
    name: "Hair Clip Set",
    price: 12.99,
    color: "Multicolor",
    category: "HAIR ACCESSORIES",
    image: "assets/img/hair-clip.jpg"
  },
  {
    id: 14,
    name: "Leather Wallet",
    price: 35.00,
    color: "Brown",
    category: "WALLETS",
    image: "assets/img/wallet.jpg"
  },
  {
    id: 15,
    name: "UV Protection Sunglasses",
    price: 55.00,
    color: "Black",
    category: "SUNGLASSES",
    image: "assets/img/sunglasses.jpg"
  },
  // ===== BAGS CATEGORY =====
  {
    id: 16,
    name: "Canvas Tote Bag",
    price: 39.99,
    color: "Beige",
    category: "BAGS",
    image: "assets/img/tote-bag.jpg"
  },
  {
    id: 17,
    name: "Black Crossbody Bag",
    price: 49.50,
    color: "Black",
    category: "BAGS",
    image: "assets/img/crossbody.jpg"
  },
  {
    id: 18,
    name: "Leather Handbag",
    price: 75.00,
    color: "Burgundy",
    category: "BAGS",
    image: "assets/img/handbag.jpg"
  },
  // ===== SHOES CATEGORY =====
  {
    id: 19,
    name: "White Sneakers",
    price: 65.00,
    size: "M",
    color: "White",
    category: "SHOES",
    image: "assets/img/sneakers.jpg"
  },
  {
    id: 20,
    name: "Black Formal Heels",
    price: 55.00,
    size: "S",
    color: "Black",
    category: "SHOES",
    image: "assets/img/heels.jpg"
  },
  {
    id: 21,
    name: "Brown Leather Boots",
    price: 85.00,
    size: "M",
    color: "Brown",
    category: "SHOES",
    image: "assets/img/boots.jpg"
  }
];

function getNextProductId() {
    if (inventory.length === 0) {
        return 1;
    }

    const biggestId = Math.max(...inventory.map(item => item.id));
    return biggestId + 1;
}

function addProduct(productData) {
    if (!productData || typeof productData !== "object") {
        alert("Please provide product details.");
        return;
    }

    const name = (productData.name || "").trim();
    const category = (productData.category || "").trim().toUpperCase();
    const image = (productData.image || "").trim();
    const price = Number(productData.price);
    const size = (productData.size || "").trim();
    const color = (productData.color || "").trim();

    if (!name || !category || !image || Number.isNaN(price) || price <= 0) {
        alert("Name, category, image, and valid price are required.");
        return;
    }

    const newProduct = {
        id: getNextProductId(),
        name,
        price,
        category,
        image
    };

    if (size) {
        newProduct.size = size;
    }
    if (color) {
        newProduct.color = color;
    }

    inventory.push(newProduct);
    populateCategoryMenu();
    renderProducts(inventory);

    alert(`Product added: ${newProduct.name}`);
}

function setupAddProductForm() {
    const form = document.getElementById("add-product-form");
    if (!form) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const newProductData = {
            name: document.getElementById("product-name").value,
            price: document.getElementById("product-price").value,
            category: document.getElementById("product-category").value,
            image: document.getElementById("product-image").value,
            size: document.getElementById("product-size").value,
            color: document.getElementById("product-color").value
        };

        addProduct(newProductData);
        form.reset();
    });
}


function loadProducts(){
    renderProducts(inventory);
}

loadProducts();

function searchProducts() {
    const searchTerm = document.getElementById("pos-search").value.toLowerCase();
    
    const filteredItems = inventory.filter(item => 
        item.name.toLowerCase().includes(searchTerm) || 
        item.category.toLowerCase().includes(searchTerm)
    );
    
    currentPage = 1; // Search pannum pothu 1st page-ku poyidanum
    renderProducts(filteredItems);
}

function renderProducts(items) {
    const container = document.getElementById("product-list");
    
    // 1. Pagination Calculation
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    // 2. Clear and Render Items
    let htmlString = "";
    paginatedItems.forEach(item => {
        // "col" mattum use panrom, image height 160px aakki irukkom
        htmlString += `
          <div class="col">
            <div class="card shadow-sm border-0 h-100" onclick="addToCart(${item.id})" style="cursor: pointer;"> 
              <img src="${item.image}" class="card-img-top" style="height: 160px; object-fit: cover; object-position: top;">
              <div class="card-body p-2 text-center bg-light">
                <h6 class="card-title mb-0 text-truncate" style="font-size: 14px;">${item.name}</h6>
                <p class="text-success fw-bold mb-0 mt-1">$${item.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        `;
    });
    container.innerHTML = htmlString || '<p class="text-center w-100 mt-4">No products found.</p>';

    // 3. Render Pagination Buttons
    renderPaginationControls(items.length);
}

function renderPaginationControls(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; 
    let paginationHTML = `
        <div class="d-flex justify-content-center w-100">
            <button class="btn btn-outline-dark me-2" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(-1)">Prev</button>
            <span class="align-self-center mx-3 fw-bold">Page ${currentPage} of ${totalPages}</span>
            <button class="btn btn-outline-dark" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(1)">Next</button>
        </div>
    `;
    
    // Namma HTML-la pudhusa add panna div-kulla "innerHTML" moolama ulla podrom!
    const paginationContainer = document.getElementById("pagination-controls");
    if (paginationContainer) {
        paginationContainer.innerHTML = paginationHTML;
    }
}

function changePage(step) {
    currentPage += step;
    // Current inventory filter-a vachu thirumba render panrom
    loadProducts(); 
}


document.addEventListener("click", (event) => {
    const filterElement = event.target.closest("[data-category-filter]");
    if (!filterElement) {
        return;
    }

    event.preventDefault();
    filterProducts(filterElement.dataset.categoryFilter);
});



function populateCategoryMenu() {

  
  const clothingList = ["TOPS" , "SHIRTS" , "JEANS", "SKIRTS", "BLAZERS", "SHORTS"];
  const accessoriesList = ["JEWELLERY", "WATCHES", "HAIR ACCESSORIES", "WALLETS", "SUNGLASSES"];
  const bagsShoesList = ["BAGS" , "SHOES"];
  
  
  const inventoryCategories = [...new Set(inventory.map(item => item.category))];
  
  
  function buildMenu(menuId, expectedList, title) {
        const menuElement = document.getElementById(menuId);
        if (!menuElement) return;  // Stop if menu doesn't exist

        
        const availableCategories = expectedList.filter(cat => inventoryCategories.includes(cat));

        
        let html = `
            <li><a class='dropdown-item fw-bold text-primary' href='#' onclick='filterProductsByGroup("${menuId}"); return false;'>ALL ${title}</a></li>
            <li><hr class="dropdown-divider"></li>
        `;

        
        availableCategories.forEach(category => {
            html += `<li><a class='dropdown-item' href='#' onclick='filterProducts("${category}"); return false;'>${category}</a></li>`;
        });

        menuElement.innerHTML = html;
  }
  
  
  buildMenu("clothing-menu", clothingList, "CLOTHING");
  buildMenu("accessories-menu", accessoriesList, "ACCESSORIES");
  buildMenu("bags-shoes-menu", bagsShoesList, "BAGS & SHOES");
}

function loadHomePage(event) {
    if(event) event.preventDefault(); 
    
    let root = document.getElementById("root");
    
    fetch("components/home/home.html")
        .then(response => response.text())
        .then(data => {
            root.innerHTML = data; 
            loadProducts(); 
            
            
            let dashBtn = document.getElementById("nav-dashboard");
            let prodBtn = document.getElementById("nav-products");
            if (dashBtn) dashBtn.className = "nav-link active";
            if (prodBtn) prodBtn.className = "nav-link text-dark";
        });
}

function loadProductsPage(event) {
    if(event) event.preventDefault();
    console.log("Products button click aagirukku! 🚀");
    let root = document.getElementById("root");
    
    fetch("components/products/products.html")
        .then(response => response.text())
        .then(data => {
            root.innerHTML = data;
            
            
            let dashBtn = document.getElementById("nav-dashboard");
            let prodBtn = document.getElementById("nav-products");
            if (dashBtn) dashBtn.className = "nav-link text-dark";
            if (prodBtn) prodBtn.className = "nav-link active";
            
            // Inga namma Admin Table load panra function-a appram poduvom!
        });
}