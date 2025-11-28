document.addEventListener("DOMContentLoaded", () => {
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const item = header.parentElement;
      const icon = header.querySelector(".accordion-icon");
      const isOpen = item.classList.contains("active");
      const itemIndex = Array.from(
        document.querySelectorAll(".accordion-item")
      ).indexOf(item);

      // Fermer les autres items de la même colonne (même parité)
      document.querySelectorAll(".accordion-item").forEach((i, idx) => {
        if (i !== item && idx % 2 === itemIndex % 2) {
          i.classList.remove("active");
          i.querySelector(".accordion-icon").textContent = "+";
        }
      });

      // Toggle l'item actuel
      if (isOpen) {
        item.classList.remove("active");
        icon.textContent = "+";
      } else {
        item.classList.add("active");
        icon.textContent = "−";
      }
    });
  });
});
