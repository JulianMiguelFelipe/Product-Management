// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth();

  // If Supabase is still checking the session, show a loading message
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  // If there is no active session, kick them back to the login page
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // If they are logged in, allow them to see the page!
  return children;
}