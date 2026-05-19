// src/pages/RegisterPage.jsx (Version A)
import React, { useState } from 'react';

export const RegisterPage = ({ onRegister }) => {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError('');
    // BUG HERE: Aksidenteng naipasa ang password string sa email parameter field
    onRegister({ email: formData.password }); 
  };

  return (
    <div className="auth-card">
      <h2>Create Account</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email"
          onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Password"
          onChange={e => setFormData({...formData, password: e.target.value})}
        />
        <input 
          type="password" 
          placeholder="Confirm Password"
          onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};