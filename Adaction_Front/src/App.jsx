import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/hello") 
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Message du backend :</h1>
      <p>{data ? JSON.stringify(data) : "Chargement..."}</p>
    </div>
  );
}

export default App;