// Script de gestion du menu de navigation global
// Comportements : ouverture/fermeture, clic extérieur, navigation clavier, accessibilité

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('global-menu-toggle');
  const menuPanel = document.getElementById('global-menu-panel');
  const navbar = document.querySelector('.navbar-container');
  const menuStatus = document.getElementById('menu-status');

  if (!menuToggle || !menuPanel) return;

  let isOpen = false;
  let focusableElements = [];
  let lastFocusedElement = null;

  /**
   * Met à jour la liste des éléments focusables
   */
  function updateFocusableElements() {
    focusableElements = Array.from(
      menuPanel.querySelectorAll('a[href]:not([tabindex="-1"])')
    );
  }

  /**
   * Annonce l'état du menu aux lecteurs d'écran
   */
  function announceMenuState(isOpening) {
    if (menuStatus) {
      menuStatus.textContent = isOpening 
        ? 'Menu de navigation ouvert. Utilisez Tab pour naviguer, Échap pour fermer.'
        : 'Menu de navigation fermé.';
    }
  }

  /**
   * Active les liens du menu (retire tabindex=-1)
   */
  function enableMenuLinks() {
    menuPanel.querySelectorAll('a[href]').forEach(link => {
      link.removeAttribute('tabindex');
    });
    updateFocusableElements();
  }

  /**
   * Désactive les liens du menu (ajoute tabindex=-1)
   */
  function disableMenuLinks() {
    menuPanel.querySelectorAll('a[href]').forEach(link => {
      link.setAttribute('tabindex', '-1');
    });
  }

  /**
   * Ouvre le menu global
   */
  function openMenu() {
    isOpen = true;
    lastFocusedElement = document.activeElement;
    
    menuPanel.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Fermer le menu de navigation');
    menuToggle.classList.add('active');
    
    // Activer les liens du menu
    enableMenuLinks();
    
    // Animation d'ouverture
    requestAnimationFrame(() => {
      menuPanel.classList.add('open');
    });

    // Annonce pour lecteurs d'écran
    announceMenuState(true);

    // Focus sur le premier lien du menu
    setTimeout(() => {
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }, 100);
  }

  /**
   * Ferme le menu global
   */
  function closeMenu(restoreFocus = true) {
    isOpen = false;
    menuPanel.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Ouvrir le menu de navigation');
    menuToggle.classList.remove('active');
    
    // Annonce pour lecteurs d'écran
    announceMenuState(false);
    
    // Masquer après l'animation et désactiver les liens
    setTimeout(() => {
      menuPanel.hidden = true;
      disableMenuLinks();
    }, 300);

    // Restaurer le focus sur l'élément précédent
    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  /**
   * Toggle du menu
   */
  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  /**
   * Gère le focus trap dans le menu
   */
  function handleFocusTrap(e) {
    if (!isOpen || focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const isTabPressed = e.key === 'Tab';

    if (!isTabPressed) return;

    // Si Shift+Tab sur le premier élément, aller au dernier
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } 
    // Si Tab sur le dernier élément, aller au premier
    else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }

  /**
   * Navigation avec les flèches haut/bas
   */
  function handleArrowNavigation(e) {
    if (!isOpen) return;

    const currentIndex = focusableElements.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % focusableElements.length;
      focusableElements[nextIndex].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
      focusableElements[nextIndex].focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusableElements[0].focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      focusableElements[focusableElements.length - 1].focus();
    }
  }

  // Initialisation : désactiver les liens du menu fermé
  disableMenuLinks();

  // Événement clic sur le bouton menu
  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Fonction pour vérifier si on est en mode mobile
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Fermeture au clic extérieur (seulement en desktop)
  document.addEventListener('click', (e) => {
    if (isOpen && !navbar.contains(e.target) && !isMobile()) {
      closeMenu();
    }
  });

  // Empêcher la fermeture si clic dans le panneau
  menuPanel.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Navigation clavier
  document.addEventListener('keydown', (e) => {
    // Échap pour fermer
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      closeMenu();
      menuToggle.focus();
      return;
    }

    // Gestion du focus trap
    handleFocusTrap(e);

    // Navigation avec les flèches
    handleArrowNavigation(e);
  });

  // Fermeture automatique lors de la navigation
  menuPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      // Ne pas restaurer le focus car l'utilisateur navigue
      setTimeout(() => {
        closeMenu(false);
      }, 150);
    });
  });

  // Gestion du redimensionnement
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Ne fermer le menu que si on passe en mode desktop
      if (isOpen && !isMobile()) {
        closeMenu(false);
      }
    }, 250);
  });
});
