# Coach Basket V0.3 — Publication GitHub Pages

Ce dossier est fondé sur la dernière V0.3 responsive validée pour essai. Il contient l’application complète, les terrains déjà intégrés, une icône, un manifeste PWA et un service worker pour un accès hors ligne après la première ouverture réussie.

## Publication sans logiciel
1. GitHub > New repository > nom `coach-basket` > Public > Create repository.
2. Dans le dépôt, `Add file` > `Upload files`. Déposer **le contenu** de ce dossier : `index.html`, `manifest.webmanifest`, `sw.js`, `.nojekyll`, `README.md` et le dossier `icons/`. Ne pas déposer le fichier ZIP tel quel.
3. `Commit changes`.
4. `Settings` > `Pages` > `Build and deployment` > `Deploy from a branch` > `main` > `/(root)` > `Save`.
5. L’URL sera `https://IDENTIFIANT.github.io/coach-basket/` si le dépôt se nomme `coach-basket`.

## Attention aux données
- Le dépôt et le site sont PUBLICS : ne jamais y mettre tes sauvegardes JSON, noms de joueurs ou séances personnelles.
- Les données restent locales **à chaque navigateur / installation** : les séances du fichier HTML ouvert sur Mac ne sont pas synchronisées avec GitHub Pages. Exporte le JSON et importe-le dans le site web pour migrer, après sauvegarde.
- Sur iOS, la web app ajoutée à l’écran d’accueil peut utiliser un espace de stockage distinct de Safari. Fais une sauvegarde avant toute migration et vérifie la restauration.
- L’export PDF repose sur la fonction d’impression du navigateur, et doit être testé sur téléphone.
- Pour mettre à jour l’application, remplacer les fichiers du dépôt. Pour une mise à jour du cache hors ligne, modifier la constante CACHE dans `sw.js`.

## Technologie
Application statique sans dépendances ni abonnement nécessaire. Les terrains sont intégrés dans `index.html` ; aucun autre fichier image requis.
