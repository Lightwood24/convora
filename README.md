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
├─ assets/
│  ├─ fonts/
│  ├─ icons/
│  └─ pictures/
├─ public/
│  └─ index.html
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
├─ .firebaserc     
├─ .gitignore
├─ App.js
├─ app.json
├─ firebase.json
├─ index.js
├─ package-lock.json
├─ package.json   
├─ README.md 
└─ tsconfig.json
```

## ✨ Implemented Features
### 📅 Event System
- Create events with:
  - title, description, date, time & location
  - visual template selection
- Multiple event templates:
  - custom background images
  - template-specific font families
- Automatic owner binding (ownerId, username)
- Real-time event updates using Firestore listeners
- Google Maps integration for event locations

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
- Stack-based navigation for event flows
- Custom screen transition animations
- Bottom tabs (hidden UI) for:
  - Profile Screen
  - Home Screen
  - Calendar Screen

### 🎨 UI / UX
- Centralized theme system
  - Custom typography & color palette
  - Centralized spacing, radius, and shadows
- Card-style expanding sections
- Shared background imagery across screens
- Clean iOS-focused design

## 📜 Changelog
- v1.4.0: Implemented invite-based onboarding with web landing page, deep linking via Expo, automatic event joining after login/registration, participant management with +1 support, real-time event chat, event leave and delete functionality, and expanded Firestore security rules
- v1.3.0: Added Home screen with real-time event listing, unified background imagery across screens, implemented Event Detail screen with map integration and error handling
- v1.2.0: Implemented full event flow (create → list → detail), added event templates with dynamic backgrounds and fonts, integrated Firestore-backed event loading, improved navigation animations
- v1.1.0: Added user registration / login logic, implemented profile edit / delete and sign out option, added navigation between main screens, implemented a global theme
- v1.0.0: Initial Expo project setup, added base skeleton

### 👨‍💻 Author
Daniel Kiss (Thesis project owner)
