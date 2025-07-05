const menuButton = document.getElementById("menu-button");
const menuButtonIcon = menuButton.querySelector("i");
const dropDownMenu = document.getElementById("dropdown-menu");
const slider = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;
const sliderChildrens = [...slider.children];

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

let slidePerView = Math.round(slider.offsetWidth / firstSlideWidth);

sliderChildrens
  .slice(-slidePerView)
  .reverse()
  .forEach((slide) => {
    slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
  });

sliderChildrens.slice(0, slidePerView).forEach((slide) => {
  slider.insertAdjacentHTML("beforeend", slide.outerHTML);
});

arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    slider.scrollLeft +=
      btn.id === "prev-button" ? -firstSlideWidth : firstSlideWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  slider.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  slider.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
  isDragging = false;
  slider.classList.remove("dragging");
};

const autoPlay = () => {
  if (window.innerWidth < 800) return;
  timeoutId = setTimeout(() => (slider.scrollLeft += firstSlideWidth), 2500);
};

autoPlay();

const infiniteScroll = () => {
  if (slider.scrollLeft === 0) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
    slider.classList.remove("no-transition");
  } else if (slider.scrollLeft === slider.scrollWidth - slider.offsetWidth) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove("no-transition");
  }
};

menuButton.addEventListener("click", () => {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  menuButtonIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
slider.addEventListener("scroll", infiniteScroll);
