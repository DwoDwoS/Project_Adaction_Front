import { useState } from 'react'
import { useNavigate } from 'react-router'
import '/src/App.css'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const loginForm = {
      username: username,
      password: password
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      })

      if (!response.ok) {
        throw new Error("Identifiants incorrects")
      }

      const data = await response.json()
      
      sessionStorage.setItem('volunteerId', data.id)
      sessionStorage.setItem('volunteerName', data.name || username)
      sessionStorage.setItem('isAuthenticated', 'true')
      
      navigate('/dashboard')
    } catch (err) {
      console.error("Erreur lors de la connexion:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content">
      <div className="card">
        <h2 className='card-header'>Connexion</h2>
        {error && (
          <div style={{ color: 'red', padding: '0.5rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form className='form-container' onSubmit={handleSubmit}>
          <label className='form-label'>Prénom *</label>
          <input 
            type="text" 
            placeholder='Votre prénom'
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
          <label className='form-label'>Mot de passe *</label>
          <input 
            type="password" 
            placeholder='Votre mot de passe'
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <button className='submit-btn' type="submit" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
          <button className='submit-btn manage-btn' type="button" onClick={() => navigate('/manageVolunteers')}>
            Gérer les bénévoles
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login