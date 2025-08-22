import nodemailer from 'nodemailer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Fonction générique d'envoi d'email
export const sendEmail = async (to, subject, html, text = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`📧 Email envoyé à ${to}: ${subject}`);
    return result;
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
    throw error;
  }
};

// Email de bienvenue
export const sendWelcomeEmail = async (user) => {
  const subject = 'Bienvenue chez Arnaud Schaeffer !';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Bienvenue ${user.firstName} !</h1>
      <p>Merci de vous être inscrit sur notre plateforme.</p>
      <p>Votre compte a été créé avec succès. Vous pouvez maintenant accéder à votre espace membre.</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Prochaines étapes :</h3>
        <ul>
          <li>Complétez votre profil</li>
          <li>Explorez nos services</li>
          <li>Contactez-nous pour vos projets</li>
        </ul>
      </div>
      <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
      <p>Cordialement,<br>L'équipe Arnaud Schaeffer</p>
    </div>
  `;
  
  return sendEmail(user.email, subject, html);
};

// Email de réinitialisation de mot de passe
export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  const subject = 'Réinitialisation de votre mot de passe';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Réinitialisation de mot de passe</h1>
      <p>Bonjour ${user.firstName},</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #8B5CF6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Réinitialiser mon mot de passe</a>
      </div>
      <p>Ce lien est valide pendant 1 heure.</p>
      <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
      <p>Cordialement,<br>L'équipe Arnaud Schaeffer</p>
    </div>
  `;
  
  return sendEmail(user.email, subject, html);
};

// Email de confirmation de commande
export const sendOrderConfirmationEmail = async (user, order) => {
  const subject = `Confirmation de commande #${order.id.slice(-8)}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Commande confirmée !</h1>
      <p>Bonjour ${user.firstName},</p>
      <p>Votre commande a été confirmée et est en cours de traitement.</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Détails de la commande :</h3>
        <p><strong>Numéro :</strong> #${order.id.slice(-8)}</p>
        <p><strong>Total :</strong> ${order.totalAmount}€</p>
        <p><strong>Date :</strong> ${new Date(order.createdAt).toLocaleDateString('fr-FR')}</p>
      </div>
      <p>Vous recevrez un email de confirmation une fois votre commande expédiée.</p>
      <p>Cordialement,<br>L'équipe Arnaud Schaeffer</p>
    </div>
  `;
  
  return sendEmail(user.email, subject, html);
};

// Email de notification de ticket
export const sendTicketNotificationEmail = async (user, ticket, isNewTicket = true) => {
  const subject = isNewTicket 
    ? `Nouveau ticket de support #${ticket.id.slice(-8)}`
    : `Mise à jour du ticket #${ticket.id.slice(-8)}`;
    
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">${isNewTicket ? 'Nouveau ticket créé' : 'Ticket mis à jour'}</h1>
      <p>Bonjour ${user.firstName},</p>
      <p>${isNewTicket ? 'Votre ticket de support a été créé.' : 'Votre ticket de support a été mis à jour.'}</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Détails du ticket :</h3>
        <p><strong>Numéro :</strong> #${ticket.id.slice(-8)}</p>
        <p><strong>Sujet :</strong> ${ticket.subject}</p>
        <p><strong>Statut :</strong> ${ticket.status}</p>
        <p><strong>Priorité :</strong> ${ticket.priority}</p>
      </div>
      <p>Nous vous répondrons dans les plus brefs délais.</p>
      <p>Cordialement,<br>L'équipe Support Arnaud Schaeffer</p>
    </div>
  `;
  
  return sendEmail(user.email, subject, html);
};

// Email de parrainage réussi
export const sendReferralSuccessEmail = async (referrer, referred, commission) => {
  const subject = 'Félicitations ! Votre parrainage a été validé';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Parrainage réussi ! 🎉</h1>
      <p>Bonjour ${referrer.firstName},</p>
      <p>Félicitations ! ${referred.firstName} ${referred.lastName} s'est inscrit grâce à votre code de parrainage.</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>Votre commission :</h3>
        <p style="font-size: 24px; color: #8B5CF6; font-weight: bold;">${commission}€</p>
        <p>Cette commission sera créditée sur votre compte.</p>
      </div>
      <p>Continuez à partager votre code de parrainage pour gagner plus de commissions !</p>
      <p>Cordialement,<br>L'équipe Arnaud Schaeffer</p>
    </div>
  `;
  
  return sendEmail(referrer.email, subject, html);
};

// Configuration Brevo
const BREVO_API_URL = 'https://api.brevo.com/v3';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

// Fonction pour ajouter un contact à Brevo
export const subscribeToNewsletter = async (email) => {
  if (!BREVO_API_KEY) {
    console.warn('⚠️ BREVO_API_KEY non configurée, inscription newsletter ignorée');
    return;
  }

  try {
    const response = await axios.post(
      `${BREVO_API_URL}/contacts`,
      {
        email,
        listIds: [parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '1')],
        attributes: {
          FIRSTNAME: '',
          LASTNAME: '',
          SOURCE: 'Website Newsletter'
        },
        updateEnabled: true
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'api-key': BREVO_API_KEY
        }
      }
    );

    console.log(`📧 Contact ajouté à Brevo: ${email}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.code === 'duplicate_parameter') {
      console.log(`📧 Contact déjà existant dans Brevo: ${email}`);
      return;
    }
    console.error('❌ Erreur Brevo:', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour supprimer un contact de Brevo
export const unsubscribeFromNewsletter = async (email) => {
  if (!BREVO_API_KEY) {
    console.warn('⚠️ BREVO_API_KEY non configurée, désabonnement newsletter ignoré');
    return;
  }

  try {
    await axios.delete(
      `${BREVO_API_URL}/contacts/${encodeURIComponent(email)}`,
      {
        headers: {
          'Accept': 'application/json',
          'api-key': BREVO_API_KEY
        }
      }
    );

    console.log(`📧 Contact supprimé de Brevo: ${email}`);
  } catch (error) {
    if (error.response?.status === 404) {
      console.log(`📧 Contact non trouvé dans Brevo: ${email}`);
      return;
    }
    console.error('❌ Erreur Brevo:', error.response?.data || error.message);
    throw error;
  }
};

// Fonction pour envoyer un email de bienvenue newsletter
export const sendNewsletterWelcomeEmail = async (email) => {
  const subject = 'Bienvenue dans notre newsletter ! 📰';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #8B5CF6;">Bienvenue dans notre newsletter ! 📰</h1>
      <p>Merci de vous être abonné(e) à notre newsletter !</p>
      <p>Vous recevrez désormais nos derniers articles sur :</p>
      <div style="background-color: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <ul>
          <li>🚀 Les tendances du développement web</li>
          <li>🔍 Les techniques de SEO et référencement</li>
          <li>💡 Conseils et astuces pour entrepreneurs</li>
          <li>📈 Stratégies digitales efficaces</li>
        </ul>
      </div>
      <p>Restez connecté pour ne rien manquer de nos contenus exclusifs !</p>
      <p>Cordialement,<br>Arnaud Schaeffer</p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #E5E7EB;">
      <p style="font-size: 12px; color: #6B7280;">
        Vous recevez cet email car vous vous êtes abonné(e) à notre newsletter.<br>
        <a href="${process.env.FRONTEND_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color: #8B5CF6;">Se désabonner</a>
      </p>
    </div>
  `;
  
  return sendEmail(email, subject, html);
};