// Registrace
document.addEventListener('DOMContentLoaded', function() {
  // Registrace
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.onsubmit = function(e) {
      e.preventDefault();
      const email = document.getElementById('reg-email').value;
      const password = document.getElementById('reg-password').value;
      const nickname = document.getElementById('reg-nick').value;
      if (!window.auth || typeof window.auth.createUserWithEmailAndPassword !== 'function') {
        alert('Chyba: Firebase Auth není inicializováno.');
        return;
      }
      window.auth.createUserWithEmailAndPassword(email, password)
        .then(function(userCredential) {
          return userCredential.user.updateProfile({ displayName: nickname });
        })
        .then(function() {
          alert('Registrace úspěšná!');
        })
        .catch(function(error) {
          if (error.code === 'auth/email-already-in-use') {
            alert('Tento účet je již registrován.');
          } else if (error.code === 'auth/invalid-email') {
            alert('Neplatný email.');
          } else if (error.code === 'auth/weak-password') {
            alert('Heslo je příliš slabé (min. 6 znaků).');
          } else {
            alert(error.message);
          }
        });
    };
  }

  // Přihlášení
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.onsubmit = function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      if (!window.auth || typeof window.auth.signInWithEmailAndPassword !== 'function') {
        alert('Chyba: Firebase Auth není inicializováno.');
        return;
      }
      window.auth.signInWithEmailAndPassword(email, password)
        .then(function(userCredential) {
          alert('Přihlášení úspěšné!');
          window.location.href = 'main.html';
        })
        .catch(function(error) {
          if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
            alert('Musíte se nejprve registrovat.');
          } else if (error.code === 'auth/wrong-password') {
            alert('Neplatné heslo.');
          } else if (error.code === 'auth/invalid-email') {
            alert('Neplatný email.');
          } else {
            alert(error.message);
          }
        });
    };
  }
});

// Změna profilu - ponechte vně, pokud chcete, aby byla dostupná globálně
window.updateUserProfile = function(displayName) {
  if (!window.auth || !window.auth.currentUser) {
    alert('Chyba: Uživatel není přihlášen nebo Firebase Auth není inicializováno.');
    return;
  }
  window.auth.currentUser.updateProfile({ displayName: displayName })
    .then(function() {
      alert('Profil upraven!');
    })
    .catch(function(error) {
      alert('Chyba při úpravě profilu: ' + error.message);
    });
}
// Změna profilu - ponechte vně, pokud chcete, aby byla dostupná globálně
window.updateUserProfile = function(displayName) {
  if (!window.auth || !window.auth.currentUser) {
    alert('Chyba: Uživatel není přihlášen nebo Firebase Auth není inicializováno.');
    return;
  }
  window.auth.currentUser.updateProfile({ displayName: displayName })
    .then(function() {
      alert('Profil upraven!');
    })
    .catch(function(error) {
      alert('Chyba při úpravě profilu: ' + error.message);
    });
}
