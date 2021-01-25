/*
 *
 * TOGGLING NAVBAR
 *
 */
// Function to open/close the navbar.
const navbar = document.querySelector("nav");
const toggleNavbar = () => {
  // If the window's width more than 1100px, then does not run the code.
  if (window.innerWidth > 1100) return;

  // If the navbar is opened, then close it.
  if (navbar.className === "toggled") {
    navbar.className = "";
    return;
  }

  // If the navbar is closed, then open it.
  navbar.className = "toggled";
};

/*
 *
 * ADJUSTING VIEWPORT HEIGHT
 *
 */
const setViewportHeightProperty = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
setViewportHeightProperty();

/*
 *
 * DETECT SWIPING
 *
 */
let xDown = null;
let yDown = null;

// Store the current position of finger, when touching the screen.
const handleTouchStart = (e) => {
  xDown = e.touches[0].clientX;
  yDown = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  // Do not run if the window's size is smaller than 1100px, or the
  // touchstart event wasn't called;
  if (window.innerWidth > 1100) return;
  if (!xDown || !yDown) return;

  // Get the current position of finger.
  const xUp = e.touches[0].clientX;
  const yUp = e.touches[0].clientY;

  // Get the difference between the start and the current position of finger.
  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  // If the scrolling is sideways.
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    const navbar = document.querySelector("nav");

    if (xDiff < 0) {
      // If you slide right, then open the navbar.
      navbar.className = "toggled";
    } else {
      // If you slide left, then close the navbar;
      navbar.className = "";
    }
  }

  // Reset the finger position values.
  xDown = null;
  yDown = null;
};

/*
 *
 * EVENT LISTENERS
 *
 */

/*
 *
 * HEADER ADD CLASS ON SCROLL
 *
 */
// If the scroll position is greater than 0, then add the 'scrolled' class to
// the header.
window.addEventListener("scroll", () => {
  if (window.innerWidth > 1100) return;

  const header = document.querySelector("header");
  const currentPosition = window.scrollY;

  if (currentPosition > 0) {
    header.className = "scrolled";
    return;
  }

  header.className = "";
});

/*
 *
 * ADJUSTING VIEWPORT HEIGHT
 *
 */
// When the window's is resized, adjust the viewport height property in CSS.
window.addEventListener("resize", setViewportHeightProperty);

// Elements used in opening/closing the navbar.
const navbarOpenButton = document.querySelector(".navbar--mobile-button");
const navbarLinks = document.querySelectorAll("nav a");
const pageContent = document.querySelector("main");

// If you click the navbar hamburger button, then open or close the navbar
// based on its status.
navbarOpenButton.addEventListener("click", toggleNavbar);

// If you click a link in the navbar, then close the navbar.
[...navbarLinks].map((navbarLink) => {
  navbarLink.addEventListener("click", toggleNavbar);
});

// If you click on the page content, when the navbar is opened, then close it.
pageContent.addEventListener("click", () => {
  // Only runs if the navbar is opened.
  if (navbar.className === "") return;
  navbar.className = "";
});

/*
 *
 * DETECT SWIPING
 *
 */
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchmove", handleTouchMove);
