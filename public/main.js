
window.saveProfile = async function() {
  const nickname = document.getElementById('edit-nick').value;
  await updateUserProfile(nickname);
  document.getElementById('profile-nick').textContent = nickname;
  document.getElementById('edit-profile-modal').style.display = 'none';
}

window.onload = function() {
  // Firebase Auth může být asynchronní, proto použijeme listener
  auth.onAuthStateChanged(function(user) {
    if (user && user.displayName) {
      document.getElementById('profile-nick').textContent = user.displayName;
    } else {
      document.getElementById('profile-nick').textContent = 'Uživatel';
    }
  });
}
