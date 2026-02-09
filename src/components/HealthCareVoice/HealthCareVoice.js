import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Fonction pour mélanger un tableau (Fisher-Yates shuffle)
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

document.addEventListener("DOMContentLoaded", () => {
  // Randomiser l'ordre des slides
  const swiperWrapper = document.querySelector(".healthcare-voices-swiper .swiper-wrapper");
  if (swiperWrapper) {
    const slides = Array.from(swiperWrapper.children);
    const shuffledSlides = shuffleArray(slides);
    swiperWrapper.innerHTML = "";
    shuffledSlides.forEach(slide => swiperWrapper.appendChild(slide));
  }

  // Initialiser le swiper
  new Swiper(".healthcare-voices-swiper", {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
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
        slidesPerView: 3,
      },
    },
  });

  // Gérer les boutons "Voir plus / Voir moins"
  const initializeToggleButtons = () => {
    const cards = document.querySelectorAll(".card-voices");
    
    cards.forEach(card => {
      const content = card.querySelector(".voice-content");
      const toggleBtn = card.querySelector(".toggle-btn");
      const voiceText = card.querySelector(".voice-text");
      
      if (!content || !toggleBtn || !voiceText) return;
      
      // Initialiser comme collapsed
      content.classList.add("collapsed");
      
      // Vérifier si le contenu nécessite un bouton "voir plus"
      const checkIfNeedsToggle = () => {
        const isOverflowing = voiceText.scrollHeight > content.clientHeight;
        if (!isOverflowing && content.classList.contains("collapsed")) {
          toggleBtn.classList.add("hidden");
        } else {
          toggleBtn.classList.remove("hidden");
        }
      };
      
      // Vérifier après un court délai pour s'assurer que le DOM est bien rendu
      setTimeout(checkIfNeedsToggle, 100);
      
      // Gérer le clic sur le bouton
      toggleBtn.addEventListener("click", () => {
        const isCollapsed = content.classList.contains("collapsed");
        
        if (isCollapsed) {
          content.classList.remove("collapsed");
          content.classList.add("expanded");
          card.classList.add("expanded");
          toggleBtn.textContent = "Voir moins";
          toggleBtn.setAttribute("aria-label", "Voir moins");
        } else {
          content.classList.add("collapsed");
          content.classList.remove("expanded");
          card.classList.remove("expanded");
          toggleBtn.textContent = "Voir plus";
          toggleBtn.setAttribute("aria-label", "Voir plus");
        }
      });
    });
  };
  
  // Initialiser les boutons après l'initialisation du swiper
  setTimeout(initializeToggleButtons, 200);
});
