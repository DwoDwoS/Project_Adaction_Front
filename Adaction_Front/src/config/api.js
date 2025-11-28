const API_URL = import.meta.env.VITE_API_URL || '';
export default API_URL;

export const API_ENDPOINTS = {
  base: API_URL,
  volunteers: `${API_URL}/api/volunteers`,
  login: `${API_URL}/api/auth/login`,
  cities: `${API_URL}/api/cities`,
  wasteTypes: `${API_URL}/api/wastetype`,
  collects: `${API_URL}/api/collects`,
  associations: `${API_URL}/api/associations`,
};