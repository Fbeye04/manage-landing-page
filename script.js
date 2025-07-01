const menuButton = document.getElementById("menu-button");
const menuButtonIcon = menuButton.querySelector("i");
const dropDownMenu = document.getElementById("dropdown-menu");

menuButton.addEventListener("click", () => {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  menuButtonIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});
