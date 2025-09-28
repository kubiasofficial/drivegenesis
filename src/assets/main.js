import { auth } from '../../public/firebase.js';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, updateProfile } from "firebase/auth";

const db = getFirestore();

// Načtení uživatele po přihlášení
onAuthStateChanged(auth, async (user) => {
  if (user) {
    document.getElementById('profile-nick').textContent = user.displayName || user.email;
    if (user.photoURL) {
      document.getElementById('profile-img').src = user.photoURL;
    }
    // Načtení dat z Firestore (pokud existují)
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      if (data.nick) document.getElementById('profile-nick').textContent = data.nick;
      if (data.photoURL) document.getElementById('profile-img').src = data.photoURL;
    }
  } else {
    window.location.href = 'index.html'; // Pokud není přihlášen, přesměruj na login
  }
});

// Uložení změn profilu
window.saveProfile = async function() {
  const user = auth.currentUser;
  if (!user) return;
  const newNick = document.getElementById('edit-nick').value;
  const imgInput = document.getElementById('edit-img');
  let photoURL = user.photoURL;

  // Pokud je nahrán nový obrázek, převedeme ho na base64 (pro demo, v praxi použij cloud storage)
  if (imgInput.files[0]) {
    const reader = new FileReader();
    reader.onload = async function(e) {
      photoURL = e.target.result;
      await updateProfile(user, { displayName: newNick, photoURL });
      await setDoc(doc(db, 'users', user.uid), { nick: newNick, photoURL });
      document.getElementById('profile-nick').textContent = newNick;
      document.getElementById('profile-img').src = photoURL;
      document.getElementById('edit-profile-modal').style.display = 'none';
    };
    reader.readAsDataURL(imgInput.files[0]);
  } else {
    await updateProfile(user, { displayName: newNick });
    await setDoc(doc(db, 'users', user.uid), { nick: newNick, photoURL });
    document.getElementById('profile-nick').textContent = newNick;
    document.getElementById('edit-profile-modal').style.display = 'none';
  }
};
