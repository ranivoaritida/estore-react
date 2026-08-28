# 🛒 E-Store-react Frontend

Application frontend d'une plateforme e-commerce développée avec **React.js**.

Cette application communique avec une **API REST développée avec Spring Boot** et permet aux utilisateurs de consulter les produits, gérer leur panier, passer des commandes et effectuer leurs paiements.

Le frontend utilise **TanStack Query** pour la gestion des données serveur et **Axios** pour communiquer avec l'API backend.

---

## 📋 Description

Ce projet constitue la partie frontend d'une application e-commerce complète.

L'application permet notamment de :

* consulter le catalogue de produits ;
* consulter les détails d'un produit ;
* créer un compte et se connecter ;
* gérer l'authentification utilisateur ;
* ajouter des produits au panier ;
* modifier les quantités ;
* supprimer des produits du panier ;
* consulter le récapitulatif du panier ;
* passer une commande ;
* effectuer un paiement via Stripe.

Le frontend communique avec une API REST développée avec **Java Spring Boot**.

---

## ✨ Fonctionnalités

### 👤 Authentification

* Inscription
* Connexion
* Déconnexion
* Gestion de l'utilisateur connecté
* Gestion de l'Access Token
* Renouvellement de l'Access Token grâce au Refresh Token
* Protection des routes nécessitant une authentification

L'authentification communique avec les endpoints sécurisés du backend Spring Boot.

### 🛍️ Catalogue produits

* Affichage de la liste des produits
* Consultation du détail d'un produit
* Affichage des informations produit
* Gestion des états de chargement
* Gestion des erreurs API

### 🔎 Gestion des données

Les requêtes vers l'API sont gérées avec **TanStack Query**.

Cela permet notamment de :

* récupérer les données depuis l'API ;
* mettre en cache les résultats ;
* gérer les états `loading`, `error` et `success` ;
* invalider et actualiser les données après une modification ;
* gérer les mutations ;
* éviter les requêtes inutiles.

### 🛒 Panier

Le frontend permet de gérer le panier de l'utilisateur :

* Ajouter un produit au panier
* Modifier la quantité d'un produit
* Supprimer un produit
* Afficher le nombre d'articles
* Afficher le contenu du panier
* Calculer le total
* Synchroniser le panier avec le backend

Les opérations de modification du panier sont réalisées à travers des mutations TanStack Query.

### 💳 Paiement

Le frontend intègre le processus de paiement avec **Stripe**.

Le parcours général est :

Panier
   │
   ▼
Commande
   │
   ▼
Initialisation du paiement
   │
   ▼
Stripe
   │
   ▼
Paiement
   │
   ▼
Confirmation

---

## 🛠️ Technologies utilisées

### Frontend

* **React.js**
* **JavaScript**
* **React Router**
* **TanStack Query**
* **Axios**
* CSS

### Authentification

* JWT
* Access Token
* Refresh Token
* HTTP-only Cookie

### Paiement

* **Stripe**

### Backend utilisé

L'application communique avec une API REST développée avec :

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* MySQL

### Outils

* Git
* GitHub
* npm

---

## 🏗️ Architecture

L'application frontend communique avec l'API Spring Boot via HTTP.

                    ┌─────────────────────┐
                    │       React         │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ Axios
                               ▼
                    ┌─────────────────────┐
                    │      REST API       │
                    │    Spring Boot      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       MySQL         │
                    └─────────────────────┘

Pour la gestion des données serveur :

React Component
      │
      ▼
Custom Hook
      │
      ▼
TanStack Query
      │
      ▼
Axios
      │
      ▼
Spring Boot API


---

## 📁 Structure du projet

src/
│
├── assets/
│
├── components/
│   ├── Navbar/
│   ├── ProductCard/
│   ├── ProductList/
│   └── ...
│
├── pages/
│   ├── Home/
│   ├── Login/
│   ├── Register/
│   ├── ProductDetails/
│   ├── Cart/
│   ├── Checkout/
│   └── ...
│
├── hooks/
│   ├── useProducts.js
│   ├── useProduct.js
│   ├── useCart.js
│   ├── useCreateCart.js
│   ├── useUpdateCartItem.js
│   └── ...
│
├── contexts/
│   └── AuthContext.jsx
│
├── services/
│   ├── api.js
│   ├── authService.js
│   ├── productService.js
│   ├── cartService.js
│   └── ...
│
├── routes/
│
├── App.jsx
└── main.jsx

