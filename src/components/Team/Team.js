import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const teamSwiper = new Swiper(".swiper-team", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 20,
  centeredSlides: true,
  loop: false,
  pagination: {
    el: ".pagination-team",
    clickable: true,
  },
  navigation: {
    nextEl: ".next-team",
    prevEl: ".prev-team",
  },
  breakpoints: {
    641: {
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
      centeredSlides: false,
    },
  },
});
