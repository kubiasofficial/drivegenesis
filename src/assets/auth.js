// import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

// Registrace
const registerForm = document.getElementById('register-form');
if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const nickname = document.getElementById('reg-nick').value;
    try {
  const userCredential = await createUserWithEmailAndPassword(window.auth, email, password);
      // Nastavíme přezdívku do profilu
  await updateProfile(userCredential.user, { displayName: nickname });
      alert('Registrace úspěšná!');
      // Zde můžeš uložit další data do Firestore
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Tento účet je již registrován.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Neplatný email.');
      } else if (error.code === 'auth/weak-password') {
        alert('Heslo je příliš slabé (min. 6 znaků).');
      } else {
        alert(error.message);
      }
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
  const userCredential = await signInWithEmailAndPassword(window.auth, email, password);
      alert('Přihlášení úspěšné!');
      window.location.href = 'main.html'; // Přesměrování na hlavní stránku
    } catch (error) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        alert('Musíte se nejprve registrovat.');
      } else if (error.code === 'auth/wrong-password') {
        alert('Neplatné heslo.');
      } else if (error.code === 'auth/invalid-email') {
        alert('Neplatný email.');
      } else {
        alert(error.message);
      }
    }
  };
}

// Změna profilu
export async function updateUserProfile(displayName) {
  if (window.auth.currentUser) {
    await updateProfile(window.auth.currentUser, { displayName });
    alert('Profil upraven!');
  }
}
