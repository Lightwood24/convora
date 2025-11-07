# Convora

A thesis project built with Expo and React Native.

### Overview
Convora is a mobile application developed as a university thesis project. This README is a living document being updated throughout the project to track setup, architecture, features, research decisions, and milestones.

---

### Tech Stack
- *React Native 0.81* (Expo SDK 54)
- *React 19*
- *TypeScript 5.9*
- *Expo (Managed workflow)*
- *Firebase JS SDK 11 — authentication & Firestore database*

#### Dev Dependencies
- `@types/react`
- `typescript`
- `expo-font`
- `expo-image-picker`

---

### Getting Started
1. Install dependencies:
```bash
npm install
```
2. Start the development server:
```bash
npm run start
```

### Project Structure
```
Convora/
├─ App.js
├─ app.json
├─ index.js
├─ assets/                              # App images/assets
│  ├─ pictures/
│  └─ fonts/
├─ src/
│  ├─ components/                       # UI components (currently empty)
│  ├─ navigation/                       # Navigation setup
│  │  └─ AppNavigator.js   
│  ├─ screens/                          # Screen components
│  │  ├─ CalendarScreen.js
│  │  ├─ EventCreateScreen.js
│  │  ├─ EventDetailScreen.js
│  │  ├─ HomeScreen.js
│  │  ├─ LoginScreen.js
│  │  └─ ProfileScreen.js
│  ├─ services/                         # Business logic & Firebase services
│  │  ├─ firebase.ts            
│  │  └─ auth.ts            
│  ├─ style/                            # Centralized stylesheets
│  │  ├─ LoginScreen.styles.js
│  │  ├─ ProfileScreen.style.js
│  │  └─ Theme.js                       # Global theme system (colors, typography)
│  └─ utils/                            # Utilities (currently empty)
├─ test/
│  └─ testFirestore.js          
├─ tsconfig.json                
├─ package.json                 
├─ .gitignore
└─ README.md
```

### App Entry
- `App.js` renders `LoginScreen` from `src/screens/LoginScreen.js`.
- Expo configuration is in `app.json`.

### TypeScript
- The project uses TypeScript for maintainable app logic (`*.ts` files under services, etc.). Ensure TypeScript is set up before starting development.

### Testing (Firebase/Firestore)
- The `test/testFirestore.js` file is for testing Firestore access; it imports helpers from `src/services/firebase.ts`.
- Firestore collections in use for tests: `users`, `events`, `invites`, `links`, and subcollection `attendees` under `events`.

### Changelog
- v1.3.0: Added navigation between the Login and Profile screens, UI improvements with global system theme
- v1.2.0: Added Firebase Authentication & Firestore user registration logic, connected login/register forms to Firebase backend
- v1.1.0: Added Firebase service integration, TypeScript configuration, Firestore test utilities in `/test`.
- v1.0.0: Project initialization (Expo 54, RN 0.81, React 19). Added `HomeScreen` scaffold.

### Author
- Daniel Kiss (Thesis project owner)
