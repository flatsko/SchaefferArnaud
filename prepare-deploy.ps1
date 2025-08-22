# Script PowerShell pour préparer le déploiement sur o2switch
# Usage: .\prepare-deploy.ps1

Write-Host "🚀 Préparation du déploiement pour o2switch..." -ForegroundColor Green

# Configuration
$BackendPath = "./backend"
$FrontendPath = "./"
$DeployPath = "./deploy"
$BackendArchive = "backend-deploy.zip"
$FrontendArchive = "frontend-deploy.zip"

# Créer le dossier de déploiement
Write-Host "📁 Création du dossier de déploiement..." -ForegroundColor Yellow
if (Test-Path $DeployPath) {
    Remove-Item $DeployPath -Recurse -Force
}
New-Item -ItemType Directory -Path $DeployPath | Out-Null

# Préparer le backend
Write-Host "📦 Préparation du backend..." -ForegroundColor Yellow
if (Test-Path $BackendPath) {
    $BackendDeployPath = Join-Path $DeployPath "backend"
    New-Item -ItemType Directory -Path $BackendDeployPath | Out-Null
    
    # Copier les fichiers nécessaires du backend
    $BackendFiles = @(
        "server.js",
        "package.json",
        "package-lock.json",
        "ecosystem.config.js",
        ".env.production",
        "deploy.sh",
        "nginx.conf",
        "routes",
        "utils",
        "prisma"
    )
    
    foreach ($file in $BackendFiles) {
        $sourcePath = Join-Path $BackendPath $file
        if (Test-Path $sourcePath) {
            $destPath = Join-Path $BackendDeployPath $file
            if (Test-Path $sourcePath -PathType Container) {
                Copy-Item $sourcePath $destPath -Recurse -Force
            } else {
                Copy-Item $sourcePath $destPath -Force
            }
            Write-Host "  ✅ Copié: $file" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  Non trouvé: $file" -ForegroundColor Red
        }
    }
    
    # Créer l'archive du backend
    $BackendArchivePath = Join-Path $DeployPath $BackendArchive
    Compress-Archive -Path "$BackendDeployPath\*" -DestinationPath $BackendArchivePath -Force
    Write-Host "  📦 Archive créée: $BackendArchive" -ForegroundColor Green
} else {
    Write-Host "  ❌ Dossier backend non trouvé" -ForegroundColor Red
}

# Préparer le frontend
Write-Host "🎨 Préparation du frontend..." -ForegroundColor Yellow
if (Test-Path "./dist") {
    $FrontendDeployPath = Join-Path $DeployPath "frontend"
    New-Item -ItemType Directory -Path $FrontendDeployPath | Out-Null
    
    # Copier le build du frontend
    Copy-Item "./dist/*" $FrontendDeployPath -Recurse -Force
    
    # Copier les fichiers de configuration
    $FrontendConfigFiles = @(
        ".htaccess",
        ".env.production"
    )
    
    foreach ($file in $FrontendConfigFiles) {
        $sourcePath = Join-Path "./dist" $file
        if (Test-Path $sourcePath) {
            $destPath = Join-Path $FrontendDeployPath $file
            Copy-Item $sourcePath $destPath -Force
            Write-Host "  ✅ Copié: $file" -ForegroundColor Green
        }
    }
    
    # Créer l'archive du frontend
    $FrontendArchivePath = Join-Path $DeployPath $FrontendArchive
    Compress-Archive -Path "$FrontendDeployPath\*" -DestinationPath $FrontendArchivePath -Force
    Write-Host "  📦 Archive créée: $FrontendArchive" -ForegroundColor Green
} else {
    Write-Host "  ❌ Build frontend non trouvé. Exécutez 'npm run build' d'abord." -ForegroundColor Red
}

# Copier les guides de déploiement
Write-Host "📚 Copie des guides de déploiement..." -ForegroundColor Yellow
$Guides = @(
    "DEPLOYMENT_O2SWITCH.md",
    "DEPLOYMENT_NODEJS_O2SWITCH.md",
    "CONFIGURATION_O2SWITCH.md"
)

foreach ($guide in $Guides) {
    if (Test-Path $guide) {
        Copy-Item $guide $DeployPath -Force
        Write-Host "  ✅ Copié: $guide" -ForegroundColor Green
    }
}

# Créer un fichier README pour le déploiement
$ReadmeContent = @"
# Déploiement sur o2switch

## Fichiers inclus

### Backend
- `backend-deploy.zip` : Archive contenant l'application Node.js
- Extraire dans `~/apps/schaefferarnaud-backend/` sur le serveur

### Frontend
- `frontend-deploy.zip` : Archive contenant le build React
- Extraire dans le dossier web public (ex: `~/www/`)

### Guides
- `DEPLOYMENT_O2SWITCH.md` : Guide de déploiement frontend
- `DEPLOYMENT_NODEJS_O2SWITCH.md` : Guide de déploiement Node.js
- `CONFIGURATION_O2SWITCH.md` : Guide de configuration détaillé

## Étapes rapides

1. **Frontend**:
   - Extraire `frontend-deploy.zip` dans votre dossier web
   - Configurer le domaine dans le panneau o2switch

2. **Backend**:
   - Extraire `backend-deploy.zip` sur le serveur
   - Configurer la base de données
   - Modifier `.env.production` et le renommer en `.env`
   - Exécuter `./deploy.sh production`

3. **Configuration**:
   - Suivre le guide `CONFIGURATION_O2SWITCH.md` pour les détails

## Support
En cas de problème, consultez les guides détaillés inclus.
"@

$ReadmePath = Join-Path $DeployPath "README-DEPLOY.md"
Set-Content -Path $ReadmePath -Value $ReadmeContent -Encoding UTF8

# Résumé
Write-Host "`n🎉 Préparation terminée!" -ForegroundColor Green
Write-Host "📁 Fichiers créés dans: $DeployPath" -ForegroundColor Cyan
Write-Host "📦 Archives:" -ForegroundColor Cyan
if (Test-Path (Join-Path $DeployPath $BackendArchive)) {
    Write-Host "  - $BackendArchive (Backend Node.js)" -ForegroundColor White
}
if (Test-Path (Join-Path $DeployPath $FrontendArchive)) {
    Write-Host "  - $FrontendArchive (Frontend React)" -ForegroundColor White
}
Write-Host "📚 Guides de déploiement inclus" -ForegroundColor Cyan
Write-Host "`n🚀 Prêt pour le déploiement sur o2switch!" -ForegroundColor Green

# Ouvrir le dossier de déploiement
if (Test-Path $DeployPath) {
    Write-Host "`n📂 Ouverture du dossier de déploiement..." -ForegroundColor Yellow
    Start-Process explorer.exe -ArgumentList (Resolve-Path $DeployPath).Path
}