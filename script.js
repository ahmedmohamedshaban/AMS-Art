//hello i am graphic designer....
//append arr[i] if i=arr.length-1 clear set
const sections = document.querySelectorAll("section");
const linksSpan = document.querySelectorAll(".nav__links-active");
const links = document.querySelectorAll(".nav__links-link");
const text = document.querySelector(".heading-2");
const button = document.querySelector(".heading-btn");
const arrow = document.querySelector(".icon-arrow");
const nav = document.querySelector(".nav");
const images = document.querySelectorAll(".photo");

const addSpan = (link) => link.classList.remove("nav__links-active-hidden");
const removeSpan = (link) => link.classList.add("nav__links-active-hidden");

const activeNav = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    linksSpan.forEach((link) => {
      if (link.dataset.active === id) {
        const activeLink = link;
        addSpan(activeLink);
      } else removeSpan(link);
    });
  });
};

const closeModal = () => {
  document.querySelector(".ov").classList.add("hidden-1");
  document.querySelector(".ov").classList.remove("overlay");
  nav.classList.remove("header_top");
};
const loadSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("hidden-section");
    observer.unobserve(entry.target);
  });
};
const observer = new IntersectionObserver(activeNav, {
  root: null,
  threshold: 0.12,
});
const sectionAppear = new IntersectionObserver(loadSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach((section) => {
  section.classList.add("hidden-section");
  observer.observe(section);
  sectionAppear.observe(section);
});

// const textLoad = () => {
//   setTimeout(() => (text.textContent = "graphic designer"), 0);
//   setTimeout(() => (text.textContent = "concept designer"), 4000);
//   setTimeout(() => (text.textContent = "free lancer"), 8100);
// };
// textLoad();
// setInterval(textLoad, 12000);

button.addEventListener("mouseenter", () => {
  arrow.classList.remove("hidden");
});
button.addEventListener("mouseleave", () => {
  arrow.classList.add("hidden");
});

let lastscroll = window.pageYOffset;
window.addEventListener("scroll", (e) => {
  e.preventDefault();
  const currentscroll = window.pageYOffset;
  if (currentscroll > lastscroll) nav.classList.add("sticky-down");
  if (currentscroll <= lastscroll) nav.classList.remove("sticky-down");
  lastscroll = currentscroll;
});

const loadimg = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove("hidden-image");
    observer.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0.3,
});
images.forEach((image) => {
  imgObserver.observe(image);
  image.classList.add("hidden-image");
  image.classList.add("lazy-img");
});

images.forEach((image) => {
  image.addEventListener("click", () => {
    nav.classList.add("header_top");
    document.querySelector(".ov").classList.remove("hidden-1");
    document.querySelector(".ov").classList.add("overlay");
    let imgsrc = document.querySelector(".overlay__img");
    console.log(window.getComputedStyle(image).backgroundImage.slice(27, -2));
    console.log(imgsrc);
    imgsrc.style.backgroundImage =
      window.getComputedStyle(image).backgroundImage;
  });
});
document.querySelector(".close").addEventListener("click", closeModal);
document.querySelector(".ov").addEventListener("click", () => {
  if (document.querySelector(".ov").classList.contains("overlay")) closeModal();
});

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const slides1 = document.querySelectorAll(".slide-1");
const btnright = document.querySelector(".slider__btn--right");
const btnleft = document.querySelector(".slider__btn--left");
const btnright1 = document.querySelector(".slider__btn--right-1");
const btnleft1 = document.querySelector(".slider__btn--left-1");
const dotcontainer = document.querySelector(".dots");
const dotcontainer1 = document.querySelector(".dots1");

const sliderFunction = function (_slides, button1, button2, dots, j) {
  let currentslide = 0;
  const moveSlider = (curslide) =>
    _slides.forEach(
      (slide, i) =>
        (slide.style.transform = `translateX(${(i - curslide) * 100}%)`)
    );
  const creatDots = function () {
    _slides.forEach((_, i) => {
      dots.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot${j}" data-slide="${i}"></button>`
      );
    });
  };
  const activeDots = function (slide) {
    document
      .querySelectorAll(`.dots__dot${j}`)
      .forEach((dot) => dot.classList.remove(`dots__dot--active${j}`));
    document
      .querySelector(`.dots__dot${j}[data-slide="${slide}"]`)
      .classList.add(`dots__dot--active${j}`);
  };
  const moveRight = () => {
    if (currentslide === _slides.length - 1) currentslide = 0;
    else currentslide++;
    moveSlider(currentslide);
    activeDots(currentslide);
  };
  const moveLeft = () => {
    if (currentslide === 0) currentslide = _slides.length - 1;
    else currentslide--;
    moveSlider(currentslide);
    activeDots(currentslide);
  };
  moveSlider(0);
  creatDots();
  activeDots(0);
  dots.addEventListener("click", (e) => {
    if (e.target.classList.contains(`dots__dot${j}`))
      currentslide = +e.target.dataset.slide;
    moveSlider(currentslide);
    activeDots(currentslide);
  });
  button1.addEventListener("click", moveRight);
  button2.addEventListener("click", moveLeft);
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") moveRight();
    if (e.key === "ArrowLeft") moveLeft();
  });
};

sliderFunction(slides1, btnright1, btnleft1, dotcontainer1, "1");
