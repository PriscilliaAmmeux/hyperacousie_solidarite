import { Swiper } from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const swiper = new Swiper(".videoRessourceSwiper", {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".video-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".video-nav-next",
    prevEl: ".video-nav-prev",
  },
});
