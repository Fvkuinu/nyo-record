// src/app/lib/firebase/client.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7dhZa4m75ZLmfcXu1ntfAZVt6ha0wFho",
    authDomain: "nyo-record.firebaseapp.com",
    projectId: "nyo-record",
    storageBucket: "nyo-record.appspot.com",
    messagingSenderId: "328925797883",
    appId: "1:328925797883:web:8c7cd61d9abe56394aff5e",
    measurementId: "G-DR96L8XRWV"
};
// Initialize Firebase app only once
let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApp(); // Use the already initialized Firebase app
}

// Export Firebase services
const firestore = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { firebaseApp, firestore, auth };
