import emailjs from "@emailjs/browser";

// Configuration EmailJS
const EMAIL_SERVICE_ID = "service_wh3o39o"; // À remplacer par votre Service ID
const EMAIL_TEMPLATE_ID = "template_h06orfo"; // À remplacer par votre Template ID
const EMAIL_PUBLIC_KEY = "Tc8SmnLIskEz25g1g"; // À remplacer par votre Public Key

// Initialiser EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || "Non spécifiée",
      project_type: formData.projectType,
      budget: formData.budget || "Non spécifié",
      timeline: formData.timeline || "Non spécifié",
      message: formData.message,
      to_email: "arnaud@arnaud-schaeffer.com",
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_ID,
      templateParams
    );

    console.log("Email envoyé avec succès:", response);
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    return { success: false, message: "Erreur lors de l'envoi de l'email" };
  }
};

// Alternative: Utiliser mailto: pour ouvrir le client email par défaut
export const openEmailClient = (formData) => {
  const subject = encodeURIComponent(
    `Nouveau projet: ${formData.projectType || "Contact"}`
  );
  const body = encodeURIComponent(
    `Bonjour Arnaud,\n\n` +
      `Je vous contacte concernant un projet.\n\n` +
      `Informations de contact:\n` +
      `- Nom: ${formData.name}\n` +
      `- Email: ${formData.email}\n` +
      `- Entreprise: ${formData.company || "Non spécifiée"}\n\n` +
      `Détails du projet:\n` +
      `- Type: ${formData.projectType || "Non spécifié"}\n` +
      `- Budget: ${formData.budget || "Non spécifié"}\n` +
      `- Délai: ${formData.timeline || "Non spécifié"}\n\n` +
      `Message:\n${formData.message}\n\n` +
      `Cordialement,\n${formData.name}`
  );

  const mailtoLink = `mailto:arnaud@arnaud-schaeffer.com?subject=${subject}&body=${body}`;
  window.open(mailtoLink);
};
