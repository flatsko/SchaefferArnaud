# Guide de débogage responsive

## Vérification de la configuration Tailwind

### 1. Configuration actuelle
- **Breakpoints** : `md: 768px`, `lg: 1024px`
- **Classes utilisées** : `hidden md:flex`, `md:hidden`

### 2. Tests à effectuer

#### Test 1 : Vérifier la largeur de l'écran
```javascript
// Dans la console du navigateur
console.log('Largeur:', window.innerWidth);
console.log('User agent:', navigator.userAgent);
```

#### Test 2 : Classes de débogage
Ajouter temporairement dans Header.jsx :
```jsx
// Dans le return du Header
<div className="fixed top-0 right-0 bg-red-500 text-white p-2 z-50">
  {window.innerWidth}px
</div>
```

#### Test 3 : Vérifier les styles appliqués
- Inspecter l'élément `<nav class="hidden md:flex ...">`
- Vérifier que `display: none` est bien surchargé par `display: flex` à 768px+

### 3. Problèmes courants

#### A. Ordre des classes
```jsx
// Mauvais
<div class="hidden md:flex hidden"> // hidden sera prioritaire

// Bon  
<div class="hidden md:flex">
```

#### B. Conflit avec les variables CSS
Les variables CSS définies dans index.css peuvent interférer avec les couleurs Tailwind.

### 4. Solutions

#### Rebuild Tailwind
```bash
npm run build
npm run dev
```

#### Vérifier le bundle
S'assurer que les styles Tailwind sont bien inclus dans le bundle final.

### 5. Test responsive rapide

Ajouter ces classes temporairement pour tester :
```jsx
// Dans Header.jsx, ligne ~130
<div className="container mx-auto px-4 max-w-full">
  <div className="flex items-center justify-between h-16 w-full">
```

### 6. Breakpoints personnalisés
Configuration actuelle dans tailwind.config.js :
- xs: 475px
- sm: 640px  
- md: 768px ✅ (utilisé pour le menu)
- lg: 1024px
- xl: 1280px
- 2xl: 1536px