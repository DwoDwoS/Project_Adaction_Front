import { useEffect, useState, useMemo } from "react";
import CreateVolunteer from "./CreateVolunteer";
import VolunteersFilters from "./VolunteersFilters.jsx";
import { useNavigate } from "react-router";

function GetVolunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez vous vraiment supprimer ce bénévole ?"
    );
    if (!confirmation) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/volunteers/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du bénévole.");
      }

      setVolunteers((prevVolunteers) =>
        prevVolunteers.filter((v) => v.id !== id)
      );

      setSuccessMessage("Le bénévole a bien été supprimé !");
      setTimeout(() => setSuccessMessage(""), 10000);
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setSuccessMessage("Une erreur s'est produite lors de la suppression.");
    }
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
    
    if (!response.ok) {
      throw new Error("Erreur lors de la mise à jour");
    }

    const volunteersResponse = await fetch("http://localhost:8080/api/volunteers");
    const volunteersData = await volunteersResponse.json();
    setVolunteers(Array.isArray(volunteersData) ? volunteersData : volunteersData.volunteers || []);

    setSuccessMessage(
      `Le bénévole ${firstname} ${lastname} a bien été modifié !`
    );

    setTimeout(() => {
      handleClose();
      navigate("/manageVolunteers");
    }, 2000);

  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
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

  const locations = useMemo(() => {
    const unique = [
      ...new Set(volunteers.map((v) => v.location).filter(Boolean)),
    ];
    return unique.sort();
  }, [volunteers]);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((v) => {
      const matchesSearch =
        searchTerm === "" ||
        v.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.lastname?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLocation = location === "" || v.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [volunteers, searchTerm, location]);

  return (
    <main className="main-content">
      <div className="card">
        <div className="volunteers-actions">
          <CreateVolunteer />
          <VolunteersFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            location={location}
            setLocation={setLocation}
            locations={locations}
          />
        </div>
        <div className="volunteers-list">
          {filteredVolunteers.length > 0 ? (
            filteredVolunteers.map((v) => (
              <div key={v.id} className="volunteer-item">
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
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(v.id)}
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
            ))
          ) : (
            <p>
              {filteredVolunteers.length === 0
                ? "Aucun bénévole trouvé."
                : "Aucun bénévole ne correspond aux critères de recherche."}
            </p>
          )}
          {isModalOpen && (
            <div className="modal-overlay" onClick={handleClose}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
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
                    type="password"
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
          )}
        </div>
      </div>
    </main>
  );
}

export default GetVolunteers;