let navBar = document.getElementById("navBar")
let root = document.getElementById("root")

fetch("components/navBar/navbar.html")
    .then(response => response.text())
    .then(data => {
        navBar.innerHTML += data;
    })

fetch("components/home/home.html")
    .then(response => response.text())
    .then(data => {
        root.innerHTML += data;
        loadProducts();
    })


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

let cart = [ ];

