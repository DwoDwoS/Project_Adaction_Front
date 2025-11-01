import { useState } from "react";
import { API_ENDPOINTS } from "../config/api";
import "/src/App.css";

function CreateVolunteer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");

    const volunteersForm = { firstname, lastname, email, password, location };

    try {
      const response = await fetch(API_ENDPOINTS.volunteers, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(volunteersForm),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du bénévole");
      }

      setSuccessMessage(
        `Le bénévole ${firstname} ${lastname} a bien été ajouté !`
      );

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      setSuccessMessage("Une erreur s'est produite lors de l'ajout.");
    } finally {
      setLoading(false);
    }
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
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-plus"
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
                className={`alert ${
                  successMessage.includes("erreur") ? "alert-error" : "alert-success"
                }`}
              >
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label>Prénom *</label>
              <input
                type="text"
                required
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                disabled={loading}
              />

              <label>Nom *</label>
              <input
                type="text"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                disabled={loading}
              />

              <label>Email *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <label>Mot de passe *</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                minLength="6"
              />

              <label>Localisation *</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading}
              />

              <div className="modal-actions">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Ajout en cours..." : "Ajouter"}
                </button>
                <button
                  type="button"
                  className="submit-btn manage-btn"
                  onClick={handleClose}
                  disabled={loading}
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