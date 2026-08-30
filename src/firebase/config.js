// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAFn2Xv9nZxH6NUW0NugUKKAmgui7Yrxc",
  authDomain: "cosmos-49a0b.firebaseapp.com",
  projectId: "cosmos-49a0b",
  storageBucket: "cosmos-49a0b.firebasestorage.app",
  messagingSenderId: "341003916371",
  appId: "1:341003916371:web:ae7f7006c58b8f713de2a6",
  measurementId: "G-2Z90ZRQ0R1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);