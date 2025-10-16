import { useState } from 'react'
import '/src/App.css'

function CreateVolunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");


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

  const handleClose = () => { 
    setIsModalOpen(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setLocation("");
  };

  return (
    <div className="CreateVolunteer">
      <button onClick= {() => setIsModalOpen(true)} className="modal-actions submit-btn">
        Ajouter un.e bénévole
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="CreateVolunteer modal">
              <h3>Ajouter un.e bénévole</h3>
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
                <button type="submit">Ajouter</button>
                <button type="button" onClick={handleClose}>Annuler</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateVolunteer;