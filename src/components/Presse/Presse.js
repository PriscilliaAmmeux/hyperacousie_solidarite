import { Swiper } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

let pressVideoSwiper;

function shufflePressCards() {
  const grid = document.getElementById("press-grid");
  if (!grid) return;

  const cards = Array.from(grid.children);
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  cards.forEach((card) => grid.appendChild(card));
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
  shufflePressCards();
  initPressVideoSwiper();
}

document.addEventListener("DOMContentLoaded", initPressSection, { once: true });
document.addEventListener("astro:page-load", initPressSection);
