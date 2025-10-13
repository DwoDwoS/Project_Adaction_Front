import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css';

import App from './App.jsx';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import CreateCollect from './components/CreateCollect.jsx'; 
// import CreateDonation from './components/CreateDonation.jsx';
import CreateVolunteer from './components/CreateVolunteer.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="collects" element={<CreateCollect />} />
          {/* <Route path="donations" element={<CreateDonation />} /> */}
        <Route path="volunteers" element={<CreateVolunteer />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
