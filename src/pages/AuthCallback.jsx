// src/pages/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCallback() {
  const { session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the AuthContext successfully detects the user's session, 
    // automatically push them into the app.
    if (session) {
      navigate('/dashboard');
    }
  }, [session, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      {/* THIS IS THE SPINNER */}
      <div className="w-16 h-16 mb-6 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
      
      <h2 className="text-2xl font-bold text-gray-800">Authenticating...</h2>
      <p className="mt-2 text-gray-600">Please wait while we establish your secure session.</p>
    </div>
  );
}