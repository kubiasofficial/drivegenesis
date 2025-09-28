// Firebase inicializace pro CDN (použij v HTML <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script> atd.)
const firebaseConfig = {
  apiKey: "AIzaSyDLJeZVZqOorFqE5-__TJo8VIuyBOT0iFQ",
  authDomain: "drivegenesis-4d18e.firebaseapp.com",
  projectId: "drivegenesis-4d18e",
  storageBucket: "drivegenesis-4d18e.firebasestorage.app",
  messagingSenderId: "734857047849",
  appId: "1:734857047849:web:4545c735b306b093419138"
};

firebase.initializeApp(firebaseConfig);
window.auth = firebase.auth();
window.db = firebase.firestore();