// src/pages/UserManagementPage.jsx (Version A)
import React from 'react';

export const UserManagementPage = ({ structuralUsers = [], onKillSession }) => {
  return (
    <div className="management-view-panel">
      <h3>Operational Matrix Credentials Log</h3>
      <table className="user-access-matrix-table">
        <thead>
          <tr><th>Account Subject</th><th>System Security Tier Tag</th><th>Actions Control</th></tr>
        </thead>
        <tbody>
          {structuralUsers.map(profile => (
            <tr key={profile.id}>
              <td>{profile.emailAddress}</td>
              <td>{profile.assignedSystemTier}</td>
              <td>
                <button onClick={() => onKillSession(profile.id)}>Revoke Credentials</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};