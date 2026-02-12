import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportUsers from '../components/ImportUsers';

const HRDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'HR User', role: 'HR' };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const stats = [
    { title: 'Total Employees', value: '1,234', change: '+12%', color: 'from-blue-500 to-cyan-400' },
    { title: 'On Leave', value: '42', change: '-5%', color: 'from-sky-500 to-indigo-500' },
    { title: 'New Requests', value: '8', change: '+2', color: 'from-orange-400 to-amber-400' },
    { title: 'Open Positions', value: '5', change: 'Stable', color: 'from-emerald-400 to-teal-500' },
  ];

  const activities = [
    { user: 'Nguyen Van A', action: 'Requested leave', time: '10 mins ago' },
    { user: 'Le Thi B', action: 'Updated profile', time: '1 hour ago' },
    { user: 'Tran Van C', action: 'Submitted report', time: '3 hours ago' },
    { user: 'Pham Thi D', action: 'New onboard', time: '5 hours ago' },
  ];

  return (
    <div className="flex h-screen bg-secondary-50 font-inter overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">HRM System</h1>
        </div>
        <nav className="mt-10 px-4 space-y-2">
          <a href="#" className="block px-4 py-3 rounded-lg bg-primary-600/20 text-sky-100 font-medium hover:bg-primary-600/30 transition-colors border border-primary-500/10">
            Dashboard
          </a>
          <a href="#" className="block px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            Employees
          </a>
          <a href="#" className="block px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            Recruitment
          </a>
          <a href="#" className="block px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            Reports
          </a>
          <a href="#" className="block px-4 py-3 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
            Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm z-10">
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="text-xl font-semibold text-slate-800">Dashboard</div>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => setShowImportModal(true)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm font-medium text-sm"
             >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                Import Employees
             </button>
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
                   {user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-600 text-sm hidden sm:block">{user.email}</span>
             </div>
             <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-medium">Logout</button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome back, HR! 👋</h2>
            <p className="text-gray-600">Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-20 rounded-bl-full -mr-4 -mt-4`}></div>
                 <h3 className="text-gray-500 text-sm font-medium mb-1">{stat.title}</h3>
                 <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-gray-800">{stat.value}</span>
                    <span className={`text-sm font-medium mb-1 ${stat.change.includes('+') ? 'text-green-500' : stat.change.includes('-') ? 'text-red-500' : 'text-gray-400'}`}>
                       {stat.change}
                    </span>
                 </div>
              </div>
            ))}
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-4">
                    {activity.user.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <div className="text-xs text-gray-400">{activity.time}</div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors">
              View All Activity
            </button>
          </div>
        </main>
      </div>

      {/* Import Modal */}
      {showImportModal && (
        <ImportUsers 
          onClose={() => setShowImportModal(false)} 
          onSuccess={() => console.log("Import success, refresh data here")}
        />
      )}
    </div>
  );
};

export default HRDashboard;
