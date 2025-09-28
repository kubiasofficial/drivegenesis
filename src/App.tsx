
import './App.css'

function App() {
  return (
    <div className="dark-bg" style={{minHeight: '100vh', paddingTop: '5vh'}}>
      <h1 style={{color: '#fff', textAlign: 'center', fontSize: '2.5rem', marginBottom: '1.5rem'}}>Vítejte!</h1>
      <p style={{color: '#eebbc3', textAlign: 'center', fontSize: '1.2rem', marginBottom: '2rem'}}>Vyberte si, zda jste nový nebo stávající uživatel:</p>
      <div className="button-group" style={{display: 'flex', justifyContent: 'center', gap: '2rem'}}>
        <button className="login-btn">Přihlásit se</button>
        <button className="register-btn">Registrovat</button>
      </div>
    </div>
  )
}

export default App
