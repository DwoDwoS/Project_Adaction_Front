import { useActionState, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "/src/App.css";
function PutVolunteer() {
  const [volunteer, setVolunteer] = useState([]);
  const [volunteerId, setVolunteerId] = useState(null);
  const [volunteerName, setVolunteerName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedVolunteerId = sessionStorage.getItem("volunteerId");
    const storedVolunteerName = sessionStorage.getItem("volunteerName");

    if (storedVolunteerId) {
      setVolunteerId(parseInt(storedVolunteerId));
      setVolunteerName(storedVolunteerName || "Volontaire");
    }
  }, []);

  useEffect(() => {
    if (!volunteerId) return;
    fetch(`http://localhost:8080/api/volunteers/${volunteerId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then((data) => {
        setVolunteer(data);
        setFirstname(data.firstname || "");
        setLastname(data.lastname || "");
        setLocation(data.location || "");
        setPassword(data.password || "");
      })
      .catch((err) => console.error("Erreur de fetch volunteers :", err));
  }, [volunteerId]);

  //   console.log(setVolunteer);
  const handleUpdate = async (e) => {
    e.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        location,
        email: volunteer.email,
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
      setVolunteer(data);
      console.log("Utilisateur mis à jour");

      navigate("/profil");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-content">
      <div className="card">
        <h2 className="card-header">Mon profil</h2>
        <form className="form-container" onSubmit={handleUpdate}>
          <div>
            <label className="form-label">Prénom</label>
            <input
              placeholder="Votre prénom"
              value={firstname}
              type="text"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Ville</label>
            <input
              type="text"
              placeholder="Votre ville"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className="form-label">Mot de passe</label>
            <input
              type="text"
              placeholder="Votre mot de passe"
              // value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
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
              class="lucide lucide-save"
              aria-hidden="true"
            >
              <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
              <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
              <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
            </svg>{" "}
            Mise à jour
          </button>
          <button
            type="button"
            className="submit-btn logout-btn"
            onClick={() => navigate("/login")}
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
              class="lucide lucide-log-out"
              aria-hidden="true"
            >
              <path d="m16 17 5-5-5-5"></path>
              <path d="M21 12H9"></path>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            </svg>{" "}
            Déconnexion
          </button>
        </form>
      </div>
    </div>
  );
}

export default PutVolunteer;
