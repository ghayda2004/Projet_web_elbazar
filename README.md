# Projet Web El Bazar

Bienvenue dans le projet **El Bazar**, une application e-commerce moderne destinée au marché francophone.

## Présentation

Ce projet vise à fournir une plateforme conviviale permettant aux utilisateurs de parcourir, rechercher, et acheter des produits en ligne. L'interface est inspirée d'une maquette Figma : [E-commerce Website in French](https://www.figma.com/design/3CZcm12kmDnywxWpb1fBV5/E-commerce-Website-in-French).

## Fonctionnalités principales

- Authentification des utilisateurs et des vendeurs
- Navigation et recherche de produits
- Gestion des commandes et du panier
- Espace vendeur pour la gestion des produits
- Système multilingue (principalement en français)

## Structure du projet

La base du code se trouve dans le dossier `frontend`.

- **frontend/** : Contient le code principal du front-end
  - **src/services/** : Services pour les appels API et la logique métier (authentification, produits, vendeurs, commandes)

Exemple de structure recommandée dans `src/services` :
- `authService.ts` : Gestion de l'authentification
- `productService.ts` : Gestion des produits
- `sellerService.ts` : Gestion des vendeurs
- `orderService.ts` : Gestion des commandes

```typescript
// Exemple pour authService.ts
export const login = async (email: string, password: string) => {
  // Logique d'authentification
};

export const logout = async () => {
  // Logique de déconnexion
};
```

## Installation et démarrage

1. Installez les dépendances :
   ```bash
   npm i
   ```

2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

## Technologies utilisées

- Node.js, npm
- Framework front-end (vérifiez le fichier `package.json` pour les détails)
- TypeScript pour la partie services

## Contribuer

Toute contribution est la bienvenue ! Pour proposer une évolution, ouvrez une "issue" ou soumettez une "pull request".

## Licence

Ce projet est open-source et accessible à tous les développeurs intéressés.

---

Pour plus d’informations sur l’architecture ou les fonctionnalités, consultez les autres fichiers du dépôt ou contactez les auteurs responsables.
