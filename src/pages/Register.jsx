// src/pages/Register.jsx
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // --- FORM VALIDATION ---
    if (password.length < 6) {
      return setMessage({ text: 'Password must be at least 6 characters.', type: 'error' });
    }
    if (password !== confirmPassword) {
      return setMessage({ text: 'Passwords do not match.', type: 'error' });
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setMessage({ text: error.message, type: 'error' });
    } else {
      setMessage({ text: 'Success! You can now log in.', type: 'success' });
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">Create an Account</h2>
        
        {message.text && (
          <div className={`p-3 mb-4 text-sm text-center rounded ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <button type="submit" disabled={loading} className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

<div className="grow border-t border-gray-300"></div>
<span className="px-3 text-sm text-gray-500">OR</span>
<div className="grow border-t border-gray-300"></div>

        <button onClick={handleGoogleLogin} className="w-full px-4 py-2 font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
          Register with Google
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}