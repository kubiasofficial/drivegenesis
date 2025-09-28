
window.saveProfile = async function() {
  const nickname = document.getElementById('edit-nick').value;
  await updateUserProfile(nickname);
  document.getElementById('profile-nick').textContent = nickname;
  document.getElementById('edit-profile-modal').style.display = 'none';
}

window.onload = function() {
  if (auth.currentUser) {
    document.getElementById('profile-nick').textContent = auth.currentUser.displayName || 'Uživatel';
  }
}
