import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

// Registrace
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert('Registrace úspěšná!');
      // Zde můžeš uložit další data do Firestore
    } catch (error) {
      alert(error.message);
    }
  };
}

// Přihlášení
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      alert('Přihlášení úspěšné!');
      // Zobrazit hlavní stránku s profilem
    } catch (error) {
      alert(error.message);
    }
  };
}

// Změna profilu
export async function updateUserProfile(displayName, photoURL) {
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName, photoURL });
    alert('Profil upraven!');
  }
}
