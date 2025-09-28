import { auth, db } from '../src/assets/firebase.js';
import { updateUserProfile } from '../src/assets/auth.js';

window.saveProfile = async function() {
  const nickname = document.getElementById('edit-nick').value;
  const fileInput = document.getElementById('edit-img');
  let photoURL = auth.currentUser?.photoURL || './images/DriveGenesisbezpozadi.png';
  if (fileInput.files && fileInput.files[0]) {
    photoURL = URL.createObjectURL(fileInput.files[0]);
    document.getElementById('profile-img').src = photoURL;
  }
  await updateUserProfile(nickname, photoURL);
  document.getElementById('profile-nick').textContent = nickname;
  document.getElementById('edit-profile-modal').style.display = 'none';
}

window.onload = function() {
  if (auth.currentUser) {
    document.getElementById('profile-nick').textContent = auth.currentUser.displayName || 'Uživatel';
    document.getElementById('profile-img').src = auth.currentUser.photoURL || './images/DriveGenesisbezpozadi.png';
  }
}
