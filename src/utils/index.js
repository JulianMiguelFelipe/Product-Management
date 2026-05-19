// src/pages/LoginPage.jsx (Version B - Updated)
import React, { useState } from 'react';

// Idinagdag ang `isGoogleLoading` prop para sa user experience block
export const LoginPage = ({ onLogin, onGoogleLogin, isGoogleLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="auth-card">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign In</button>
      </form>
      <div className="divider">or</div>
      <button 
        onClick={onGoogleLogin} 
        className="google-btn"
        disabled={isGoogleLoading} // Inayos: Bawal i-click ulit kapag nagloload
      >
        {isGoogleLoading ? 'Connecting to Google...' : 'Continue with Google'}
      </button>
    </div>
  );
};