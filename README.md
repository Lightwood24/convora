# Convora

A thesis project built with Expo and React Native.

### Overview
Convora is a mobile application developed as a university thesis project. This README is a living document being updated throughout the project to track setup, architecture, features, research decisions, and milestones.

### Tech Stack
- React Native 0.81 (Expo SDK 54)
- React 19
- TypeScript 5.9
- Expo (Managed workflow)
- Firebase JS SDK (auth & firestore)

#### Dev Dependencies
- @types/react
- typescript

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
│  ├─ icon.png
│  ├─ splash-icon.png
│  ├─ adaptive-icon.png
│  └─ favicon.png
├─ src/
│  ├─ components/                       # UI components (currently empty)
│  ├─ navigation/                       # Navigation setup (currently empty)
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
│  └─ utils/                            # Utilities (currently empty)
├─ test/
│  └─ testFirestore.js          
├─ tsconfig.json                
├─ package.json                 
├─ .gitignore
└─ README.md
```

### Folder Descriptions
- **assets/**: App images and icons registered with Expo.
- **src/services/**: All Firebase and backend communication, authentication helpers, and database setup logic.
- **test/**: Scripts for interacting with Firestore (see `testFirestore.js` for test queries on DB collections).
- **src/components/**, **src/navigation/**, **src/utils/**: Reserved for UI, navigation logic, utility code – currently empty or to be expanded.

### App Entry
- `App.js` renders `HomeScreen` from `src/screens/HomeScreen.js`.
- Expo configuration is in `app.json`.

### TypeScript
- The project uses TypeScript for maintainable app logic (`*.ts` files under services, etc.). Ensure TypeScript is set up before starting development.

### Testing (Firebase/Firestore)
- The `test/testFirestore.js` file is for testing Firestore access; it imports helpers from `src/services/firebase.ts`.
- Firestore collections in use for tests: `users`, `events`, `invites`, `links`, and subcollection `attendees` under `events`.

### Changelog
- v1.1.0: Added Firebase service integration, TypeScript configuration, Firestore test utilities in `/test`.
- v1.0.0: Project initialization (Expo 54, RN 0.81, React 19). Added `HomeScreen` scaffold.

### Author
- Daniel Kiss (Thesis project owner)
