# Frontend Mentor - Manage landing page solution

This is a solution to the [Manage landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/manage-landing-page-SLXqC6P5). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- See all testimonials in a horizontal slider
- Receive an error message when the newsletter sign up `form` is submitted if:
  - The `input` field is empty
  - The email address is not formatted correctly

### Links

- Solution URL: [My Repository](https://github.com/Fbeye04/manage-landing-page)
- Live Site URL: [Live Site](https://fbeye04.github.io/manage-landing-page/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript - For all interactive logic

### What I learned

This project was a deep dive into creating complex, responsive components from scratch using Vanilla JavaScript. I'm particularly proud of the logic built for the infinite carousel and the detailed form validation.

#### Infinite Carousel Logic

One of the most significant learnings was how to create a seamless, infinite-looping carousel. The core idea is to clone the first and last few slides, append them to the track, and then "teleport" the scroll position without animation when it reaches the cloned sections. This creates a truly endless experience for the user.

const infiniteScroll = () => {
// If the slider is at the beginning (in the prepended clones section)
if (slider.scrollLeft === 0) {
slider.classList.add("no-transition");
slider.scrollLeft = slider.scrollWidth - 2 \* slider.offsetWidth;
slider.classList.remove("no-transition");
}
// If the slider is at the end (in the appended clones section)
else if (
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

#### Complex Footer Layout with CSS Grid

For the footer, I learned how to create a complex, asymmetrical layout that completely restructures between mobile and desktop. Using grid-template-areas was key to placing each element precisely where it needed to be on larger screens, providing full control over the final layout.

@media (min-width: 1024px) {
.footer-container {
display: grid;
grid-template-areas:
"title menu email"
"sosmed menu copyright";
align-items: start;
}

.img-title { grid-area: title; }
.menu-list { grid-area: menu; }
.inbox-control { grid-area: email; }
.social-media { grid-area: sosmed; align-self: end; }
.copyright-text { grid-area: copyright; align-self: end; text-align: right;}
}

#### Robust Form Validation

I also built a comprehensive set of functions to handle form validation. This process involved separating concerns: one function to check for errors (validateEmail), and helper functions (setError, setSuccess, clearValidation) to manipulate the DOM and provide visual feedback to the user. This makes the code much cleaner and easier to maintain.

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

inboxControl.addEventListener("submit", (e) => {
e.preventDefault();
validateEmail();
});

### Continued development

In future projects, I want to continue focusing on creating complex JavaScript components from scratch. Specifically, I'd like to refine the carousel's "drag" functionality to feel more natural on desktop and perhaps explore different transition effects beyond a simple slide. I also want to get more practice with advanced CSS Grid layouts like the one used in the footer.

## Author

- LinkedIn - [Muhammad Fachrezi Barus](https://www.linkedin.com/in/muhammad-fachrezi-barus/)
- Frontend Mentor - [@Fbeye04](https://www.frontendmentor.io/profile/Fbeye04)
- GitHub - [@Fbeye04](https://github.com/Fbeye04)
