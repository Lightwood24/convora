import { db } from '../src/services/firebase';
import { collection, getDocs } from 'firebase/firestore';

// USERS
export async function testUsers() {
  const snap = await getDocs(collection(db, 'users'));
  console.log('=== USERS ===');
  snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
}

// EVENTS
export async function testEvents() {
  const snap = await getDocs(collection(db, 'events'));
  console.log('=== EVENTS ===');
  snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
}

// INVITES
export async function testInvites() {
  const snap = await getDocs(collection(db, 'invites'));
  console.log('=== INVITES ===');
  snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
}

// LINKS
export async function testLinks() {
  const snap = await getDocs(collection(db, 'links'));
  console.log('=== LINKS ===');
  snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
}

// ATTENDEES (subcollection az events alatt)
export async function testAttendees(eventId) {
  const snap = await getDocs(collection(db, 'events', eventId, 'attendees'));
  console.log(`=== ATTENDEES of ${eventId} ===`);
  snap.forEach(doc => console.log(doc.id, '=>', doc.data()));
}

// FIRESTORE RULES FOR TESTING
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /{doc=**} {
      allow read: if true;
      allow write: if false;
  }
}
*/

// TESTING CODE
/*
  useEffect(() => {
    (async () => {
      await testUsers();
      await testEvents();
      await testInvites();
      await testLinks();
      await testAttendees('demoEvent'); // demoEvent ID
    })();
  }, []);
*/