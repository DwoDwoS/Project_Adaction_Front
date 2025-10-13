import { useEffect, useState } from 'react'
import '/src/App.css'

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginForm = {
      username: username,
      password: password
     }
    

    console.log("Données envoyées :", JSON.stringify(loginForm));

    fetch("http://localhost:8080/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then(() => console.log(`Bienvenue ${username}`))
      .catch(err => console.error("Erreur POST :", err));
  };
  return (
    <div>
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Votre prénom'required value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Prénom</label>
            <input type="password" placeholder='Votre mot de passe'required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className='submit-btn'>Se connecter</button>
            <button>Gérer les bénévoles</button>
        </form>
    </div>
  )
}
export default Login;