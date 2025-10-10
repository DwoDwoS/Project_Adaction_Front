import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.jsx'
// import CreateVolunteer from './components/CreateVolunteer.jsx'
// import CreateCollect from './components/CreateCollect.jsx'
// import GetWastesTypes from './components/GetWastesTypes.jsx'
import Login from './components/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login/>
  </StrictMode>,
)
