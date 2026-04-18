// src/components/Layout.jsx
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Layout() {
  const { session } = useAuth();
  const navigate = useNavigate();

  // --- SPRINT 1 PLACEHOLDER LOGIC ---
  // Change this string from 'admin' to 'employee' to see the admin links disappear!
  const userRole = 'superadmin'; 

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="flex flex-col w-64 text-white bg-gray-900">
        <div className="p-4 text-2xl font-bold border-b border-gray-800">
          HopePMS
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-800">Dashboard</Link>
          <Link to="/products" className="block p-2 rounded hover:bg-gray-800">Products</Link>
          <Link to="/reports" className="block p-2 rounded hover:bg-gray-800">Reports</Link>
          
          {/* ROLE-BASED LINKS (Hidden if not admin) */}
          {userRole === 'admin' && (
            <div className="pt-4 mt-4 border-t border-gray-800">
              <span className="block px-2 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
                Admin Tools
              </span>
              <Link to="/admin" className="block p-2 rounded hover:bg-gray-800">Admin Settings</Link>
              <Link to="/admin-users" className="block p-2 rounded hover:bg-gray-800">Manage Users</Link>
              <Link to="/deleted-items" className="block p-2 text-red-400 rounded hover:bg-gray-800">Deleted Items</Link>
            </div>
          )}
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* NAVBAR */}
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Inventory System</h2>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
              Role: {userRole}
            </span>
            <span className="text-sm text-gray-600">{session?.user?.email}</span>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-white transition-colors bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* DYNAMIC PAGE CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}