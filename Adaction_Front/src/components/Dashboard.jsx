import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

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
        `http://localhost:8080/api/collects/monthly?year=${year}&month=${month}&volunteerId=${volId}`
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
          <div
            className="error-message"
            style={{ color: "red", padding: "1rem", marginBottom: "1rem" }}
          >
            Erreur: {error}
          </div>
        )}

        <div className="waste-grid">
          <div className="waste-card">
            <div className="waste-info">
              <h3>Verres</h3>
              <p className="waste-count">
                {loading ? "Chargement..." : `${wasteData.verre} collectés`}
              </p>
            </div>
          </div>

          <div className="waste-card">
            <div className="waste-info">
              <h3>Mégots de cigarettes</h3>
              <p className="waste-count">
                {loading
                  ? "Chargement..."
                  : `${wasteData.cigarettes} collectés`}
              </p>
            </div>
          </div>

          <div className="waste-card">
            <div className="waste-info">
              <h3>Plastique</h3>
              <p className="waste-count">
                {loading ? "Chargement..." : `${wasteData.plastique} collectés`}
              </p>
            </div>
          </div>

          <div className="waste-card">
            <div className="waste-info">
              <h3>Électronique</h3>
              <p className="waste-count">
                {loading
                  ? "Chargement..."
                  : `${wasteData.electronique} collectés`}
              </p>
            </div>
          </div>

          <div className="waste-card">
            <div className="waste-info">
              <h3>Autres</h3>
              <p className="waste-count">
                {loading ? "Chargement..." : `${wasteData.autre} collectés`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;