# Configuration du Backend

## 🚀 Démarrage rapide

### 1. Installation des dépendances
```bash
cd backend
npm install
```

### 2. Configuration de l'environnement
```bash
# Copier le fichier d'exemple
cp .env.example .env

# Éditer le fichier .env avec vos paramètres
```

### 3. Configuration PostgreSQL

#### Option A: PostgreSQL local
1. Installer PostgreSQL sur votre machine
2. Créer une base de données :
```sql
CREATE DATABASE schaeffer_arnaud;
CREATE USER your_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE schaeffer_arnaud TO your_user;
```

#### Option B: PostgreSQL avec Docker
```bash
# Démarrer PostgreSQL avec Docker
docker run --name postgres-dev \
  -e POSTGRES_DB=schaeffer_arnaud \
  -e POSTGRES_USER=your_user \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Configuration du fichier .env
```env
# Base de données
DATABASE_URL="postgresql://your_user:your_password@localhost:5432/schaeffer_arnaud"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"

# Email (optionnel pour le développement)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASS="your-app-password"

# Stripe (optionnel)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Environnement
NODE_ENV="development"
PORT=5000
```

### 5. Initialisation de la base de données
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# (Optionnel) Ajouter des données de test
npm run seed
```

### 6. Démarrage du serveur
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## 🔧 Résolution des problèmes

### Erreur "ERR_CONNECTION_REFUSED"
- ✅ Vérifiez que le backend est démarré sur le port 5000
- ✅ Vérifiez que PostgreSQL est en cours d'exécution
- ✅ Vérifiez la configuration de votre fichier .env

### Erreur de base de données
```bash
# Réinitialiser la base de données
npx prisma db push --force-reset
npx prisma generate
npm run seed
```

### Vérifier l'état du serveur
```bash
# Test de santé de l'API
curl http://localhost:5000/api/health

# Ou dans le navigateur
http://localhost:5000/api/health
```

## 📝 Scripts disponibles

```bash
npm run dev          # Démarrage en mode développement
npm start            # Démarrage en mode production
npm run seed         # Ajouter des données de test
npm run db:reset     # Réinitialiser la base de données
npm run db:studio    # Ouvrir Prisma Studio
```

## 🌐 URLs importantes

- **API Backend**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health
- **Prisma Studio**: http://localhost:5555 (après `npm run db:studio`)
- **Frontend**: http://localhost:5173

## 📚 Documentation API

Une fois le serveur démarré, la documentation de l'API sera disponible à :
- http://localhost:5000/api/docs (si configuré)

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs du serveur backend
2. Vérifiez la console du navigateur
3. Consultez ce guide de dépannage
4. Vérifiez que tous les services requis sont démarrés