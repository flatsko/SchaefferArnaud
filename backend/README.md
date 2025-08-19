# Backend API - Arnaud Schaeffer

API backend complète pour la plateforme d'Arnaud Schaeffer avec système d'authentification, abonnements, commandes, parrainage et support client.

## 🚀 Fonctionnalités

### 🔐 Authentification
- Inscription/Connexion avec JWT
- Gestion des sessions
- Réinitialisation de mot de passe
- Rôles utilisateur (USER, ADMIN)

### 💳 Abonnements
- Plans d'abonnement flexibles (mensuel, annuel, à vie)
- Intégration Stripe pour les paiements
- Gestion automatique des renouvellements
- Webhooks Stripe pour la synchronisation

### 🛒 E-commerce
- Catalogue de produits
- Gestion des commandes
- Paiements sécurisés via Stripe
- Suivi des statuts de commande

### 🎯 Système de Parrainage
- Codes de parrainage uniques
- Commissions automatiques
- Suivi des performances
- Notifications par email

### 🎫 Support Client
- Système de tickets
- Messages en temps réel
- Assignation aux administrateurs
- Priorités et catégories

## 🛠️ Technologies

- **Node.js** + **Express.js** - Serveur API
- **Prisma** - ORM et gestion de base de données
- **PostgreSQL** - Base de données
- **Stripe** - Paiements et abonnements
- **JWT** - Authentification
- **Nodemailer** - Envoi d'emails
- **bcryptjs** - Hachage des mots de passe

## 📦 Installation

### Prérequis
- Node.js 18+
- PostgreSQL
- Compte Stripe

### Configuration

1. **Cloner et installer les dépendances**
```bash
cd backend
npm install
```

2. **Configuration de l'environnement**
```bash
cp .env.example .env
```

3. **Configurer les variables d'environnement**
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/arnaud_schaeffer"

# JWT
JWT_SECRET="votre-secret-jwt-super-securise"
JWT_EXPIRES_IN="7d"

# Serveur
PORT=5000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-app"
EMAIL_FROM="Arnaud Schaeffer <noreply@arnaudschaeffer.com>"

# Frontend
FRONTEND_URL="http://localhost:3000"

# Parrainage
REFERRAL_COMMISSION_RATE=0.1
REFERRAL_BASE_COMMISSION=10
REFERRAL_CODE_LENGTH=8
```

4. **Initialiser la base de données**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Peupler avec des données de test**
```bash
node scripts/seed.js
```

6. **Démarrer le serveur**
```bash
# Développement
npm run dev

# Production
npm start
```

## 📚 API Documentation

### 🔐 Authentification

#### POST `/api/auth/register`
Inscription d'un nouvel utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "referralCode": "ABC12345" // optionnel
}
```

#### POST `/api/auth/login`
Connexion utilisateur
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Obtenir le profil utilisateur actuel (authentifié)

#### POST `/api/auth/logout`
Déconnexion (authentifié)

### 👥 Utilisateurs

#### GET `/api/users`
Liste des utilisateurs (Admin uniquement)

#### GET `/api/users/:id`
Détails d'un utilisateur (propriétaire ou admin)

#### PUT `/api/users/:id`
Mettre à jour le profil utilisateur

### 📋 Abonnements

#### GET `/api/subscriptions/plans`
Liste des plans d'abonnement disponibles

#### POST `/api/subscriptions/subscribe`
S'abonner à un plan (authentifié)
```json
{
  "planId": "plan-id",
  "paymentMethodId": "pm_xxx" // optionnel
}
```

#### GET `/api/subscriptions/my-subscriptions`
Mes abonnements (authentifié)

### 🛒 Commandes

#### GET `/api/orders/products`
Liste des produits disponibles

#### POST `/api/orders`
Créer une nouvelle commande (authentifié)
```json
{
  "items": [
    {
      "productId": "product-id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "123 Rue Example",
    "city": "Paris",
    "postalCode": "75001",
    "country": "France"
  },
  "paymentMethodId": "pm_xxx"
}
```

#### GET `/api/orders/my-orders`
Mes commandes (authentifié)

### 🎯 Parrainage

#### GET `/api/referrals/my-referrals`
Mes parrainages (authentifié)

#### POST `/api/referrals/create-code`
Créer un code de parrainage (authentifié)

#### GET `/api/referrals/verify/:code`
Vérifier la validité d'un code de parrainage

### 🎫 Support

#### POST `/api/tickets`
Créer un ticket de support (authentifié)
```json
{
  "subject": "Problème avec...",
  "description": "Description détaillée",
  "priority": "MEDIUM", // LOW, MEDIUM, HIGH
  "category": "Technique" // optionnel
}
```

#### GET `/api/tickets/my-tickets`
Mes tickets (authentifié)

#### POST `/api/tickets/:id/messages`
Ajouter un message à un ticket (authentifié)
```json
{
  "content": "Mon message",
  "attachments": [] // optionnel
}
```

## 🔧 Scripts Disponibles

```bash
# Développement avec rechargement automatique
npm run dev

# Production
npm start

# Générer le client Prisma
npm run db:generate

# Appliquer les migrations
npm run db:migrate

# Réinitialiser la base de données
npm run db:reset

# Peupler avec des données de test
npm run db:seed

# Voir la base de données (Prisma Studio)
npm run db:studio
```

## 🔒 Sécurité

- **Authentification JWT** avec sessions en base
- **Hachage bcrypt** pour les mots de passe (12 rounds)
- **Rate limiting** pour prévenir les attaques
- **Validation des données** avec Joi
- **CORS** configuré
- **Helmet** pour les en-têtes de sécurité
- **Webhooks Stripe** sécurisés par signature

## 📧 Configuration Email

Pour Gmail, créez un mot de passe d'application :
1. Activez la 2FA sur votre compte Google
2. Allez dans "Mots de passe d'application"
3. Générez un mot de passe pour "Mail"
4. Utilisez ce mot de passe dans `EMAIL_PASS`

## 🎯 Stripe Configuration

1. Créez un compte Stripe
2. Récupérez vos clés API (test et production)
3. Configurez les webhooks :
   - URL : `https://votre-domaine.com/api/webhooks/stripe`
   - Événements : `payment_intent.succeeded`, `invoice.payment_succeeded`, `customer.subscription.updated`, etc.

## 📊 Base de Données

Le schéma inclut :
- **Users** - Utilisateurs et authentification
- **Sessions** - Sessions JWT
- **Plans** - Plans d'abonnement
- **Subscriptions** - Abonnements utilisateurs
- **Products** - Catalogue produits
- **Orders** - Commandes et articles
- **Referrals** - Système de parrainage
- **Tickets** - Support client
- **TicketMessages** - Messages des tickets

## 🚀 Déploiement

### Variables d'environnement de production
```env
NODE_ENV=production
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
CORS_ORIGIN="https://votre-domaine.com"
```

### Commandes de déploiement
```bash
# Build (si nécessaire)
npm run build

# Migrations en production
npx prisma migrate deploy

# Démarrer
npm start
```

## 🐛 Debugging

- Les logs sont affichés dans la console
- Utilisez Prisma Studio pour explorer la base : `npm run db:studio`
- Vérifiez les webhooks Stripe dans le dashboard Stripe
- Testez les emails en mode développement

## 📝 Comptes de Test

Après le seeding :
- **Admin** : `admin@arnaudschaeffer.com` / `password123`
- **Client 1** : `client1@example.com` / `password123`
- **Client 2** : `client2@example.com` / `password123`
- **Client 3** : `client3@example.com` / `password123`

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.