import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

let pressVideoSwiper;
let pressArticlesSwiper;

function shufflePressSlides() {
  const wrapper = document.querySelector(
    ".press-articles-swiper .swiper-wrapper",
  );
  if (!wrapper) return;

  const slides = Array.from(wrapper.children);
  for (let i = slides.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [slides[i], slides[j]] = [slides[j], slides[i]];
  }

  slides.forEach((slide) => wrapper.appendChild(slide));
}

function initPressArticlesSwiper() {
  if (!document.querySelector(".press-articles-swiper")) return;

  pressArticlesSwiper?.destroy(true, true);
  pressArticlesSwiper = new Swiper(".press-articles-swiper", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    navigation: {
      nextEl: ".press-articles-nav-next",
      prevEl: ".press-articles-nav-prev",
    },
    pagination: {
      el: ".press-articles-pagination",
      clickable: true,
    },
    breakpoints: {
      700: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      1100: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });
}

function initPressVideoSwiper() {
  if (!document.querySelector(".press-video-swiper")) return;

  pressVideoSwiper?.destroy(true, true);
  pressVideoSwiper = new Swiper(".press-video-swiper", {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      nextEl: ".press-video-nav-next",
      prevEl: ".press-video-nav-prev",
    },
  });
}

function initPressSection() {
  shufflePressSlides();
  initPressArticlesSwiper();
  initPressVideoSwiper();
}

document.addEventListener("DOMContentLoaded", initPressSection, { once: true });
document.addEventListener("astro:page-load", initPressSection);
