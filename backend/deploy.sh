#!/bin/bash

# Script de déploiement pour o2switch
# Usage: ./deploy.sh [production|staging]

set -e  # Arrêter le script en cas d'erreur

# Configuration
APP_NAME="schaefferarnaud-backend"
ENV=${1:-production}
BACKUP_DIR="./backups"
LOG_DIR="./logs"

echo "🚀 Début du déploiement en mode $ENV..."

# Créer les dossiers nécessaires
echo "📁 Création des dossiers..."
mkdir -p $BACKUP_DIR
mkdir -p $LOG_DIR
mkdir -p uploads

# Sauvegarder la base de données actuelle
echo "💾 Sauvegarde de la base de données..."
DATE=$(date +%Y%m%d_%H%M%S)
if [ -f .env ]; then
    source .env
    if [ ! -z "$DATABASE_URL" ]; then
        pg_dump $DATABASE_URL > $BACKUP_DIR/db_backup_$DATE.sql
        echo "✅ Base de données sauvegardée: $BACKUP_DIR/db_backup_$DATE.sql"
    fi
fi

# Arrêter l'application si elle tourne
echo "⏹️ Arrêt de l'application..."
pm2 stop $APP_NAME 2>/dev/null || echo "Application non démarrée"

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm ci --production

# Générer le client Prisma
echo "🔧 Génération du client Prisma..."
npx prisma generate

# Appliquer les migrations
echo "🗄️ Application des migrations..."
npx prisma migrate deploy

# Copier le fichier d'environnement approprié
echo "⚙️ Configuration de l'environnement..."
if [ "$ENV" = "production" ]; then
    if [ -f .env.production ]; then
        cp .env.production .env
        echo "✅ Fichier .env.production copié"
    else
        echo "⚠️ Fichier .env.production non trouvé"
    fi
fi

# Démarrer l'application avec PM2
echo "🚀 Démarrage de l'application..."
pm2 start ecosystem.config.js --env $ENV

# Sauvegarder la configuration PM2
pm2 save

# Afficher le statut
echo "📊 Statut de l'application:"
pm2 status $APP_NAME

echo "✅ Déploiement terminé avec succès!"
echo "📝 Logs disponibles avec: pm2 logs $APP_NAME"
echo "📊 Monitoring avec: pm2 monit"

# Nettoyer les anciennes sauvegardes (garder 7 jours)
echo "🧹 Nettoyage des anciennes sauvegardes..."
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete 2>/dev/null || true

echo "🎉 Déploiement terminé!"