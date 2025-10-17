# Project Adaction Front

Application front-end développée avec React, Vite et Tailwind CSS.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants sur votre machine :

- **Node.js** (version 18.x ou supérieure recommandée)
- **npm** (version 9.x ou supérieure) ou **yarn** (version 1.22.x ou supérieure)
- **Git** pour cloner le repository

Vous pouvez vérifier les versions installées avec les commandes suivantes :

```bash
node --version
npm --version
git --version
```

## Installation

### 1. Cloner le repository

```bash
git clone https://github.com/DwoDwoS/Project_Adaction_Front.git
cd Project_Adaction_Front/Adaction_Front
```

### 2. Installer les dépendances

Avec npm :
```bash
npm install
```

Ou avec yarn :
```bash
yarn install
```

### 3. Configuration de l'environnement

À ce stade du projet, nous n'avons pas eu besoin de `.env`. À l'avenir, si le projet nécessite des variables d'environnement, créez un fichier `.env` à la racine du projet :

```bash
cp .env.example .env
```

Puis modifiez le fichier `.env` avec vos configurations spécifiques :

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Project Adaction
# Ajoutez vos autres variables d'environnement ici
```

## Démarrage du projet

### Mode développement

Lance le serveur de développement avec hot-reload :

```bash
npm run dev
```

Ou avec yarn :
```bash
yarn dev
```

L'application sera accessible à l'adresse : `http://localhost:5173`

### Build de production

Pour créer une version optimisée pour la production :

```bash
npm run build
```

Ou avec yarn :
```bash
yarn build
```

Les fichiers compilés seront générés dans le dossier `dist/`.

### Prévisualiser le build de production

Pour tester le build de production localement :

```bash
npm run preview
```

Ou avec yarn :
```bash
yarn preview
```

## Technologies utilisées

- **React** - Bibliothèque JavaScript pour créer des interfaces utilisateur
- **Vite** - Build tool moderne et rapide pour les projets front-end
- **Tailwind CSS** - Framework CSS utility-first pour un styling rapide et personnalisable
- **React Router** (si utilisé) - Pour la gestion du routing

## Structure du projet

```
Project_Adaction_Front/
├── Adaction_Front/
│   ├── public/             # Fichiers statiques
│   ├── src/
│   │   ├── assets/         # Images, fonts, etc.
│   │   ├── components/     # Composants React réutilisables
│   │   ├── App.css         # Fichier CSS global
│   │   ├── App.jsx         # Composant principal
│   │   └── main.jsx        # Point d'entrée de l'application
│   ├── .env.example        # Exemple de fichier d'environnement
│   ├── .gitignore          # Fichiers à ignorer par Git
│   ├── eslint.config.js    # Configuration ESLint (flat config)
│   ├── index.html          # Template HTML principal
│   ├── package-lock.json   # Versions exactes des dépendances
│   ├── package.json        # Dépendances et scripts
│   ├── README.md           # Explications de Vite.js et Eslint
│   ├── vite.config.js      # Configuration Vite
└── README.md               # Ce fichier
```

## Scripts disponibles

- `npm run dev` - Lance le serveur de développement
- `npm run build` - Crée un build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint (si configuré)

## Configuration Tailwind CSS

Tailwind CSS est déjà configuré dans le projet. Pour personnaliser les styles, modifiez le fichier `tailwind.config.js` :

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Vos personnalisations ici
    },
  },
  plugins: [],
}
```

## Dépannage

### Le serveur ne démarre pas

- Vérifiez que le port 5173 n'est pas déjà utilisé
- Supprimez le dossier `node_modules` et le fichier `package-lock.json`, puis réinstallez les dépendances

```bash
rm -rf node_modules package-lock.json
npm install
```

### Erreurs de dépendances

Si vous rencontrez des erreurs de dépendances, essayez :

```bash
npm install --legacy-peer-deps
```

### Le build échoue

Assurez-vous que toutes les variables d'environnement nécessaires sont correctement définies dans votre fichier `.env`.

## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request


##  Auteurs

- **Elouan** - [GitHub](https://github.com/DwoDwoS)
- **Eliès** - [GitHub](https://github.com/Hellyes31)

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)

---

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository GitHub.
