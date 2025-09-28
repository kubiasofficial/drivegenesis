import { auth, db } from '../src/assets/firebase.js';
import { updateUserProfile } from '../src/assets/auth.js';

window.saveProfile = async function() {
  const nickname = document.getElementById('nickname-input').value;
  const photoURL = document.getElementById('photo-input').value;
  try {
    await updateUserProfile(nickname, photoURL);
    document.getElementById('profile-nickname').textContent = nickname;
    document.getElementById('profile-img').src = photoURL;
    alert('Profil byl úspěšně upraven!');
    document.getElementById('profile-modal').style.display = 'none';
  } catch (error) {
    alert('Chyba při ukládání profilu: ' + error.message);
  }
}

window.onload = function() {
  if (auth.currentUser) {
    document.getElementById('profile-nickname').textContent = auth.currentUser.displayName || 'Uživatel';
    document.getElementById('profile-img').src = auth.currentUser.photoURL || 'images/default.png';
  }
  document.getElementById('edit-profile-btn').onclick = function() {
    document.getElementById('profile-modal').style.display = 'block';
    document.getElementById('nickname-input').value = auth.currentUser.displayName || '';
    document.getElementById('photo-input').value = auth.currentUser.photoURL || '';
  }
  document.getElementById('close-modal-btn').onclick = function() {
    document.getElementById('profile-modal').style.display = 'none';
  }
}
