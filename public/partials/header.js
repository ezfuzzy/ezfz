// /partials/header.js
// TODO: header.js not working because of dom loading issue
// > not big issue. process later
// > Solution: Use document.addEventListener("DOMContentLoaded", () => { ... }); not working
// > Solution: Use window.onload = function() { ... }; not working
// > Solution: Use window.addEventListener("load", function() { ... }); not working
// > dynamic include script in html; not working

// > Solution: Use window.addEventListener("DOMContentLoaded", function() { ... }); ?
document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burger-menu");
  const sideBar = document.getElementById("sideBar");
  var isOpen = false;

  if (burgerMenu && sideBar) {
    burgerMenu.addEventListener("click", () => {
      if (!isOpen) {
        sideBar.style.width = "250px";
        burgerMenu.classList.add("reverse");
        isOpen = true;
      } else {
        sideBar.style.width = "0";
        burgerMenu.classList.remove("reverse");
        isOpen = false;
      }
    });
  } else {
    console.error("Element not found:", {
      burgerMenu,
      sideBar,
    });
  }
});
