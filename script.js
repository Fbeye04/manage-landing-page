const menuButton = document.getElementById("menu-button");
const menuButtonIcon = menuButton.querySelector("i");
const dropDownMenu = document.getElementById("dropdown-menu");
const sliderWrapper = document.querySelector(".slider-wrapper");
const slider = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;
const sliderChildrens = [...slider.children];
const inboxControl = document.getElementById("inbox-control");
const email = document.getElementById("email");

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
  } else if (
    Math.ceil(slider.scrollLeft) ===
    slider.scrollWidth - slider.offsetWidth
  ) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove("no-transition");
  }

  clearTimeout(timeoutId);
  if (!sliderWrapper.matches(":hover")) autoPlay();
};

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateEmail = () => {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Please insert a valid email");
  } else {
    setSuccess(email);
  }
};

const clearValidation = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("success");
  inputControl.classList.remove("error");
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
sliderWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
sliderWrapper.addEventListener("mouseleave", autoPlay);

inboxControl.addEventListener("submit", (e) => {
  e.preventDefault();

  validateEmail();
});

email.addEventListener("input", (e) => {
  const emailValue = e.target.value.trim();

  if (emailValue === "") {
    clearValidation(email);
  }
});
