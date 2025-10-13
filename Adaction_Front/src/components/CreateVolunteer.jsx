import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import '/src/App.css'

function CreateVolunteer() {
  const [volunteers, setVolunteers] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  // Charger la liste au démarrage
  useEffect(() => {
    fetch("http://localhost:8080/api/volunteers")
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur serveur : " + res.status);
        }
        return res.json();
      })
      .then(data => setVolunteers(data))
      .catch(err => console.error("Erreur de fetch :", err));
  }, []);

  //Requête POST
   const handleSubmit = (e) => {
    e.preventDefault();
    const volunteersForm  = { firstname, lastname, email, password, location};
    console.log(volunteersForm);

    fetch("http://localhost:8080/api/volunteers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteersForm)
    }).then(() => {
        console.log("New volunteer added");
      })
  };

  return (
    <div className="CreateVolunteer">
      <h1>Ajouter un.e bénévole</h1>
      <form onSubmit={handleSubmit}>
        <label>Prénom</label>
        <input 
        type="text" 
        required 
        value={firstname}
        onChange={(e)=> setFirstname(e.target.value)}
        />
        <label>Nom</label>
        <input 
        type="text" 
        required 
        value={lastname}
        onChange={(e)=> setLastname(e.target.value)}
        />
        <label>Email</label>
        <input 
        type="text" 
        required 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
        <label>Mot de passe</label>
        <input 
        type="text" 
        required 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        />
        <label>Localisation</label>
        <input 
        type="text" 
        required 
        value={location}
        onChange={(e)=> setLocation(e.target.value)}
        />
        <button>Ajouter</button>
        <button>Annuler</button>
        <p>{firstname}</p>
      </form>
    </div>
  );
}

export default CreateVolunteer;