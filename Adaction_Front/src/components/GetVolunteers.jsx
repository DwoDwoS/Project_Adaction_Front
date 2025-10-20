import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateVolunteer from "./CreateVolunteer.jsx";

function GetVolunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [volunteerId, setVolunteerId] = useState(null);
  const [volunteerName, setVolunteerName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedVolunteerId = sessionStorage.getItem("volunteerId");
    const storedVolunteerName = sessionStorage.getItem("volunteerName");

    if (storedVolunteerId) {
      setVolunteerId(parseInt(storedVolunteerId));
      setVolunteerName(storedVolunteerName || "Volontaire");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/volunteers/${volunteerId}`, {
      method: "DELETE",
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        location,
        email,
        password,
      }),
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/volunteers/${volunteerId}`,
        requestOptions
      );
      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      const data = await response.json();
      setVolunteers(data);
      setSuccessMessage(
        `Le bénévole ${firstname} ${lastname} a bien été modifié !`
      );

      setTimeout(() => {
        handleClose();
      }, 2000);

      navigate("/profil");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      setSuccessMessage("Une erreur s'est produite lors de la modification.");
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

  useEffect(() => {
    fetch("http://localhost:8080/api/volunteers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur : " + res.status);
        }
        return res.json();
      })
      .then((data) => setVolunteers(data))
      .catch((err) => console.error("Erreur de fetch :", err));
  }, []);

  return (
    <main className="main-content">
      <div className="card">
        <div>
          <CreateVolunteer />
        </div>
        <div className="volunteers-list">
          {volunteers.length > 0 ? (
            volunteers.map((v) => (
              <div key={v.id}>
                <div className="volunteer-item">
                  <div className="volunteer-info">
                    <h3>
                      {v.firstname} {v.lastname}
                    </h3>
                    <p>{v.location}</p>
                  </div>
                  <div className="volunteer-actions">
                    <button
                      className="action-btn edit-btn"
                      onClick={() => {
                        setVolunteerId(v.id);
                        setFirstname(v.firstname);
                        setLastname(v.lastname);
                        setEmail(v.email);
                        setLocation(v.location);
                        setPassword(v.password || "");
                        setIsModalOpen(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-pen"
                        aria-hidden="true"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                      </svg>
                    </button>
                    <button className="action-btn delete-btn">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-trash2 lucide-trash-2"
                        aria-hidden="true"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun bénévole trouvé.</p>
          )}
          {isModalOpen && (
            <div className="modal-overlay" onClick={handleClose}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="CreateVolunteer modal">
                  <h3>Modifier un.e bénévole</h3>

                  {successMessage && (
                    <div
                      style={{
                        padding: "12px",
                        marginBottom: "16px",
                        backgroundColor: successMessage.includes("erreur")
                          ? "#fee"
                          : "#d4edda",
                        color: successMessage.includes("erreur")
                          ? "#c00"
                          : "#155724",
                        borderRadius: "4px",
                        border: `1px solid ${
                          successMessage.includes("erreur") ? "#fcc" : "#c3e6cb"
                        }`,
                      }}
                    >
                      {successMessage}
                    </div>
                  )}

                  <form onSubmit={handleUpdate}>
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
                        Modifier
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
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default GetVolunteers;
