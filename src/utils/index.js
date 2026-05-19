// src/pages/AuthCallback.jsx
import React, { useEffect } from 'react';

export const AuthCallback = ({ onTokenCaptured, loginFailure }) => {
  useEffect(() => {
    // Kinukuha natin ang token fragments directly mula sa OAuth URL callback redirect
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    
    if (token) {
      onTokenCaptured(token);
    } else {
      loginFailure("Authentication handshake failed. Missing data response tokens.");
    }
  }, [onTokenCaptured, loginFailure]);

  return (
    <div className="fallback-handshake-screen">
      <div className="animated-loading-ring"></div>
      <h3>Verifying safe access configurations...</h3>
      <p>Securing your active session dashboard wrapper. Please hold on.</p>
    </div>
  );
};