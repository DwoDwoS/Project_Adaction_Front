import { useEffect, useState } from 'react'
import '/src/App.css'

function App() {
  const [wastes_types, setWastes_types] = useState([])

  useEffect(() => {
    fetch("http://localhost:8080/api/wastetype")
      .then(res => {
        if (!res.ok) {
          throw new Error("Erreur serveur : " + res.status);
        }
        return res.json();
      })
      .then(data => setWastes_types(data))
      .catch(err => console.error("Erreur de fetch :", err));
  }, []);

  return (
    <div>
      <header className="header">Adaction</header>
      <ul>
        {wastes_types.length > 0 ? (
          wastes_types.map(w => (
            <li key={w.id}>
              {w.label}
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