import { Navigate } from 'react-router'

function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem('isAuthenticated')
  const volunteerId = sessionStorage.getItem('volunteerId')
  
  if (!isAuthenticated || !volunteerId) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute;