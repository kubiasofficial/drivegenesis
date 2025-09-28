import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLJeZVZqOorFqE5-__TJo8VIuyBOT0iFQ",
  authDomain: "drivegenesis-4d18e.firebaseapp.com",
  projectId: "drivegenesis-4d18e",
  storageBucket: "drivegenesis-4d18e.firebasestorage.app",
  messagingSenderId: "734857047849",
  appId: "1:734857047849:web:4545c735b306b093419138"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);