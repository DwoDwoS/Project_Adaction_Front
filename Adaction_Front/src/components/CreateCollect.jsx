import { useEffect, useState } from 'react';
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
  const [volunteer, setVolunteer] = useState(1);

  useEffect(() => {
    fetch("http://localhost:8080/api/cities")
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then(data => setCities(data))
      .catch(err => console.error("Erreur de fetch cities :", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const collectForm = {
      date,
      city_id: Number(city_id),
      glass_nb: Number(glass_nb),
      butt_nb: Number(butt_nb),
      plastic_nb: Number(plastic_nb),
      electronics_nb: Number(electronics_nb),
      others_nb: Number(others_nb),
      volunteer: { id: Number(volunteer) }
    };

    console.log("Données envoyées :", JSON.stringify(collectForm));

    fetch("http://localhost:8080/api/collects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(collectForm)
    })
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then(() => console.log("Nouvelle collecte ajoutée"))
      .catch(err => console.error("Erreur POST :", err));
  };

  return (
    <div className="CreateCollect">
      <h1>Enregistrer une collecte</h1>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={volunteer} onChange={(e) => setVolunteer(e.target.value)} />
        <label>Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Nom de la ville</label>
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

        <label>Type de déchets</label>
        <input
          type="number"
          required
          placeholder="Verre"
          value={glass_nb}
          onChange={(e) => setGlass_nb(e.target.value)}
        />
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
      </form>
    </div>
  );
}

export default CreateCollect;