# Convora

Convora is a mobile application developed as part of a university thesis project.  
The goal of the app is to provide a modern, intuitive, iOS-focused event–organizing tool built with **React Native** and **Expo**, supported by **Firebase Authentication**, **Cloud Firestore**, and **Cloud Storage**.

This README documents the project’s architecture, setup, implemented features, and development progress.

## 📱 Tech Stack

- **React Native 0.81** (Expo SDK 54 — Managed Workflow)
- **React 19**
- **JavaScript (with partial TypeScript support for services)**
- **Expo Modules**
  - `expo-image-picker`
  - `expo-font`
  - `expo-status-bar`
- **Firebase (v12)**
  - Authentication
  - Firestore Database
  - Cloud Storage
- **Navigation**
  - `@react-navigation/native`
  - `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`

### Platform focus
Although React Native supports both iOS and Android, **Convora is developed specifically for iOS**, and no Android-specific development or testing is planned.

## 🚀 Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run start
```

## 📂 Project Structure
```
Convora/
├─ App.js
├─ app.json
├─ index.js
├─ assets/
│  ├─ pictures/
│  └─ fonts/
├─ src/
│  ├─ navigation/
│  │  ├─ AppNavigator.js 
│  │  └─ AppTabs.js
│  ├─ screens/
│  │  ├─ LoginScreen.js
│  │  ├─ ProfileScreen.js
│  │  └─ (...)
│  ├─ services/
│  │  ├─ firebase.ts            
│  │  └─ auth.ts            
│  ├─ style/
│  │  ├─ LoginScreen.styles.js
│  │  ├─ ProfileScreen.style.js
│  │  ├─ (...)
│  │  └─ Theme.js
├─ test/
│  └─ testFirestore.js                      
├─ .env             
├─ .gitignore
├─ package-lock.json
├─ package.json   
├─ README.md 
└─ tsconfig.json
```
Only implemented screens are listed

## ✨ Implemented Features
### 🔐 Authentication System
- Email + password login
- Registration with:
  - username validation
  - email validation
  - password strength rules
- Duplicate username & email detection (Firestore / Auth check)
- Email verification handling

### 👤 Profile Management
- Avatar upload (Expo Image Picker → Firebase Storage)
- Display name & phone number editing
- Automatic Firestore syncing (users/{uid})
- Delete account:
  - deletes Firestore user doc
  - deletes profile avatar from Storage
  - deletes Firebase Auth user
- Sign out and navigation reset

### 🌐 Navigation
- Stack navigation for Login → AppTabs
- Bottom tabs (hidden UI) for:
  - Profile Screen
  - Home Screen
  - Calendar Screen

### 🎨 UI / UX
- Centralized theme system
- Custom typography & color palette
- Card-style expanding sections
- Clean iOS-focused design

## 📜 Changelog
- v1.4.0: Added full validation in registration and in profile editing, improved styling consistency
- v1.3.0: Added navigation between main screens, implemented a globan theme
- v1.2.0: Added user registration / login logic, implemented profile edit / delete and sign out option
- v1.1.0: Initial login and profile screen structure
- v1.0.0: Initial Expo project setup, added base skeleton

### 👨‍💻 Author
Daniel Kiss (Thesis project owner)
