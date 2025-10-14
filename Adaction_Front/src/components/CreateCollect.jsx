import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '/src/App.css';

function CreateCollect() {
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [city_id, setCity_id] = useState("");
  const [glass_nb, setGlass_nb] = useState("");
  const [butt_nb, setButt_nb] = useState("");
  const [plastic_nb, setPlastic_nb] = useState("");
  const [electronics_nb, setElectronics_nb] = useState("");
  const [others_nb, setOthers_nb] = useState("");
  const [wastes_types, setWastes_types] = useState([]);
  const [volunteer, setVolunteer] = useState(1);
  const labelId1 = wastes_types.find((type) => type.id === 1)?.label;
  const labelId2 = wastes_types.find((type) => type.id === 2)?.label;
  const labelId3 = wastes_types.find((type) => type.id === 3)?.label;
  const labelId4 = wastes_types.find((type) => type.id === 4)?.label;
  const labelId5 = wastes_types.find((type) => type.id === 5)?.label;

  useEffect(() => {
    fetch("http://localhost:8080/api/cities")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then((data) => setCities(data))
      .catch((err) => console.error("Erreur de fetch cities :", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/wastetype")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then((data) => setWastes_types(data))
      .catch((err) => console.error("Erreur de fetch wastetype :", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const collectForm = {
      date,
      wastes_types,
      city_id: Number(city_id),
      glass_nb: Number(glass_nb),
      butt_nb: Number(butt_nb),
      plastic_nb: Number(plastic_nb),
      electronics_nb: Number(electronics_nb),
      others_nb: Number(others_nb),
      volunteer: { id: Number(volunteer) },
    };

    console.log("Données envoyées :", JSON.stringify(collectForm));

    fetch("http://localhost:8080/api/collects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectForm),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then(() => console.log("Nouvelle collecte ajoutée"))
      .catch((err) => console.error("Erreur POST :", err));
  };

  return (
    <div className="CreateCollect">
      <form onSubmit={handleSubmit}>
        <div className="main-content">
          <div className="card">
            <div className="card">
              <h2 className="card-header">
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
                  class="lucide lucide-circle-alert"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" x2="12" y1="8" y2="12"></line>
                  <line x1="12" x2="12.01" y1="16" y2="16"></line>
                </svg>
                Enregistrer une collecte
              </h2>
              <div className="form-container">
                <div>
                  <label className="form-label">Date *</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
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
                      class="lucide lucide-map-pin text-gray-600"
                      aria-hidden="true"
                    >
                      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      Localisation
                    </span>
                  </div>
                  <select
                    name="city"
                    id="city"
                    required
                    value={city_id}
                    onChange={(e) => setCity_id(e.target.value)}
                  >
                    <option value="">-- Sélectionnez une ville --</option>
                    {cities.map((city_id) => (
                      <option key={city_id.id} value={city_id.id}>
                        {city_id.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Type de déchet *</label>
                  <div className="waste-types-grid">
                    <div>
                      <button
                        type="button"
                        className="waste-type-btn"
                        required
                        placeholder="Verre"
                        value={glass_nb}
                        onChange={(e) => setGlass_nb(e.target.value)}
                      >
                        {labelId3}
                      </button>
                      <div className="flex items-center gap-2">
                        <button className="waste-type-btn">
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
                            class="lucide lucide-minus text-gray-400"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                          </svg>{" "}
                        </button>
                        <input
                          min="0"
                          className="w-16 text-center"
                          type="number"
                          value=""
                        ></input>
                        <button className="waste-type-btn">
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
                            class="lucide lucide-plus text-gray-600"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <input
            type="number"
            required
            placeholder="Mégots"
            value={butt_nb}
            onChange={(e) => setButt_nb(e.target.value)}
          />
          <input
            type="number"
            required
            placeholder="Plastique"
            value={plastic_nb}
            onChange={(e) => setPlastic_nb(e.target.value)}
          />
          <input
            type="number"
            required
            placeholder="Électronique"
            value={electronics_nb}
            onChange={(e) => setElectronics_nb(e.target.value)}
          />
          <input
            type="number"
            required
            placeholder="Autres"
            value={others_nb}
            onChange={(e) => setOthers_nb(e.target.value)}
          />

          <button>Enregistrer</button>
        </div>
        <input
          type="hidden"
          value={volunteer}
          onChange={(e) => setVolunteer(e.target.value)}
        />
      </form>
    </div>
  );
}

export default CreateCollect;
