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
  const [volunteer, setVolunteer] = useState(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedVolunteerId = sessionStorage.getItem('volunteerId');
    const storedVolunteerName = sessionStorage.getItem('volunteerName');
    
    if (storedVolunteerId) {
      setVolunteer(parseInt(storedVolunteerId));
      setVolunteerName(storedVolunteerName || 'Volontaire');
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/cities")
      .then(res => {
        if (!res.ok) throw new Error("Erreur serveur : " + res.status);
        return res.json();
      })
      .then(data => setCities(data))
      .catch(err => console.error("Erreur de fetch cities :", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

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

    try {
      const response = await fetch("http://localhost:8080/api/collects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectForm)
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
        navigate('/dashboard');
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Enregistrer une collecte</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#666' }}>Connecté : <strong>{volunteerName}</strong></span>
          <button 
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: '#3b82f6', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Retour au Dashboard
          </button>
        </div>
      </div>

      {success && (
        <div style={{ 
          backgroundColor: '#10b981', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.375rem',
          marginBottom: '1rem' 
        }}>
          ✓ Collecte enregistrée avec succès ! Redirection en cours...
        </div>
      )}

      {error && (
        <div style={{ 
          backgroundColor: '#ef4444', 
          color: 'white', 
          padding: '1rem', 
          borderRadius: '0.375rem',
          marginBottom: '1rem' 
        }}>
          ✗ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          disabled={loading}
        />

        <label>Nom de la ville</label>
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

        <label>Type de déchets</label>
        <input
          type="number"
          required
          placeholder="Verre"
          value={glass_nb}
          onChange={(e) => setGlass_nb(e.target.value)}
          disabled={loading}
          min="0"
        />
        <input
          type="number"
          required
          placeholder="Mégots"
          value={butt_nb}
          onChange={(e) => setButt_nb(e.target.value)}
          disabled={loading}
          min="0"
        />
        <input
          type="number"
          required
          placeholder="Plastique"
          value={plastic_nb}
          onChange={(e) => setPlastic_nb(e.target.value)}
          disabled={loading}
          min="0"
        />
        <input
          type="number"
          required
          placeholder="Électronique"
          value={electronics_nb}
          onChange={(e) => setElectronics_nb(e.target.value)}
          disabled={loading}
          min="0"
        />
        <input
          type="number"
          required
          placeholder="Autres"
          value={others_nb}
          onChange={(e) => setOthers_nb(e.target.value)}
          disabled={loading}
          min="0"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </form>
    </div>
  );
}

export default CreateCollect;