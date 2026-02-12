import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const MENU_ITEMS = [
  { 
    id: 'employee', 
    label: 'Employee Management', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    allowedRoles: ['hr', 'admin'],
    path: '/dashboard/employee'
  },
  { 
    id: 'time', 
    label: 'Time Management', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    allowedRoles: ['hr', 'admin', 'employee'],
    path: '/dashboard/time' 
  },
  { 
    id: 'personal', 
    label: 'Personal Management', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    allowedRoles: ['hr', 'admin', 'employee'],
    path: '/dashboard/personal'
  },
  { 
    id: 'report', 
    label: 'Report', 
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    allowedRoles: ['hr', 'admin'],
    path: '/dashboard/report'
  }
];

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const user = JSON.parse(localStorage.getItem('user')) || { email: 'User', role: 'Employee' };
    const userRole = user.role ? user.role.toLowerCase() : 'employee';
  
    // Helper to check permission
    const hasPermission = (item) => item.allowedRoles.includes(userRole);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const NavItem = ({ item }) => (
        <NavLink 
          to={item.path}
          onClick={() => setSidebarOpen(false)}
          className={({ isActive }) => `w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
            isActive 
            ? 'bg-primary-600/20 text-sky-100 font-medium border border-primary-500/10' 
            : 'text-slate-400 hover:bg-white/5 hover:text-white'
          }`}
        >
          {item.icon}
          {item.label}
        </NavLink>
    );

    return (
        <div className="flex h-screen bg-secondary-50 font-inter overflow-hidden">
          {/* Sidebar */}
          <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
            <div className="flex items-center justify-center h-20 shadow-md">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">HRM System</h1>
            </div>
            <nav className="mt-10 px-4 space-y-2">
              {MENU_ITEMS.map((item) => (
                 hasPermission(item) && <NavItem key={item.id} item={item} />
              ))}
            </nav>
          </aside>
    
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm z-10">
              <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
              {/* Breadcrumb or Title could go here, for now just empty or simple text */}
              <div className="text-xl font-semibold text-slate-800 capitalize">Dashboard</div>

              <div className="flex items-center gap-4">
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
              <Outlet />
            </main>
          </div>
        </div>
      );
};

export default DashboardLayout;
