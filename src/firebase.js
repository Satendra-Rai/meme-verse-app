import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXP0N2ZI6IwUQrCx6zSc8YQwkipEqbHtA",
  authDomain: "sattu-8650f.firebaseapp.com",
  projectId: "sattu-8650f",
  storageBucket: "sattu-8650f.appspot.com",
  messagingSenderId: "984317034349",
  appId: "1:984317034349:web:c167d990b36b0aa4596464"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore Database

export { db };
