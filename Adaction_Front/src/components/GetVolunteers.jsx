import { useEffect, useState, useMemo } from "react";
import CreateVolunteer from "./CreateVolunteer";
import VolunteersFilters from "./VolunteersFilters.jsx";

function GetVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [cities, setCities] = useState([]);
  const [city_id, setCity_id] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    fetch("http://localhost:8080/api/cities")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((err) => console.error("Erreur de fetch cities :", err));
  }, []);

  const filteredVolunteers = useMemo(() => {
    return volunteers.filter((volunteer) => {
      const matchesSearch = searchTerm === "" || 
        volunteer.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        volunteer.lastname?.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCity = true;
        if (city_id && city_id !== "") {
          const selectedCity = cities.find(city => city.id.toString() === city_id);
          if (selectedCity) {
            matchesCity = volunteer.location === selectedCity.name;
          }
        }

      return matchesSearch && matchesCity;
    });
  }, [volunteers, searchTerm, city_id, cities]);

  return (
    <main className="main-content">
      <div className="card">
        <div className="volunteers-actions">
          <CreateVolunteer />
          <VolunteersFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            city_id={city_id}
            setCity_id={setCity_id}
            cities={cities}
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
                    <button className="action-btn edit-btn">
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
            ))
          ) : (
            <p>
              {filteredVolunteers.length === 0 
                ? "Aucun bénévole trouvé." 
                : "Aucun bénévole ne correspond aux critères de recherche."}</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default GetVolunteers;
