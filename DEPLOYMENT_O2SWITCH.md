# Guide de déploiement sur o2switch

## 📁 Fichiers à déployer

Le build de production a été généré avec succès dans le dossier `dist/`. Voici les fichiers à télécharger sur votre hébergement o2switch :

```
dist/
├── 2024/
│   └── 11/
├── assets/
│   ├── index-D-P4Ed-G.js
│   ├── index-_Jpu_k2-.css
│   └── logo-DNmp4fMn.svg
├── index.html
└── vite.svg
```

## 🚀 Étapes de déploiement

### 1. Connexion à votre espace o2switch
- Connectez-vous à votre espace client o2switch
- Accédez au gestionnaire de fichiers (File Manager) ou utilisez un client FTP

### 2. Upload des fichiers
- Naviguez vers le dossier `www` ou `public_html` de votre domaine
- Téléchargez **tout le contenu** du dossier `dist/` vers ce répertoire
- Assurez-vous que le fichier `index.html` soit à la racine du dossier web

### 3. Configuration pour SPA (Single Page Application)

Pour que votre application React fonctionne correctement avec le routing, créez un fichier `.htaccess` à la racine :

```apache
RewriteEngine On
RewriteBase /

# Handle Angular and React Router
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

## ⚙️ Configuration backend (si nécessaire)

Si votre application utilise des appels API vers votre backend :

### Option 1 : Backend sur o2switch
- Déployez également votre backend Node.js sur o2switch
- Mettez à jour les URLs d'API dans votre frontend

### Option 2 : Backend externe
- Assurez-vous que votre backend accepte les requêtes CORS depuis votre domaine o2switch
- Mettez à jour la configuration CORS dans `backend/server.js` :

```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://votre-domaine.com', // Ajoutez votre domaine o2switch
  ],
  credentials: true
};
```

## 🔧 Variables d'environnement

Si votre application utilise des variables d'environnement :

1. Créez un fichier `.env.production` dans votre projet
2. Définissez les variables avec le préfixe `VITE_` :

```env
VITE_API_URL=https://votre-api.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
```

3. Rebuilder l'application :
```bash
npm run build
```

## ✅ Vérification du déploiement

1. Visitez votre site web
2. Testez la navigation entre les pages
3. Vérifiez que les assets (CSS, JS, images) se chargent correctement
4. Testez les fonctionnalités (formulaires, API calls, etc.)

## 🐛 Dépannage

### Erreur 404 sur les routes
- Vérifiez que le fichier `.htaccess` est présent et correctement configuré

### Assets non trouvés
- Vérifiez que tous les fichiers du dossier `dist/` ont été téléchargés
- Vérifiez les permissions des fichiers (644 pour les fichiers, 755 pour les dossiers)

### Problèmes CORS
- Vérifiez la configuration CORS de votre backend
- Assurez-vous que votre domaine est autorisé

## 📞 Support

En cas de problème :
1. Vérifiez les logs d'erreur dans la console du navigateur
2. Contactez le support o2switch si nécessaire
3. Consultez la documentation o2switch pour les applications SPA

---

**Note :** Ce guide suppose que vous déployez une application frontend statique. Pour un déploiement full-stack avec Node.js, des étapes supplémentaires seront nécessaires.