document.getElementById("btn-menu").addEventListener("click", () => {
  let menu = document.getElementById("menu");
  let body = document.body;

  if (menu.style.display === "flex") {
    document.getElementsByClassName("menu")[0].classList.remove("active");
    document.getElementsByClassName("menu")[0].classList.toggle("closing");
    body.classList.remove("noscroll");

    setTimeout(() => {
      document.getElementsByClassName("menu")[0].classList.remove("closing");
      menu.style.display = "none";
    }, 500);
  } else {
    menu.style.display = "flex";
    body.classList.add("noscroll");
    document.getElementsByClassName("menu")[0].classList.toggle("active");
  }
});

document.getElementById("user").addEventListener("click", () => {
  window.location.href = "/dashboard";
});

document.getElementById("logo").addEventListener("click", () => {
  window.location.href = "/";
});

document.querySelectorAll(".btn-submenu").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".menu-item");
    item.classList.toggle("open");
  });
});

document.getElementById("shopping-cart").addEventListener("click", () => {
  window.location.href = "/cart";
});
