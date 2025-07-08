// Mobile Menu Elements
const menuButton = document.getElementById("menu-button");
const menuButtonIcon = menuButton.querySelector("i");
const dropDownMenu = document.getElementById("dropdown-menu");

// Carousel Elements
const sliderWrapper = document.querySelector(".slider-wrapper");
const slider = document.querySelector(".slider");
const arrowBtns = document.querySelectorAll(".slider-wrapper i");
const sliderChildrens = [...slider.children];

// Form Validation Elements
const inboxControl = document.getElementById("inbox-control");
const email = document.getElementById("email");

// Get the width of the first slide, which will be used to calculate scroll distance
const firstSlideWidth = slider.querySelector(".slide").offsetWidth;

let isDragging = false,
  startX,
  startScrollLeft,
  timeoutId;

// Calculate how many slides are visible at a time
let slidePerView = Math.round(slider.offsetWidth / firstSlideWidth);

/**
 * --- Infinite Carousel Setup: Cloning Slides ---
 * To create the illusion of an infinite loop, we clone the first and last few slides
 * and prepend/append them to the beginning and end of the carousel.
 */
// Clone last slides and add to the beginning
sliderChildrens
  .slice(-slidePerView)
  .reverse()
  .forEach((slide) => {
    slider.insertAdjacentHTML("afterbegin", slide.outerHTML);
  });

// Clone first slides and add to the end
sliderChildrens.slice(0, slidePerView).forEach((slide) => {
  slider.insertAdjacentHTML("beforeend", slide.outerHTML);
});

/**
 * Handles the click event for the carousel arrow buttons (prev/next).
 */
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Scrolls the slider left or right based on the button's id
    slider.scrollLeft +=
      btn.id === "prev-button" ? -firstSlideWidth : firstSlideWidth;
  });
});

/**
 * Starts the drag event when the user clicks and holds the mouse down.
 * @param {MouseEvent} e The mouse event object.
 */
const dragStart = (e) => {
  isDragging = true;
  slider.classList.add("dragging"); // Add class for visual feedback (e.g., cursor style)
  // Record the initial mouse position and scroll position
  startX = e.pageX;
  startScrollLeft = slider.scrollLeft;
};

/**
 * Handles the dragging movement, scrolling the slider based on mouse movement.
 * @param {MouseEvent} e The mouse event object.
 */
const dragging = (e) => {
  if (!isDragging) return; // Stop if not currently dragging
  slider.scrollLeft = startScrollLeft - (e.pageX - startX);
};

/**
 * Stops the drag event when the mouse button is released.
 */
const dragStop = () => {
  isDragging = false;
  slider.classList.remove("dragging");
};

/**
 * Starts the automatic sliding of the carousel every 2.5 seconds.
 * This is disabled on smaller viewports (< 800px).
 */
const autoPlay = () => {
  if (window.innerWidth < 800) return; // Don't autoplay on mobile
  timeoutId = setTimeout(() => (slider.scrollLeft += firstSlideWidth), 2500);
};

/**
 * The core function for the infinite scroll illusion.
 * When the scroll position reaches the cloned slides at either end,
 * it "teleports" the scroll position back to the corresponding original slide
 * without a CSS transition, making the loop appear seamless.
 */
const infiniteScroll = () => {
  // If the slider is at the beginning (in the prepended clones section)
  if (slider.scrollLeft === 0) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.scrollWidth - 2 * slider.offsetWidth;
    slider.classList.remove("no-transition");
    // If the slider is at the end (in the appended clones section)
  } else if (
    Math.ceil(slider.scrollLeft) ===
    slider.scrollWidth - slider.offsetWidth
  ) {
    slider.classList.add("no-transition");
    slider.scrollLeft = slider.offsetWidth;
    slider.classList.remove("no-transition");
  }

  // Clear existing timeout and start a new one if the mouse is not hovering
  clearTimeout(timeoutId);
  if (!sliderWrapper.matches(":hover")) autoPlay();
};

/**
 * Applies error styles and displays an error message for a form input.
 * @param {HTMLElement} element The input element that has an error.
 * @param {string} message The error message to display.
 */
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

/**
 * Applies success styles and clears the error message for a form input.
 * @param {HTMLElement} element The input element to set as success.
 */
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

/**
 * Clears all validation styles (error and success) from a form input.
 * @param {HTMLElement} element The input element to clear.
 */
const clearValidation = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("success");
  inputControl.classList.remove("error");
};

/**
 * Checks if a string is a valid email format using a Regular Expression.
 * @param {string} email The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Main validation function that checks the email input value and calls setError or setSuccess.
 */
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

// Toggles the mobile navigation menu on hamburger button click.
menuButton.addEventListener("click", () => {
  dropDownMenu.classList.toggle("open");
  const isOpen = dropDownMenu.classList.contains("open");
  menuButtonIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
});

// Initializes the dragging functionality on the carousel.
slider.addEventListener("mousedown", dragStart);
slider.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

// Checks for the infinite scroll condition every time the user scrolls the carousel.
slider.addEventListener("scroll", infiniteScroll);

// Pauses the auto-play on hover and resumes when the mouse leaves.
sliderWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
sliderWrapper.addEventListener("mouseleave", autoPlay);

// Handles the footer form submission.
inboxControl.addEventListener("submit", (e) => {
  e.preventDefault();
  validateEmail();
});

// Clears validation styles when the user starts typing in an empty email input.
email.addEventListener("input", (e) => {
  const emailValue = e.target.value.trim();

  if (emailValue === "") {
    clearValidation(email);
  }
});

// Start the carousel's auto-play feature when the page loads.
autoPlay();
