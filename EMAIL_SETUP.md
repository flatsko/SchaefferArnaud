# Configuration du formulaire de contact

Le formulaire de contact est configuré pour envoyer des emails directement à `arnaud@arnaud-schaeffer.com` en utilisant EmailJS comme service principal et mailto comme fallback.

## Option 1: Configuration EmailJS (Recommandée)

### Étapes de configuration:

1. **Créer un compte EmailJS**
   - Aller sur [https://www.emailjs.com/](https://www.emailjs.com/)
   - Créer un compte gratuit

2. **Configurer un service email**
   - Dans le dashboard EmailJS, aller dans "Email Services"
   - Ajouter un service (Gmail, Outlook, etc.)
   - Suivre les instructions pour connecter votre compte email

3. **Créer un template d'email**
   - Aller dans "Email Templates"
   - Créer un nouveau template avec le contenu suivant:

```
Sujet: Nouveau contact depuis le site web - {{project_type}}

Corps du message:
Nouveau message de contact reçu:

Informations de contact:
- Nom: {{from_name}}
- Email: {{from_email}}
- Entreprise: {{company}}

Détails du projet:
- Type de projet: {{project_type}}
- Budget: {{budget}}
- Délai souhaité: {{timeline}}

Message:
{{message}}

---
Ce message a été envoyé depuis le formulaire de contact du site web.
```

4. **Récupérer les clés de configuration**
   - Service ID: Dans "Email Services"
   - Template ID: Dans "Email Templates"
   - Public Key: Dans "Account" > "General"

5. **Mettre à jour le fichier de configuration**
   - Ouvrir `src/services/emailService.js`
   - Remplacer les valeurs suivantes:
     ```javascript
     const EMAIL_SERVICE_ID = 'votre_service_id';
     const EMAIL_TEMPLATE_ID = 'votre_template_id';
     const EMAIL_PUBLIC_KEY = 'votre_public_key';
     ```

## Option 2: Utilisation de mailto (Actuelle)

Si EmailJS n'est pas configuré, le formulaire utilise automatiquement la fonction `mailto:` qui:
- Ouvre le client email par défaut de l'utilisateur
- Pré-remplit l'email avec toutes les informations du formulaire
- Envoie l'email à `arnaud@arnaud-schaeffer.com`

## Fonctionnement du formulaire

1. **Tentative EmailJS**: Le formulaire essaie d'abord d'envoyer via EmailJS
2. **Fallback mailto**: Si EmailJS échoue ou n'est pas configuré, utilise mailto
3. **Gestion d'erreurs**: Affiche des messages informatifs à l'utilisateur
4. **Validation**: Vérifie que les champs obligatoires sont remplis

## Avantages de chaque méthode

### EmailJS:
- ✅ Envoi automatique sans intervention de l'utilisateur
- ✅ Emails reçus directement dans la boîte de réception
- ✅ Tracking et statistiques disponibles
- ❌ Nécessite une configuration initiale

### Mailto:
- ✅ Fonctionne immédiatement sans configuration
- ✅ Utilise le client email préféré de l'utilisateur
- ❌ Nécessite une action de l'utilisateur pour envoyer
- ❌ Peut ne pas fonctionner si aucun client email n'est configuré

## Sécurité

- Les clés EmailJS sont publiques par design (côté client)
- Le domaine doit être autorisé dans les paramètres EmailJS
- Aucune information sensible n'est exposée
- Rate limiting automatique par EmailJS

## Test du formulaire

1. Remplir le formulaire de contact
2. Cliquer sur "Envoyer le message"
3. Vérifier la réception de l'email à `arnaud@arnaud-schaeffer.com`

## Dépannage

- **EmailJS ne fonctionne pas**: Vérifier les clés de configuration
- **Mailto ne s'ouvre pas**: Vérifier qu'un client email est installé
- **Erreurs de CORS**: Ajouter le domaine dans les paramètres EmailJS