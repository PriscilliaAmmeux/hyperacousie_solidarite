console.log(import.meta.env);

import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Check required fields
    if (!form.checkValidity()) {
      Swal.fire({
        title: "Champs manquants",
        text: "Veuillez remplir tous les champs du formulaire.",
        icon: "warning",
      });
      return;
    }

    // Validate phone number format
    const phone = form.querySelector('[name="user_phone"]').value;
    const regex = /^[0-9]{10,15}$/;
    if (!regex.test(phone)) {
      Swal.fire({
        title: "Numéro invalide",
        text: "Veuillez entrer un numéro de téléphone valide (exemple : 0612345678).",
        icon: "warning",
      });
      return;
    }

    // Check privacy policy acceptance
    const acceptedPrivacy = form.querySelector('[name="accept"]').checked;
    if (!acceptedPrivacy) {
      Swal.fire({
        title: "Confidentialité",
        text: "Veuillez accepter la politique de confidentialité pour envoyer le formulaire.",
        icon: "warning",
      });
      return;
    }

    // Get EmailJS environment variables
    const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      Swal.fire({
        title: "Erreur de configuration",
        text: "Les variables d'environnement EmailJS ne sont pas définies.",
        icon: "error",
      });
      return;
    }

    // Send form data via EmailJS
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(() => {
        Swal.fire({
          title: "Succès!",
          text: "Votre message a bien été envoyé.",
          icon: "success",
        });
        form.reset();
      })
      .catch(() => {
        Swal.fire({
          title: "Erreur!",
          text: "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer plus tard.",
          icon: "error",
        });
      });
  });
});
