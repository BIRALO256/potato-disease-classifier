// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS2ko8FYxfKtZoWfEDzsJWfgXqhe0k29w",
  authDomain: "potato-disease-classifier-app.firebaseapp.com",
  projectId: "potato-disease-classifier-app",
  storageBucket: "potato-disease-classifier-app.firebasestorage.app",
  messagingSenderId: "292209475991",
  appId: "1:292209475991:web:cf62284249013c035344d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up authentication and provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
