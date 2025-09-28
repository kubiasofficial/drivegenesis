const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { initializeApp } = require('firebase/app');
const { getFirestore, setDoc, doc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDLJeZVZqOorFqE5-__TJo8VIuyBOT0iFQ",
  authDomain: "drivegenesis-4d18e.firebaseapp.com",
  projectId: "drivegenesis-4d18e",
  storageBucket: "drivegenesis-4d18e.firebasestorage.app",
  messagingSenderId: "734857047849",
  appId: "1:734857047849:web:4545c735b306b093419138"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send('Missing code');

  // 1. Výměna code za token
  const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: '1421789455072890881',
      client_secret: 'Gvqrfha9_gbWODjchhJxhMz6_3nCaBVS',
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'https://drivegenesis.vercel.app'
    })
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) return res.status(400).send('Token error');

  // 2. Získání uživatelských dat
  const userRes = await fetch('https://discord.com/api/users/@me', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` }
  });
  const userData = await userRes.json();

  // 3. Zápis do Firestore
  await setDoc(doc(db, 'users', userData.id), {
    username: userData.username,
    discordId: userData.id,
    email: userData.email
  });

  res.redirect('/?user=' + userData.username);
};