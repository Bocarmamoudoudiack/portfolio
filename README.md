# Portfolio — Bocar Mamoudou DIACK
> Élève Ingénieur Statisticien Économiste

## 📁 Structure du projet
e
```
portfolio/
├── index.html          ← Page principale (Accueil, À propos, Projets, Compétences, Portfolio, Contact)
├── blog.html           ← Page Blog avec liste d'articles
├── README.md           ← Ce fichier
│
├── css/
│   ├── style.css       ← Styles principaux (variables, composants, layout)
│   ├── animations.css  ← Animations CSS (reveal, hover, transitions)
│   └── responsive.css  ← Breakpoints mobile/tablette (≤1024px, ≤768px, ≤480px)
│
├── js/
│   ├── main.js         ← Logique principale (loader, nav, filtres, formulaire, scroll)
│   └── animations.js   ← Canvas particules background & effets visuels
│
└── img/
    ├── favicon.svg     ← Icône du site (SVG)
    ├── avatar.png      ← Photo de profil (à remplacer) — recommandé : 400×400px
    ├── person.jpg      ← Photo section "À propos" (à remplacer) — recommandé : 600×800px
    └── cv.pdf          ← CV téléchargeable (à ajouter)
```

## 🚀 Démarrage rapide

1. **Télécharger** ou cloner ce dossier sur votre machine
2. **Ajouter vos images** dans le dossier `img/` :
   - `avatar.png` — votre photo de profil (format carré, min 400px)
   - `person.jpg` — photo pour la section À propos (format portrait)
   - `cv.pdf` — votre CV en PDF
3. **Ouvrir** `index.html` dans votre navigateur
4. **Personnaliser** le contenu (voir section ci-dessous)

## ✏️ Personnalisation

### Informations personnelles
Cherchez et remplacez dans `index.html` et `blog.html` :
- `bocar.diack@example.com` → votre email
- `+221 70 000 00 00` → votre téléphone
- Les liens `href="#"` des réseaux sociaux → vos URLs réels

### Couleurs
Dans `css/style.css`, modifiez les variables CSS :
```css
:root {
  --gold:      #c9a84c;   /* Couleur principale (accent doré) */
  --gold-light:#e8c97a;   /* Version claire */
  --bg:        #0a0a0f;   /* Fond principal */
}
```

### Projets portfolio
Dans `index.html`, section `#portfolio`, modifiez les `<article class="project-card">` :
- Titre, description, catégorie (data-category: "stat", "data", "eco")
- Technologies utilisées
- Liens vers vos projets

### Blog
Dans `blog.html`, ajoutez/modifiez les `<article class="blog-card">` avec vos articles.

## 🛠️ Technologies utilisées

| Technologie | Usage |
|-------------|-------|
| HTML5 sémantique | Structure accessible |
| CSS3 Variables | Thème cohérent, dark mode |
| CSS Grid + Flexbox | Layout responsive |
| JavaScript ES6+ | Interactions, animations |
| Canvas API | Fond particules animées |
| Intersection Observer | Animations au scroll |
| Google Fonts | Cormorant Garamond + DM Sans |

## 📱 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (versions récentes)
- ✅ Mobile, Tablette, Desktop
- ✅ Respecte `prefers-reduced-motion`
- ✅ SEO friendly (meta tags, structure sémantique)

## 📝 Sections disponibles

| Section | ID | Description |
|---------|-----|-------------|
| Accueil | `#hero` | Présentation + stats + canvas animé |
| À propos | `#about` | Bio, infos, téléchargement CV |
| Projets | `#services` | 6 cartes projets académiques |
| Compétences | `#skills` | Barres de progression + nuage de tags |
| Portfolio | `#portfolio` | 6 projets avec filtre par catégorie |
| Contact | `#contact` | Formulaire + coordonnées |
| Blog | `blog.html` | Articles avec mise en page éditoriale |

---


