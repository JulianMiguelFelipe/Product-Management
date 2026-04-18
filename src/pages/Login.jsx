// src/pages/Login.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Welcome to HopePMS</h2>
        
        {errorMsg && (
          <div className="p-3 mb-4 text-sm text-center text-red-600 bg-red-50 rounded">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-white bg-gray-900 rounded-md hover:bg-gray-800 disabled:bg-gray-400">
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

<div className="grow border-t border-gray-300"></div>
<span className="px-3 text-sm text-gray-500">OR</span>
<div className="grow border-t border-gray-300"></div>

        <button onClick={handleGoogleLogin} className="w-full px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Sign in with Google
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Need an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}