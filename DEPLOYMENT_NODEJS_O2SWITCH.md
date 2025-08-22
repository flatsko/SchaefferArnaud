# Guide de déploiement Node.js sur o2switch

## 📋 Prérequis

Votre application Node.js utilise :
- **Node.js** (version 18+)
- **Express.js** avec modules ES6
- **Prisma ORM** avec PostgreSQL
- **Stripe** pour les paiements
- **Nodemailer** pour les emails
- **Brevo** pour la newsletter

## 🚀 Étapes de déploiement

### 1. Vérification de la compatibilité o2switch

⚠️ **Important** : o2switch propose différents types d'hébergement :
- **Hébergement web classique** : PHP uniquement (pas de Node.js)
- **VPS/Serveur dédié** : Node.js supporté
- **Hébergement Cloud** : Node.js supporté

**Vous devez avoir un VPS ou un serveur dédié o2switch pour déployer Node.js.**

### 2. Préparation des fichiers

#### A. Créer un fichier de production

Créez `ecosystem.config.js` pour PM2 :

```javascript
module.exports = {
  apps: [{
    name: 'schaefferarnaud-backend',
    script: 'server.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

#### B. Optimiser package.json

Ajoutez ces scripts à votre `package.json` :

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "prisma generate",
    "postinstall": "prisma generate",
    "pm2:start": "pm2 start ecosystem.config.js --env production",
    "pm2:stop": "pm2 stop schaefferarnaud-backend",
    "pm2:restart": "pm2 restart schaefferarnaud-backend",
    "pm2:logs": "pm2 logs schaefferarnaud-backend"
  }
}
```

### 3. Configuration de la base de données

#### A. PostgreSQL sur o2switch

1. **Créer une base de données PostgreSQL** via le panel o2switch
2. **Noter les informations de connexion** :
   - Host : `postgresql-xxx.o2switch.net`
   - Port : `5432`
   - Database : `votre_db`
   - Username : `votre_user`
   - Password : `votre_password`

#### B. Configuration Prisma

Mettez à jour votre `DATABASE_URL` dans `.env` :

```env
DATABASE_URL="postgresql://username:password@postgresql-xxx.o2switch.net:5432/database_name?schema=public"
```

### 4. Variables d'environnement

Créez un fichier `.env.production` :

```env
# Database
DATABASE_URL="postgresql://username:password@postgresql-xxx.o2switch.net:5432/database_name?schema=public"

# JWT
JWT_SECRET="votre-secret-jwt-super-securise-pour-production"
JWT_EXPIRES_IN="7d"

# Server
PORT=3000
NODE_ENV="production"
CORS_ORIGIN="https://votre-domaine.com"

# Stripe
STRIPE_SECRET_KEY="sk_live_votre_cle_stripe_live"
STRIPE_PUBLISHABLE_KEY="pk_live_votre_cle_stripe_live"
STRIPE_WEBHOOK_SECRET="whsec_votre_webhook_secret_live"

# Email (Nodemailer)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-app"
EMAIL_FROM="noreply@votre-domaine.com"

# Brevo (Newsletter)
BREVO_API_KEY="votre-cle-api-brevo"
BREVO_NEWSLETTER_LIST_ID="votre-id-liste-brevo"

# File Upload
UPLOAD_MAX_SIZE=5242880
UPLOAD_PATH="./uploads"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Referral
REFERRAL_COMMISSION_RATE=0.1
REFERRAL_CODE_LENGTH=8
```

### 5. Déploiement sur le serveur

#### A. Connexion SSH

```bash
ssh votre-user@votre-serveur.o2switch.net
```

#### B. Installation de Node.js

```bash
# Installer Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Vérifier l'installation
node --version
npm --version
```

#### C. Installation de PM2

```bash
sudo npm install -g pm2
```

#### D. Cloner/Uploader votre projet

**Option 1 : Git (recommandé)**
```bash
git clone https://github.com/votre-username/votre-repo.git
cd votre-repo/backend
```

**Option 2 : Upload FTP/SFTP**
- Uploadez tous les fichiers du dossier `backend/` vers `/home/votre-user/backend/`

#### E. Installation des dépendances

```bash
cd /home/votre-user/backend
npm install --production
```

#### F. Configuration de la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# (Optionnel) Seeder la base
npm run seed
```

#### G. Démarrage avec PM2

```bash
# Copier le fichier d'environnement
cp .env.production .env

# Démarrer l'application
pm2 start ecosystem.config.js --env production

# Sauvegarder la configuration PM2
pm2 save
pm2 startup
```

### 6. Configuration du proxy inverse (Nginx)

Créez `/etc/nginx/sites-available/votre-domaine` :

```nginx
server {
    listen 80;
    server_name api.votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activez le site :
```bash
sudo ln -s /etc/nginx/sites-available/votre-domaine /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 7. SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d api.votre-domaine.com
```

### 8. Configuration du firewall

```bash
# Autoriser les ports nécessaires
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

## 🔧 Gestion de l'application

### Commandes PM2 utiles

```bash
# Voir le statut
pm2 status

# Voir les logs
pm2 logs schaefferarnaud-backend

# Redémarrer
pm2 restart schaefferarnaud-backend

# Arrêter
pm2 stop schaefferarnaud-backend

# Monitoring
pm2 monit
```

### Mise à jour de l'application

```bash
# Aller dans le dossier du projet
cd /home/votre-user/backend

# Récupérer les dernières modifications
git pull origin main

# Installer les nouvelles dépendances
npm install --production

# Appliquer les migrations
npx prisma migrate deploy

# Redémarrer l'application
pm2 restart schaefferarnaud-backend
```

## 🔍 Dépannage

### Vérifier les logs

```bash
# Logs de l'application
pm2 logs schaefferarnaud-backend

# Logs Nginx
sudo tail -f /var/log/nginx/error.log

# Logs système
sudo journalctl -u nginx
```

### Problèmes courants

1. **Port déjà utilisé** :
   ```bash
   sudo lsof -i :3000
   sudo kill -9 PID
   ```

2. **Problème de permissions** :
   ```bash
   sudo chown -R votre-user:votre-user /home/votre-user/backend
   ```

3. **Base de données inaccessible** :
   - Vérifiez les credentials dans `.env`
   - Testez la connexion : `npx prisma db pull`

## 📊 Monitoring et maintenance

### Surveillance des performances

```bash
# Installer htop pour le monitoring
sudo apt install htop

# Surveiller les ressources
htop

# Surveiller l'espace disque
df -h
```

### Sauvegardes automatiques

Créez un script de sauvegarde `/home/votre-user/backup.sh` :

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/votre-user/backups"

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
pg_dump $DATABASE_URL > $BACKUP_DIR/db_backup_$DATE.sql

# Sauvegarder les fichiers uploadés
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz /home/votre-user/backend/uploads

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

Ajoutez à crontab :
```bash
crontab -e
# Ajouter cette ligne pour une sauvegarde quotidienne à 2h du matin
0 2 * * * /home/votre-user/backup.sh
```

## ✅ Checklist finale

- [ ] Node.js installé et fonctionnel
- [ ] Base de données PostgreSQL configurée
- [ ] Variables d'environnement définies
- [ ] Migrations Prisma appliquées
- [ ] Application démarrée avec PM2
- [ ] Nginx configuré comme proxy inverse
- [ ] SSL activé avec Let's Encrypt
- [ ] Firewall configuré
- [ ] Monitoring en place
- [ ] Sauvegardes automatiques configurées

Votre application Node.js est maintenant déployée et prête à fonctionner sur o2switch ! 🎉