// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute'; // Import our bouncer

// Import pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import DeletedItems from './pages/DeletedItems';
import AdminUsers from './pages/AdminUsers'; // This covers the admin functionality
import Reports from './pages/Reports';       // NEW
import Admin from './pages/Admin';             // NEW
import AuthCallback from './pages/AuthCallback'; // NEW
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Protected Routes (Wrapped in ProtectedRoute) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
        />
        <Route 
          path="/products" 
          element={<ProtectedRoute><Products /></ProtectedRoute>} 
        />
        <Route 
          path="/reports" 
          element={<ProtectedRoute><Reports /></ProtectedRoute>} 
        />
        <Route 
          path="/admin" 
          element={<ProtectedRoute><Admin /></ProtectedRoute>} 
        />
        <Route 
          path="/admin-users" 
          element={<ProtectedRoute><AdminUsers /></ProtectedRoute>} 
        />
        <Route 
          path="/deleted-items" 
          element={<ProtectedRoute><DeletedItems /></ProtectedRoute>} 
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes (Wrapped in ProtectedRoute) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/products" 
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/deleted-items" 
          element={
            <ProtectedRoute>
              <DeletedItems />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin-users" 
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;