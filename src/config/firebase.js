
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbGKRUlOg3MVBaO7DhXVX0R5lBbqA9I_c",
  authDomain: "crud-f3b7f.firebaseapp.com",
  projectId: "crud-f3b7f",
  storageBucket: "crud-f3b7f.appspot.com",
  messagingSenderId: "255856466932",
  appId: "1:255856466932:web:e683f0327eb04b061fb7a1",
  measurementId: "G-FM2CC9L48R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const db = getFirestore(app);