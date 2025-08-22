# Checklist Post-Déploiement o2switch

## ✅ Vérifications Backend (API)

### 1. Statut de l'application
```bash
# Vérifier que PM2 fonctionne
pm2 status
# Doit afficher "schaefferarnaud-backend" en statut "online"

# Vérifier les logs
pm2 logs schaefferarnaud-backend --lines 50
# Ne doit pas contenir d'erreurs critiques
```

### 2. Connectivité base de données
```bash
# Tester la connexion Prisma
cd ~/apps/schaefferarnaud-backend
npx prisma db pull
# Doit se connecter sans erreur

# Vérifier les tables
npx prisma studio
# Ou via psql
psql $DATABASE_URL -c "\dt"
```

### 3. Endpoints API
```bash
# Test de santé (si implémenté)
curl http://localhost:3000/api/health

# Test d'authentification
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'

# Test newsletter
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### 4. Variables d'environnement
```bash
# Vérifier que toutes les variables sont définies
cd ~/apps/schaefferarnaud-backend
node -e "require('dotenv').config(); console.log('DATABASE_URL:', !!process.env.DATABASE_URL); console.log('JWT_SECRET:', !!process.env.JWT_SECRET); console.log('STRIPE_SECRET_KEY:', !!process.env.STRIPE_SECRET_KEY);"
```

## ✅ Vérifications Frontend

### 1. Accessibilité du site
- [ ] Site accessible via https://votre-domaine.com
- [ ] Redirection HTTP vers HTTPS fonctionne
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Pas d'erreurs 404 sur les pages principales

### 2. Fonctionnalités principales
- [ ] Page d'accueil se charge correctement
- [ ] Navigation entre les pages fonctionne
- [ ] Formulaires (contact, newsletter) s'affichent
- [ ] Images et assets se chargent
- [ ] Responsive design fonctionne (mobile/desktop)

### 3. Intégrations
- [ ] Formulaire newsletter se connecte à l'API
- [ ] Stripe (si utilisé) se charge correctement
- [ ] EmailJS (si utilisé) fonctionne
- [ ] Pas d'erreurs dans la console navigateur

## ✅ Vérifications Infrastructure

### 1. Nginx (si VPS)
```bash
# Vérifier la configuration
sudo nginx -t

# Vérifier le statut
sudo systemctl status nginx

# Vérifier les logs
sudo tail -f /var/log/nginx/schaefferarnaud_error.log
```

### 2. SSL/TLS
```bash
# Tester le certificat
ssl-cert-check -c /etc/letsencrypt/live/votre-domaine.com/fullchain.pem

# Ou via openssl
openssl x509 -in /etc/letsencrypt/live/votre-domaine.com/fullchain.pem -text -noout
```

### 3. Firewall et sécurité
```bash
# Vérifier les ports ouverts
sudo ufw status

# Tester la connectivité
nmap -p 80,443 votre-domaine.com
```

## ✅ Tests fonctionnels

### 1. Parcours utilisateur complet
1. **Inscription**:
   - [ ] Créer un compte utilisateur
   - [ ] Recevoir l'email de confirmation (si implémenté)
   - [ ] Se connecter avec les identifiants

2. **Navigation**:
   - [ ] Parcourir toutes les pages principales
   - [ ] Tester les liens internes
   - [ ] Vérifier le responsive

3. **Formulaires**:
   - [ ] Soumettre le formulaire de contact
   - [ ] S'inscrire à la newsletter
   - [ ] Tester la validation des champs

### 2. Performance
```bash
# Test de charge basique
ab -n 100 -c 10 https://votre-domaine.com/

# Ou avec curl
for i in {1..10}; do
  time curl -s https://votre-domaine.com/ > /dev/null
done
```

### 3. Monitoring
```bash
# Vérifier l'utilisation des ressources
top
htop
df -h
free -h

# Logs système
journalctl -f
```

## 🔧 Résolution de problèmes courants

### Backend ne démarre pas
```bash
# Vérifier les logs détaillés
pm2 logs schaefferarnaud-backend --err

# Redémarrer l'application
pm2 restart schaefferarnaud-backend

# Vérifier la configuration
node -c server.js
```

### Erreurs de base de données
```bash
# Réappliquer les migrations
npx prisma migrate deploy

# Régénérer le client
npx prisma generate

# Tester la connexion
psql $DATABASE_URL -c "SELECT version();"
```

### Problèmes SSL
```bash
# Renouveler le certificat
sudo certbot renew

# Vérifier la configuration Nginx
sudo nginx -t
sudo systemctl reload nginx
```

### Frontend ne se charge pas
1. Vérifier les fichiers dans le dossier web
2. Contrôler la configuration `.htaccess`
3. Vérifier les logs d'erreur du serveur web
4. Tester en mode incognito

## 📊 Monitoring continu

### 1. Configurer les alertes
```bash
# Script de monitoring simple
echo '#!/bin/bash
if ! pm2 list | grep -q "online"; then
  echo "Application down!" | mail -s "Alert" admin@votre-domaine.com
fi' > ~/monitor.sh
chmod +x ~/monitor.sh

# Ajouter au crontab
crontab -e
# */5 * * * * ~/monitor.sh
```

### 2. Logs et métriques
```bash
# Rotation des logs PM2
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7

# Monitoring des ressources
pm2 install pm2-server-monit
```

## 📝 Documentation finale

### Informations à conserver
- [ ] URL de production: https://votre-domaine.com
- [ ] URL API: https://votre-domaine.com/api
- [ ] Accès SSH: `ssh user@server.o2switch.net`
- [ ] Base de données: `postgresql://...`
- [ ] Clés API (Stripe, Brevo, etc.)
- [ ] Contacts support o2switch

### Procédures de maintenance
- [ ] Sauvegarde automatique configurée
- [ ] Procédure de mise à jour documentée
- [ ] Contacts d'urgence définis
- [ ] Plan de reprise d'activité

## 🎉 Validation finale

Une fois toutes les vérifications effectuées:

1. **Tester depuis différents appareils/navigateurs**
2. **Faire tester par des utilisateurs externes**
3. **Documenter les URLs et accès**
4. **Planifier la première sauvegarde**
5. **Configurer le monitoring**

---

**✅ Déploiement validé le**: ___________
**👤 Validé par**: ___________
**📝 Notes**: ___________