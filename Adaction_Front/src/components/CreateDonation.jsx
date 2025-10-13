import { useEffect, useState } from "react";
import "/src/App.css";

function CreateDonation() {
  const [associations, setAssociations] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState();
  const [image, setImage] = useState("");
  const association1 = associations.find((a) => a.id === 1);
  const association2 = associations.find((a) => a.id === 2);
  const association3 = associations.find((a) => a.id === 3);
  const association4 = associations.find((a) => a.id === 4);

  useEffect(() => {
    fetch("http://localhost:8080/api/associations")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erreur serveur : " + res.status);
        }
        return res.json();
      })
      .then((data) => setAssociations(data))
      .catch((err) => console.error("Erreur de fetch :", err));
  }, []);

  //Requête PUT à faire

  return (
    <div className="main-content">
      <div className="card">
        <h2 className="card-header">Faire un don</h2>
        <div className="points-display">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-gift"
            aria-hidden="true"
          >
            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
            <path d="M12 8v13"></path>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
            <rect x="3" y="8" width="18" height="4" rx="1"></rect>
            <path d="M12 8v13"></path>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
          </svg>
          <span>
            Points collectés :{/* Mettre les points de l'id qui s'est login */}
          </span>
        </div>
        <div className="association-grid">
          <div className="association-card">
            <div className="association-header">
              <span className="association-emoji">{association1 ? association1.image : "Chargement..."}</span>
              <h3>{association1 ? association1.name : "Chargement..."}</h3>
            </div>

            <p className="association-description">{association1 ? association1.description : "Chargement..."}</p>
            <div className="association-footer">
              <span className="points-required">{association1 ? association1.points : "Chargement..."} points</span>
              <button className="donate-btn">
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
                  class="lucide lucide-heart"
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span>Faire un don</span>
              </button>
            </div>
          </div>
          <div className="association-card">
            <div className="association-header">
              <span className="association-emoji">{association2 ? association2.image : "Chargement..."}</span>
              <h3>{association2 ? association2.name : "Chargement..."}</h3>
            </div>
            <p className="association-description">{association2 ? association2.description : "Chargement..."}</p>
            <div className="association-footer">
              <span className="points-required">{association2 ? association2.points : "Chargement..."} points</span>
              <button className="donate-btn">
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
                  class="lucide lucide-heart"
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span>Faire un don</span>
              </button>
            </div>
          </div>
          <div className="association-card">
            <div className="association-header">
              <span className="association-emoji">{association3 ? association3.image : "Chargement..."}</span>
              <h3>{association3 ? association3.name : "Chargement..."}</h3>
            </div>
            <p className="association-description">{association3 ? association3.description : "Chargement..."}</p>
            <div className="association-footer">
              <span className="points-required">{association3 ? association3.points : "Chargement..."} points</span>
              <button className="donate-btn">
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
                  class="lucide lucide-heart"
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span>Faire un don</span>
              </button>
            </div>
          </div>
          <div className="association-card">
            <div className="association-header">
              <span className="association-emoji">{association4 ? association4.image : "Chargement..."}</span>
              <h3>{association4 ? association4.name : "Chargement..."}</h3>
            </div>
            <p className="association-description">{association4 ? association4.description : "Chargement..."}</p>
            <div className="association-footer">
              <span className="points-required">{association4 ? association4.points : "Chargement..."} points</span>
              <button className="donate-btn">
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
                  class="lucide lucide-heart"
                  aria-hidden="true"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                <span>Faire un don</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateDonation;
