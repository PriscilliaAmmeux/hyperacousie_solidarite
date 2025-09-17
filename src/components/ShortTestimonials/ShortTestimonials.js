import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiper = new Swiper(".short-testimonials-swiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 20,
  autoHeight: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 1,
    },
  },
});

swiper.on("slideChangeTransitionEnd", function () {
  swiper.updateAutoHeight(300); // 300ms d'animation, adapte si besoin
});
