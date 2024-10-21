import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmaL-BvvM_4gEEfvEvEwVsjS8YW1pCatM",
  authDomain: "ecommerce-proyecto-d501f.firebaseapp.com",
  projectId: "ecommerce-proyecto-d501f",
  storageBucket: "ecommerce-proyecto-d501f.appspot.com",
  messagingSenderId: "958454350787",
  appId: "1:958454350787:web:ac8ef783983ed5535c3376",
  measurementId: "G-MZKBRDLPP5",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
