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

// Gestion des boutons "Voir plus" / "Voir moins"
document.addEventListener('click', (e) => {
  if (e.target.closest('.read-more-btn')) {
    const btn = e.target.closest('.read-more-btn');
    const card = btn.closest('.testimonial-card');
    const shortText = card.querySelector('.testimonial-short');
    const fullText = card.querySelector('.testimonial-full');
    const readMoreText = btn.querySelector('.read-more-text');
    const readLessText = btn.querySelector('.read-less-text');
    
    if (shortText.style.display !== 'none') {
      // Afficher le texte complet
      shortText.style.display = 'none';
      fullText.style.display = 'block';
      readMoreText.style.display = 'none';
      readLessText.style.display = 'inline';
    } else {
      // Afficher le texte tronqué
      shortText.style.display = 'block';
      fullText.style.display = 'none';
      readMoreText.style.display = 'inline';
      readLessText.style.display = 'none';
    }
    
    // Mettre à jour la hauteur du swiper
    setTimeout(() => {
      swiper.updateAutoHeight(300);
    }, 10);
  }
});

