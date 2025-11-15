# Services

Ce dossier contient les services pour gérer les appels API et la logique métier.

## Structure recommandée

- `authService.ts` - Gestion de l'authentification
- `productService.ts` - Gestion des produits
- `sellerService.ts` - Gestion des vendeurs
- `orderService.ts` - Gestion des commandes

## Exemple d'utilisation

```typescript
// authService.ts
export const login = async (email: string, password: string) => {
  // Logique d'authentification
};

export const logout = async () => {
  // Logique de déconnexion
};
```
