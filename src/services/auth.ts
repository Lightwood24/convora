import { auth, db } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

// regisztráció
export async function registerWithEmail(email: string, password: string, displayName: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // users/{uid} dokumentum létrehozása
  await setDoc(doc(db, 'users', cred.user.uid), {
    displayName,
    email,
    createdAt: serverTimestamp(),
  });

  try {
    await sendEmailVerification(cred.user);
  } catch (e) {
    console.warn("sendEmailVerification failed", e);
  }


  return cred.user;
}

// belépés
export async function loginWithEmail(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

// kijelentkezés
export async function logout() {
  await signOut(auth);
}
