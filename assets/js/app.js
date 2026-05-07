let navBar = document.getElementById("navBar")
let root = document.getElementById("root")

fetch("components/navBar/navbar.html")
    .then(response => response.text())
    .then(data => {
        navBar.innerHTML += data;
        populateCategoryMenu();
    })

fetch("components/home/home.html")
    .then(response => response.text())
    .then(data => {
        root.innerHTML += data;
        loadProducts();
    })

let footerElement = document.getElementById("footer");

fetch("components/footer/footer.html")
    .then(response => response.text())
    .then(data => {
        footerElement.innerHTML += data;
    });

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
                    <div class="input-group" style="width: 80px;">
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">−</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <strong>$${itemTotal}</strong>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
}

// Calculate total
function calculateTotal() {
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    
    const totalElement = document.getElementById("cart-total");
    totalElement.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
    calculateTotal();
}

// Update quantity
function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        removeFromCart(index);
        return;
    }
    displayCart();
    calculateTotal();
}

// ===== INVENTORY PRODUCTS =====
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


function loadProducts(){
    renderProducts(inventory);
}

loadProducts();

function filterProducts(categoryName) {
    const selectedCategory = (categoryName || "").trim().toUpperCase();
    const filteredItems = selectedCategory && selectedCategory !== "ALL"
        ? inventory.filter(item => item.category === selectedCategory)
        : inventory;

    renderProducts(filteredItems);
}


function filterProductsByGroup(menuId) {
    let filteredItems = [];
    
    
    const menuGroups = {
        "clothing-menu": ["TOPS", "SHIRTS", "JEANS", "SKIRTS", "BLAZERS", "SHORTS"],
        "accessories-menu": ["JEWELLERY", "WATCHES", "HAIR ACCESSORIES", "WALLETS", "SUNGLASSES"],
        "bags-shoes-menu": ["BAGS", "SHOES"]
    };
    
    
    const categoriesInGroup = menuGroups[menuId] || [];
    
    
    filteredItems = inventory.filter(item => categoriesInGroup.includes(item.category));
    
    renderProducts(filteredItems);
}

function renderProducts(items) {
    const container = document.getElementById("product-list");
    let htmlString = "";

    items.forEach(item => {
        htmlString += `
          <div class="col">
            <div class="card shadow-sm product-card"> 
              <img src="${item.image}" class="card-img-top product-img" alt="${item.name}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title"> ${item.name} </h5>
                <p class="card-text">Price: $${item.price.toFixed(2)}</p>
                <button class="btn btn-dark w-100 mt-auto" onclick="addToCart(${item.id})">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
    });

    container.innerHTML = htmlString || '<p class="text-muted">No products found for this category.</p>';
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

