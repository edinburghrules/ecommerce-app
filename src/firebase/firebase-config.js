// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyD7esNZPhHbhhW3KQQH7dXey70vsv2iyvw',
  authDomain: 'e-commerce-app-9b649.firebaseapp.com',
  projectId: 'e-commerce-app-9b649',
  storageBucket: 'e-commerce-app-9b649.appspot.com',
  messagingSenderId: '42157930373',
  appId: '1:42157930373:web:ec37b28e1209ba863b36ec',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize database
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

export { auth, storage, db };
