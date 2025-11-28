let navBar = document.getElementById("navBar")

fetch("components/navBar/navbar.html")
    .then(response => response.text())
    .then(data => {
        navBar.innerHTML += data;
    })