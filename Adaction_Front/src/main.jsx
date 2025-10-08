import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CreateVolunteer from './components/CreateVolunteer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CreateVolunteer/>
    <App />
  </StrictMode>,
)
