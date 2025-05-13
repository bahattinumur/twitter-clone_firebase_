// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase auth'un referansını alma
export const auth = getAuth(app);

// Google sağlayıcısını kurma
export const provider = new GoogleAuthProvider();

// Veritabanının referasnını alma
export const db = getFirestore(app);

// Dosya yüklme alanın referansını alma
export const storage = getStorage(app);
