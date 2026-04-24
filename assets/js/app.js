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
    })