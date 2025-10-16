import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";

import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Dashboard from "./components/Dashboard.jsx";
import CreateCollect from "./components/CreateCollect.jsx";
import CreateDonation from "./components/CreateDonation.jsx";
import CreateVolunteer from "./components/CreateVolunteer.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PutVolunteer from "./components/PutVolunteer.jsx";
import Navbar from "./components/Navbar.jsx";
import NavbarVolunteersLeaderboard from "./components/NavbarVolunteersLeaderboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/manageVolunteers"
          element={
            <>
              <NavbarVolunteersLeaderboard />
              <CreateVolunteer />
              <App />
            </>
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navbar />
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collects"
          element={
            <ProtectedRoute>
              <Navbar />
              <CreateCollect />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donations"
          element={
            <ProtectedRoute>
              <Navbar />
              <CreateDonation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/volunteers"
          element={
            <ProtectedRoute>
              <Navbar />
              <CreateVolunteer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Navbar />
              <PutVolunteer />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
