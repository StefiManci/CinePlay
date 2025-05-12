import React from "react";

const Admin = () => {
  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">👋 Welcome, Admin!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">📊 Reports</h3>
          <p className="text-gray-600">View app usage, statistics, and analytics.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">👥 User Management</h3>
          <p className="text-gray-600">Manage users, assign roles, and update permissions.</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-2">⚙️ Settings</h3>
          <p className="text-gray-600">Configure site settings and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;