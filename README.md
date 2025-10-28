# Convora

A thesis project built with Expo and React Native.

### Overview
Convora is a mobile application developed as a university thesis project. This README is a living document being updated throughout the project to track setup, architecture, features, research decisions, and milestones.

### Tech Stack
- React Native 0.81 (Expo SDK 54)
- React 19
- Expo (Managed workflow)

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
├─ assets/
├─ src/
│  ├─ components/
│  ├─ navigation/
│  ├─ screens/
│  │  ├─ CalendarScreen.js
│  │  ├─ EventCreateScreen.js
│  │  ├─ EventDetailScreen.js
│  │  ├─ HomeScreen.js
│  │  ├─ LoginScreen.js
│  │  └─ ProfileScreen.js
│  ├─ services/
│  └─ utils/
```

### App Entry
- `App.js` renders `HomeScreen` from `src/screens/HomeScreen.js`.
- Expo configuration is in `app.json`.

### Testing (placeholder)

### Changelog
- v1.0.0: Project initialization (Expo 54, RN 0.81, React 19). Added `HomeScreen` scaffold.

### Author
- Daniel Kiss (Thesis project owner)
