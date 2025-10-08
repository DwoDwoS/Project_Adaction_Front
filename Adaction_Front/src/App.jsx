import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [volunteers, setVolunteers] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/volunteers")
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur serveur : " + res.status);
        }
        return res.json();
      })
      .then(data => setVolunteers(data))
      .catch(err => console.error("Erreur de fetch :", err));
  }, []);

  return (
    <div>
      <h1>Liste des bénévoles</h1>
      <ul>
        {volunteers.length > 0 ? (
          volunteers.map(v => (
            <li key={v.id}>
              {v.firstname} {v.lastname} ({v.email})
            </li>
          ))
        ) : (
          <p>Aucun bénévole trouvé.</p>
        )}
      </ul>
    </div>
  );
}

export default App;