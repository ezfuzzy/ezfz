// /partials/header.js
document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.getElementById("burger-menu");
  const sideBar = document.getElementById("sideBar");
  const closeBtn = document.getElementById("closeBtn");

  if (burgerMenu && sideBar && closeBtn) {
    burgerMenu.addEventListener("click", () => {
      sideBar.style.width = "250px";
    });

    closeBtn.addEventListener("click", () => {
      sideBar.style.width = "0";
    });
  } else {
    console.error("Element not found:", {
      burgerMenu,
      sideBar,
      closeBtn,
    });
  }
});
