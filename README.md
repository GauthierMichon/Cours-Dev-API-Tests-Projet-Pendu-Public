# Pendu - Jeu en CLI

## Description

Ce projet est un jeu de pendu en ligne de commande (CLI) développé en TypeScript. Il propose une expérience de jeu de pendu classique, où le joueur doit deviner un mot choisi aléatoirement, tout en respectant un nombre de vies limitées. Ce projet sauvegarde également automatiquement la progression de la partie pour permettre de la reprendre en cas d'interruption.

## Prérequis

Assurez-vous d'avoir **Node.js** installé sur votre machine.

## Installation

Clonez le dépôt, puis installez les dépendances nécessaires en utilisant :

```bash
npm install
```

## Lancer le projet

### Étape 1 : Compiler le projet

Avant de lancer le jeu, compilez le code TypeScript en JavaScript en exécutant la commande suivante :

```bash
npx tsc
```

Si vous rencontrez une erreur, essayez la commande suivante pour modifier temporairement les permissions d'exécution :

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Puis, relancez la commande :

```bash
npx tsc
```

### Étape 2 : Lancer le projet

Une fois le projet compilé, vous pouvez lancer le jeu.

```bash
node dist/index.js
```

## Règles du jeu

Le jeu est basé sur les règles classiques du pendu :

- Le programme sélectionne un mot au hasard dans une liste.
- Vous disposez de **6 vies** pour deviner le mot.
- Chaque lettre incorrecte entraîne la perte d'une vie.
- Chaque mot incorrect entraîne la perte de **2 vies**.

### Sauvegarde automatique

- À chaque coup, la progression de votre partie est sauvegardée automatiquement.
- Si vous quittez une partie en cours, celle-ci sera reprise automatiquement lors du prochain lancement du jeu.

## Tests

Les tests unitaires sont à effectuer dans le fichier `penduGame.test.ts`.

### Exécution des tests

- Utilisez la fonction `expect()` pour effectuer les vérifications.
- La méthode `jest.spyOn` peut être utilisée pour surveiller le comportement d'une fonction spécifique.
- Utilisez `.mockImplementation` si vous avez besoin de forcer une fonction à prendre des valeurs spécifiques pour vos tests.

Pour lancer les tests, utilisez la commande suivante :

```bash
npm run test
```
