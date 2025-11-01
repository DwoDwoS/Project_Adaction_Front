import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import API_URL from "../config/api";

function Dashboard() {
  const [wasteData, setWasteData] = useState({
    verre: 0,
    cigarettes: 0,
    plastique: 0,
    electronique: 0,
    autre: 0,
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [volunteerId, setVolunteerId] = useState(null);
  const [volunteerName, setVolunteerName] = useState("GreenTrack");
  const navigate = useNavigate();

  const formatMonth = (date) => {
    const months = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const storedVolunteerId = sessionStorage.getItem("volunteerId");
    const storedVolunteerName = sessionStorage.getItem("volunteerName");

    if (!isAuthenticated || !storedVolunteerId) {
      navigate("/login");
      return;
    }

    setVolunteerId(parseInt(storedVolunteerId));
    setVolunteerName(storedVolunteerName || "Volontaire");
  }, [navigate]);

  const fetchWasteData = async (date, volId) => {
    if (!volId) return;

    setLoading(true);
    setError(null);

    try {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      const response = await fetch(
        `${API_URL}/api/collects/monthly?year=${year}&month=${month}&volunteerId=${volId}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await response.json();

      setWasteData({
        verre: data.verre || 0,
        cigarettes: data.cigarettes || 0,
        plastique: data.plastique || 0,
        electronique: data.electronique || 0,
        autre: data.autre || 0,
      });
    } catch (err) {
      console.error("Erreur:", err);
      setError(err.message);
      setWasteData({
        verre: 0,
        cigarettes: 0,
        plastique: 0,
        electronique: 0,
        autre: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (volunteerId) {
      fetchWasteData(currentDate, volunteerId);
    }
  }, [currentDate, volunteerId]);

  const goToPreviousMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const goToNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const wasteTypes = [
    { key: "verre", label: "Verres", icon: "🍾" },
    { key: "cigarettes", label: "Mégots de cigarettes", icon: "🚬" },
    { key: "plastique", label: "Plastique", icon: "♻️" },
    { key: "electronique", label: "Électronique", icon: "🔌" },
    { key: "autre", label: "Autres", icon: "🗑️" },
  ];

  return (
    <div className="main-content">
      <div className="card">
        <div className="dashboard-header">
          <h2 className="card-header">Bonjour {volunteerName} !</h2>
          <div className="month-navigation">
            <button
              className="month-nav-btn"
              onClick={goToPreviousMonth}
              aria-label="Mois précédent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-left"
                aria-hidden="true"
              >
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>
            <span className="current-month">{formatMonth(currentDate)}</span>
            <button
              className="month-nav-btn"
              onClick={goToNextMonth}
              aria-label="Mois suivant"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-chevron-right"
                aria-hidden="true"
              >
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: "1rem" }}>
            Erreur: {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state" style={{ padding: "2rem", textAlign: "center" }}>
            <p>Chargement des données...</p>
          </div>
        ) : (
          <div className="waste-grid">
            {wasteTypes.map(({ key, label, icon }) => (
              <div key={key} className="waste-card">
                <div className="waste-info">
                  <h3>
                    <span style={{ marginRight: "0.5rem" }}>{icon}</span>
                    {label}
                  </h3>
                  <p className="waste-count">
                    {wasteData[key]} collecté{wasteData[key] > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="dashboard-summary" style={{ marginTop: "1.5rem", padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px" }}>
            <h3 style={{ marginBottom: "0.5rem", fontSize: "1.1rem" }}>
              Total du mois
            </h3>
            <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#4CAF50" }}>
              {Object.values(wasteData).reduce((acc, val) => acc + val, 0)} déchets collectés
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;