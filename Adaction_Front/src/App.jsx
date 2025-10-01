import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [volunteers, setVolunteers] = useState(null)

  useEffect(() => {
    fetch("/Adaction/Volunteers") 
      .then(res => res.json())
      .then(data => setVolunteers(data))
      .catch(err => console.error(err));
  }, []);

  return (
<div>
      <h1>Liste des bénévoles</h1>
      <ul>
        {volunteers.map(v => (
          <li key={v.id}>{v.firstname} {v.lastname} - {v.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;