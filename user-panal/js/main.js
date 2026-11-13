const menu = document.querySelector(".menu-btn");
const links = document.querySelector(".navlinks");
if (menu && links) {
  menu.addEventListener("click", () => {
    links.classList.toggle("open");
    menu.setAttribute("aria-expanded", links.classList.contains("open"));
  });
}
document
  .querySelectorAll("[data-year]")
  .forEach((el) => (el.textContent = new Date().getFullYear()));
