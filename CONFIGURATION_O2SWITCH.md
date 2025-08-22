# Configuration de l'application Node.js sur o2switch

## 📋 Prérequis

### 1. Compte o2switch avec accès SSH
- Hébergement mutualisé ou VPS
- Accès SSH activé
- Node.js installé (version 18+ recommandée)
- PostgreSQL ou MySQL disponible

### 2. Domaine configuré
- Nom de domaine pointant vers o2switch
- Certificat SSL configuré

## 🚀 Étapes de déploiement

### Étape 1: Préparation des fichiers

1. **Créer l'archive de déploiement**
```bash
# Dans le dossier backend
tar -czf backend-deploy.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=logs \
  --exclude=uploads \
  .
```

2. **Fichiers inclus dans le déploiement**
- `server.js` (point d'entrée)
- `package.json` et `package-lock.json`
- Dossier `routes/`
- Dossier `utils/`
- Dossier `prisma/`
- `ecosystem.config.js` (configuration PM2)
- `.env.production` (à renommer en `.env`)
- `deploy.sh` (script de déploiement)
- `nginx.conf` (configuration Nginx)

### Étape 2: Configuration de la base de données

1. **Créer la base de données PostgreSQL**
```sql
-- Via l'interface o2switch ou phpPgAdmin
CREATE DATABASE schaefferarnaud_db;
CREATE USER schaefferarnaud_user WITH PASSWORD 'mot_de_passe_securise';
GRANT ALL PRIVILEGES ON DATABASE schaefferarnaud_db TO schaefferarnaud_user;
```

2. **Noter les informations de connexion**
- Host: `postgresql-xxx.o2switch.net`
- Port: `5432`
- Database: `schaefferarnaud_db`
- Username: `schaefferarnaud_user`
- Password: `mot_de_passe_securise`

### Étape 3: Upload et installation

1. **Se connecter en SSH**
```bash
ssh votre-utilisateur@votre-serveur.o2switch.net
```

2. **Créer la structure de dossiers**
```bash
mkdir -p ~/apps/schaefferarnaud-backend
cd ~/apps/schaefferarnaud-backend
```

3. **Uploader et extraire l'archive**
```bash
# Via SCP depuis votre machine locale
scp backend-deploy.tar.gz votre-utilisateur@votre-serveur.o2switch.net:~/apps/schaefferarnaud-backend/

# Sur le serveur
tar -xzf backend-deploy.tar.gz
rm backend-deploy.tar.gz
```

### Étape 4: Configuration de l'environnement

1. **Configurer les variables d'environnement**
```bash
# Copier et éditer le fichier d'environnement
cp .env.production .env
nano .env
```

2. **Adapter les valeurs dans `.env`**
```env
# Database (remplacer par vos vraies valeurs)
DATABASE_URL="postgresql://schaefferarnaud_user:mot_de_passe_securise@postgresql-xxx.o2switch.net:5432/schaefferarnaud_db?schema=public"

# JWT
JWT_SECRET="votre-secret-jwt-super-securise-changez-moi"

# Server
PORT=3000
NODE_ENV="production"
CORS_ORIGIN="https://votre-domaine.com"

# Stripe (clés de production)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
EMAIL_HOST="smtp.gmail.com"
EMAIL_USER="votre-email@gmail.com"
EMAIL_PASS="votre-mot-de-passe-app"

# Brevo
BREVO_API_KEY="votre-cle-brevo"
BREVO_NEWSLETTER_LIST_ID="votre-liste-id"
```

### Étape 5: Installation et démarrage

1. **Installer Node.js et PM2 (si nécessaire)**
```bash
# Vérifier la version de Node.js
node --version
npm --version

# Installer PM2 globalement
npm install -g pm2
```

2. **Installer les dépendances**
```bash
npm ci --production
```

3. **Configurer Prisma**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma migrate deploy

# (Optionnel) Seeder la base de données
npm run seed
```

4. **Démarrer l'application**
```bash
# Rendre le script exécutable
chmod +x deploy.sh

# Lancer le déploiement
./deploy.sh production

# Ou manuellement avec PM2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

### Étape 6: Configuration Nginx (si VPS)

1. **Copier la configuration Nginx**
```bash
sudo cp nginx.conf /etc/nginx/sites-available/schaefferarnaud
sudo ln -s /etc/nginx/sites-available/schaefferarnaud /etc/nginx/sites-enabled/
```

2. **Adapter la configuration**
```bash
sudo nano /etc/nginx/sites-available/schaefferarnaud
# Remplacer "votre-domaine.com" par votre vrai domaine
```

3. **Tester et recharger Nginx**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

### Étape 7: Configuration SSL avec Let's Encrypt

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Tester le renouvellement automatique
sudo certbot renew --dry-run
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
# Arrêter l'application
pm2 stop schaefferarnaud-backend

# Sauvegarder la base de données
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql

# Mettre à jour le code
# (uploader les nouveaux fichiers)

# Installer les nouvelles dépendances
npm ci --production

# Appliquer les migrations
npx prisma migrate deploy

# Redémarrer
pm2 start schaefferarnaud-backend
```

## 🔍 Dépannage

### Vérifier les logs
```bash
# Logs de l'application
pm2 logs schaefferarnaud-backend

# Logs Nginx (si VPS)
sudo tail -f /var/log/nginx/schaefferarnaud_error.log

# Logs système
journalctl -u nginx -f
```

### Problèmes courants

1. **Port déjà utilisé**
```bash
# Trouver le processus utilisant le port
lsof -i :3000
# Tuer le processus si nécessaire
kill -9 PID
```

2. **Problème de base de données**
```bash
# Tester la connexion
psql $DATABASE_URL
# Vérifier les migrations
npx prisma migrate status
```

3. **Problème de permissions**
```bash
# Ajuster les permissions
chmod -R 755 ~/apps/schaefferarnaud-backend
chown -R $USER:$USER ~/apps/schaefferarnaud-backend
```

## 📊 Monitoring et maintenance

### Surveillance automatique
```bash
# Configurer PM2 pour redémarrer automatiquement
pm2 startup
pm2 save

# Configurer la rotation des logs
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Sauvegardes automatiques
```bash
# Créer un script de sauvegarde
echo '#!/bin/bash
pg_dump $DATABASE_URL > ~/backups/db_$(date +%Y%m%d_%H%M%S).sql
find ~/backups -name "*.sql" -mtime +7 -delete' > ~/backup.sh
chmod +x ~/backup.sh

# Ajouter au crontab
crontab -e
# Ajouter: 0 2 * * * ~/backup.sh
```

## ✅ Checklist finale

- [ ] Base de données créée et accessible
- [ ] Variables d'environnement configurées
- [ ] Dépendances installées
- [ ] Migrations Prisma appliquées
- [ ] Application démarrée avec PM2
- [ ] Nginx configuré (si VPS)
- [ ] SSL configuré
- [ ] Logs accessibles
- [ ] Sauvegardes configurées
- [ ] Tests de fonctionnement effectués

## 🆘 Support

En cas de problème:
1. Vérifiez les logs PM2 et Nginx
2. Testez la connexion à la base de données
3. Vérifiez les variables d'environnement
4. Contactez le support o2switch si nécessaire

---

**Note**: Ce guide suppose une configuration standard o2switch. Adaptez selon votre configuration spécifique.