
# **Outil Simplifié d'Analyse des Paniers d'Achat**

## **Description**
Cet outil permet aux administrateurs de sites e-commerce d’analyser les ventes et de visualiser des tendances via un tableau de bord interactif.

---

## **Technologies Utilisées**
- **Frontend** : Vue3 (Framework JavaScript)
- **Backend** : Node.js avec TypeScript
- **Base de Données** : MongoDB
- **Visualisations** : Chart.js  

---

## **Prérequis**
Avant de commencer, assurez-vous d’avoir installé les éléments suivants :
- **Node.js** (version 10.9.0 )  
- **MongoDB** (serveur local) **MongoDBcompass**
- **npm** pour gérer les dépendances  

---

## **Installation**

### **1. Cloner le repository**
Commencez par cloner le projet sur votre machine :  
```bash
git clone https://github.com/username/nom-du-projet.git
cd nom-du-projet
```

### **2. Installer les dépendances**
Installez les dépendances nécessaires pour le frontend et le backend :  
```bash
# Installer les dépendances du backend
cd backend
npm install

# Installer les dépendances du frontend
cd ../frontend
npm install
```

### **3. Configuration**
Ajoutez vos variables d'environnement pour configurer le projet :  
1  . Remplissez les fichiers `.env` avec les informations nécessaires :
   - **Backend (`backend/.env`)** :
     ```
     MONGO_URI=<URL de votre base de données MongoDB>
     PORT=5000
     ```
   - **Frontend (`frontend/.env`)** :
     ```
     VUE_APP_API_URL=http://localhost:5000
     ```

### **4. Charger les données**
Chargez les données initiales dans MongoDB grâce à un script :  
```bash
cd backend
```npx ts-node src/scripts/populateDatabase.ts

---

## **Exécution**

### **1. Lancer le Backend**
Dans le dossier `backend`, exécutez le serveur Node.js :  
```bash
npx nodemon src/index.ts
```

### **2. Lancer le Frontend**
Dans le dossier `frontend`, démarrez le serveur Vue.js :  
```bash
npm run serve
```

---

## **Accéder à l’Application**
- **Frontend** : [http://localhost:8080](http://localhost:8080)  
- **Backend** : [http://localhost:5000](http://localhost:5000)  

---

## **Fonctionnalités Principales**
1. Tableau de bord interactif avec des statistiques sur les ventes :
   - Total des ventes.
   - Produits les plus vendus.
   - Répartition par catégorie.  
2. Graphiques intuitifs pour les tendances des ventes.  
3. Filtres pour sélectionner des périodes spécifiques.  

---


