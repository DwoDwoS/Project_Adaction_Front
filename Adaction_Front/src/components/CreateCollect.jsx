import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "/src/App.css";

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
  const [volunteer, setVolunteer] = useState(null);
  const [volunteerName, setVolunteerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const labelId1 = wastes_types.find((type) => type.id === 1)?.label;
  const labelId2 = wastes_types.find((type) => type.id === 2)?.label;
  const labelId3 = wastes_types.find((type) => type.id === 3)?.label;
  const labelId4 = wastes_types.find((type) => type.id === 5)?.label;
  const labelId5 = wastes_types.find((type) => type.id === 6)?.label;
  const increment = (setter, value) => setter(Number(value) + 1);
  const decrement = (setter, value) => setter(Math.max(0, value - 1));
  useEffect(() => {
    const storedVolunteerId = sessionStorage.getItem("volunteerId");
    const storedVolunteerName = sessionStorage.getItem("volunteerName");

    if (storedVolunteerId) {
      setVolunteer(parseInt(storedVolunteerId));
      setVolunteerName(storedVolunteerName || "Volontaire");
    }
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

    try {
      const response = await fetch("http://localhost:8080/api/collects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectForm),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement de la collecte");
      }

      await response.json();
      console.log("Nouvelle collecte ajoutée");
      setSuccess(true);

      setDate("");
      setCity_id("");
      setGlass_nb("");
      setButt_nb("");
      setPlastic_nb("");
      setElectronics_nb("");
      setOthers_nb("");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      console.error("Erreur POST :", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
                    value={date}
                    disabled={loading}
                    onChange={(e) => setDate(e.target.value)}
                    required
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
                    disabled={loading}
                  >
                    <option value="">-- Sélectionnez une ville --</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
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
                        onClick={() => increment(setButt_nb, butt_nb)}
                      >
                        {labelId1}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => decrement(setButt_nb, butt_nb)}
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
                          value={butt_nb}
                          onChange={(e) => setButt_nb(Number(e.target.value))}
                        ></input>
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => increment(setButt_nb, butt_nb)}
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
                            class="lucide lucide-plus text-gray-600"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="waste-type-btn"
                        onClick={() => increment(setPlastic_nb, plastic_nb)}
                      >
                        {labelId2}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => decrement(setPlastic_nb, plastic_nb)}
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
                          value={plastic_nb}
                          onChange={(e) =>
                            setPlastic_nb(Number(e.target.value))
                          }
                        ></input>
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => increment(setPlastic_nb, plastic_nb)}
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
                            class="lucide lucide-plus text-gray-600"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="waste-type-btn"
                        required
                        placeholder="Verre"
                        value={glass_nb}
                        disabled={loading}
                        min="0"
                        onClick={() => increment(setGlass_nb, glass_nb)}
                      >
                        {labelId3}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => decrement(setGlass_nb, glass_nb)}
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
                          value={glass_nb}
                          onChange={(e) => setGlass_nb(Number(e.target.value))}
                        ></input>
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => increment(setGlass_nb, glass_nb)}
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
                            class="lucide lucide-plus text-gray-600"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="waste-type-btn"
                        required
                        placeholder="Verre"
                        value={electronics_nb}
                        disabled={loading}
                        min="0"
                        onClick={() =>
                          increment(setElectronics_nb, electronics_nb)
                        }
                      >
                        {labelId4}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() =>
                            decrement(setElectronics_nb, electronics_nb)
                          }
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
                          value={electronics_nb}
                          onChange={(e) =>
                            setElectronics_nb(Number(e.target.value))
                          }
                        ></input>
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() =>
                            increment(setElectronics_nb, electronics_nb)
                          }
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
                            class="lucide lucide-plus text-gray-600"
                            aria-hidden="true"
                          >
                            <path d="M5 12h14"></path>
                            <path d="M12 5v14"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="waste-type-btn"
                        required
                        value={others_nb}
                        onChange={(e) => setOthers_nb(e.target.value)}
                        disabled={loading}
                        min="0"
                        onClick={() => increment(setOthers_nb, others_nb)}
                      >
                        {labelId5}
                      </button>
                      <div className="flex items-center gap-2">
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => decrement(setOthers_nb, others_nb)}
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
                          value={others_nb}
                          onChange={(e) => setOthers_nb(Number(e.target.value))}
                        ></input>
                        <button
                          className="waste-type-btn"
                          type="button"
                          onClick={() => increment(setOthers_nb, others_nb)}
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
          
            <button className="submit-btn" disabled={loading}>
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
                class="lucide lucide-save"
                aria-hidden="true"
              >
                <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
              </svg>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCollect;
