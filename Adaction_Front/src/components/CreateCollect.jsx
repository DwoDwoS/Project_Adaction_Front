import { useEffect, useState } from 'react';
import '/src/App.css';

function CreateCollect() {
  const [date, setDate] = useState("");
  const [cities, setCities] = useState([]);
  const [cityId, setCityId] = useState("");
  const [glassNb, setGlassNb] = useState("");
  const [buttNb, setButtNb] = useState("");
  const [plasticNb, setPlasticNb] = useState("");
  const [electronicsNb, setElectronicsNb] = useState("");
  const [othersNb, setOthersNb] = useState("");
  const [volunteers, setVolunteers] = useState(1);

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
      cityId: Number(cityId),
      glassNb: Number(glassNb),
      buttNb: Number(buttNb),
      plasticNb: Number(plasticNb),
      electronicsNb: Number(electronicsNb),
      othersNb: Number(othersNb)
    };

    console.log("Données envoyées :", collectForm);

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
        <input type="hidden" value={volunteers} onChange={(e) => setVolunteers(e.target.value)} />
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
          value={cityId}
          onChange={(e) => setCityId(e.target.value)}
        >
          <option value="">-- Sélectionnez une ville --</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <label>Type de déchets</label>
        <input
          type="number"
          required
          placeholder="Verre"
          value={glassNb}
          onChange={(e) => setGlassNb(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder="Mégots"
          value={buttNb}
          onChange={(e) => setButtNb(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder="Plastique"
          value={plasticNb}
          onChange={(e) => setPlasticNb(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder="Électronique"
          value={electronicsNb}
          onChange={(e) => setElectronicsNb(e.target.value)}
        />
        <input
          type="number"
          required
          placeholder="Autres"
          value={othersNb}
          onChange={(e) => setOthersNb(e.target.value)}
        />

        <button>Enregistrer</button>
      </form>
    </div>
  );
}

export default CreateCollect;