> La structure ci-dessus peut être adaptée à l'organisation exacte du projet.

---

## 🔌 Communication avec l'API

Les communications avec le backend sont centralisées avec **Axios**.

Exemple d'instance Axios :

const api = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});


`withCredentials: true` permet notamment d'envoyer les cookies nécessaires au mécanisme de Refresh Token.

---

## 🔐 Gestion de l'authentification

L'authentification est centralisée dans un `AuthContext`.

                    AuthProvider
                         │
             ┌───────────┴───────────┐
             │                       │
             ▼                       ▼
          User                 Access Token
             │                       │
             └───────────┬───────────┘
                         │
                         ▼
                  Application React

Au démarrage de l'application, le frontend peut vérifier si une session existe encore et tenter de renouveler l'Access Token grâce au Refresh Token.

Lorsqu'une requête retourne une erreur `401 Unauthorized`, le mécanisme de renouvellement du token peut être utilisé afin de récupérer un nouvel Access Token puis de rejouer la requête initiale.

---

## 🔄 TanStack Query

Les appels API sont organisés sous forme de **custom hooks**.

Exemple :

Component
    │
    ▼
useProducts()
    │
    ▼
TanStack Query
    │
    ▼
productService
    │
    ▼
Axios
    │
    ▼
Spring Boot API

Cette organisation permet de séparer :

* l'interface utilisateur ;
* la logique de récupération des données ;
* les appels HTTP ;
* la gestion du cache et des mutations.

---

## 🛒 Gestion du panier

Le panier utilise les données provenant de l'API backend.

Les opérations principales sont réalisées avec des hooks TanStack Query :

useCart()
useCreateCart()
useUpdateCartItem()
useDeleteCartItem()

Une mutation peut notamment mettre à jour la quantité d'un produit puis invalider la requête du panier afin de récupérer les données actualisées.

User
 │
 │ Modifier quantité
 ▼
useUpdateCartItem()
 │
 ▼
TanStack Query Mutation
 │
 ▼
Axios
 │
 ▼
POST /carts/{cartId}/items/{productId}
 │
 ▼
Spring Boot
 │
 ▼
MySQL
 │
 ▼
Invalidation du cache
 │
 ▼
Actualisation du panier

---

## ⚙️ Installation

### Prérequis

* Node.js 18+
* npm
* API backend Spring Boot fonctionnelle

### 1. Cloner le repository

```bash
git clone <https://github.com/ranivoaritida/estore-react.git>
cd <estore-react>
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer l'API

Configurer l'URL de l'API backend dans la configuration du projet.

Exemple :

http://localhost:8080

### 4. Lancer le projet

```bash
npm run dev
```

L'application sera disponible à l'adresse indiquée par Vite.

Généralement :

http://localhost:5173

---

## 🧪 Tests

Les tests frontend sont réalisés avec **Vitest**.

Pour lancer les tests :

```bash
npm run test
```

Pour lancer les tests en mode interface :

```bash
npm run test:ui
```

> Les commandes peuvent varier selon la configuration actuelle du projet.

---

## 🔗 Backend

Ce frontend utilise une API REST développée avec **Java Spring Boot**.

Le backend prend notamment en charge :

* l'authentification ;
* les utilisateurs ;
* les produits ;
* le panier ;
* les commandes ;
* les paiements ;
* la sécurité JWT.

**Backend :**

<https://github.com/ranivoaritida/spring-boot-api.git>

---

## 🚀 Améliorations futures

* Ajouter davantage de tests unitaires et d'intégration.
* Améliorer l'expérience utilisateur lors des chargements.
* Ajouter davantage de filtres et de recherche de produits.
* Améliorer la gestion des erreurs.
* Ajouter des notifications utilisateur.
* Améliorer le responsive design.
* Ajouter davantage d'optimisations avec TanStack Query.
* Déployer l'application en production.

---

## 👨‍💻 Auteur

**Sandy**
### Stack principale

React.js • TanStack Query • Axios • JavaScript
Spring Boot • Spring Security • JWT • MySQL • Stripe
