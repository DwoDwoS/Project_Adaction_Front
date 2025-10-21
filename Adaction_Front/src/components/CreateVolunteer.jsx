import { useState } from "react";
import "/src/App.css";

function CreateVolunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const volunteersForm = { firstname, lastname, email, password, location };
    console.log(volunteersForm);

    fetch("http://localhost:8080/api/volunteers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteersForm),
    })
      .then(() => {
        setSuccessMessage(
          `Le bénévole ${firstname} ${lastname} a bien été ajouté !`
        );

        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout:", error);
        setSuccessMessage("Une erreur s'est produite lors de l'ajout.");
      });
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setLocation("");
    setSuccessMessage("");
  };

  return (
    <div className="CreateVolunteer">
      <button
        onClick={() => setIsModalOpen(true)}
        className="modal-actions submit-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user-plus"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" x2="19" y1="8" y2="14"></line>
          <line x1="22" x2="16" y1="11" y2="11"></line>
        </svg>
        Ajouter un.e bénévole
      </button>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleClose}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Ajouter un.e bénévole</h3>

            {successMessage && (
              <div
                style={{
                  padding: "12px",
                  marginBottom: "16px",
                  backgroundColor: successMessage.includes("erreur")
                    ? "#fee"
                    : "#d4edda",
                  color: successMessage.includes("erreur") ? "#c00" : "#155724",
                  borderRadius: "4px",
                  border: `1px solid ${
                    successMessage.includes("erreur") ? "#fcc" : "#c3e6cb"
                  }`,
                }}
              >
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label>Prénom</label>
              <input
                type="text"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <label>Nom</label>
              <input
                type="text"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <label>Email</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Mot de passe</label>
              <input
                type="text"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Localisation</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <div className="modal-actions">
                <button type="submit" className="submit-btn">
                  Ajouter
                </button>
                <button
                  type="button"
                  className="submit-btn manage-btn"
                  onClick={handleClose}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateVolunteer;