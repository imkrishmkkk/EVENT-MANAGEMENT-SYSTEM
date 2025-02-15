// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "event-management-system-5794a.firebaseapp.com",
  projectId: "event-management-system-5794a",
  storageBucket: "event-management-system-5794a.firebasestorage.app",
  messagingSenderId: "783265738238",
  appId: "1:783265738238:web:0c80614f43b7ec06e064af"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);