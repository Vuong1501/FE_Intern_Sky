import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ImportUsers from '../components/ImportUsers';
import userApi from '../api/userApi';

const HRDashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('report'); // Default to Report
  const [showImportModal, setShowImportModal] = useState(false);
  const [reportType, setReportType] = useState('leave'); // 'leave' or 'ot'
  const [personalInfo, setPersonalInfo] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'HR User', role: 'HR' };

  useEffect(() => {
    if (activeTab === 'personal' && !personalInfo) {
      const fetchProfile = async () => {
        try {
          const res = await userApi.getMe();
          setPersonalInfo(res.data || res);
        } catch (err) {
          console.error("Failed to fetch profile", err);
        }
      };
      fetchProfile();
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // ... (keep existing report Data and renderReports) ... 

  // Mock Data for Reports (keep existing)
  const reportData = [
    { id: 1, name: 'Taylor', type: 'Nghỉ phép', data: { 8: 'P' }, total: 1 },
    { id: 2, name: 'Anna Lee', type: 'Nghỉ không lương', data: { 4: 'KL', 5: 'KL', 6: 'KL', 20: 'BH' }, total: 3 },
    { id: 3, name: 'John Smith', type: 'Nghỉ phép', data: { 11: 'P' }, total: 1 },
    { id: 4, name: 'Trần Hoài Trang', type: 'Nghỉ phép', data: { 15: 'L', 16: 'L', 17: 'L' }, total: 3 },
  ];

  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1); // Feb mock

  const renderReports = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px]">
      {/* Report Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-800">BÁO CÁO</h2>
           <p className="text-slate-500 font-medium">{reportType === 'leave' ? 'Theo dõi nghỉ' : 'Theo dõi OT'}</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            onClick={() => setReportType('leave')}
            className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${reportType === 'leave' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Nghỉ phép
          </button>
          <button 
             onClick={() => setReportType('ot')}
             className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${reportType === 'ot' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Overtime
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
        <div className="text-lg font-bold text-slate-700">Tháng 2</div>
        <div className="flex gap-2 w-full md:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 w-full md:w-64"
          />
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 bg-white">
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 bg-white">
            Xuất
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="bg-gray-50 text-slate-800 font-semibold text-center">
            <tr>
              <th className="p-3 border-r border-gray-200 sticky left-0 bg-gray-50 z-10 w-40">Nhân viên</th>
              {daysInMonth.map(d => (
                <th key={d} className="p-2 border-r border-gray-200 min-w-[30px]">{d}</th>
              ))}
              <th className="p-3 min-w-[80px]">Tổng {reportType === 'leave' ? 'nghỉ' : 'OT'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reportData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50">
                <td className="p-3 border-r border-gray-200 font-medium text-slate-700 sticky left-0 bg-white z-10">{row.name}</td>
                {daysInMonth.map(d => (
                  <td key={d} className="p-2 border-r border-gray-200 text-center text-xs text-slate-500">
                    {row.data[d] && (
                        <span className={`inline-block w-full font-bold ${['P', 'L'].includes(row.data[d]) ? 'text-blue-600' : 'text-slate-700'}`}>
                            {row.data[d]}
                        </span>
                    )}
                  </td>
                ))}
                <td className="p-3 text-center font-bold text-slate-800">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
        <span className="font-bold text-slate-800">Chú thích:</span>
        <div className="flex items-center gap-2"><span className="font-bold text-blue-600">P</span> <span>Nghỉ phép năm</span></div>
        <div className="flex items-center gap-2"><span className="font-bold text-slate-700">KL</span> <span>Nghỉ không lương</span></div>
        <div className="flex items-center gap-2"><span className="font-bold text-slate-700">BH</span> <span>Nghỉ chế độ BH</span></div>
        <div className="flex items-center gap-2"><span className="font-bold text-blue-600">L</span> <span>Nghỉ Lễ/Tết</span></div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'employee':
        return (
          <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center">
                <div>
                   <h2 className="text-2xl font-bold text-slate-800">Employee Management</h2>
                   <p className="text-slate-500">Manage detailed employee records and departments.</p>
                </div>
                <button 
                  onClick={() => setShowImportModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Import Employees
                </button>
             </div>
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-slate-400">
                Placeholder for Employee List
             </div>
          </div>
        );
      case 'time':
        return (
          <div className="space-y-6 animate-fade-in">
             <h2 className="text-2xl font-bold text-slate-800">Time Management</h2>
             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-10 text-center text-slate-400">
                Placeholder for Time/Leave Requests
             </div>
          </div>
        );
      case 'personal':
          return (
            <div className="flex flex-col h-full animate-fade-in">
               <h2 className="text-2xl font-bold text-slate-800 mb-6">Personal Management</h2>
               <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden w-full flex-1">
                  {/* Banner */}
                  <div className="h-32 bg-gradient-to-r from-sky-400 to-blue-600"></div>
                  
                  {/* Profile Content */}
                  <div className="px-8 pb-8">
                     <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="flex items-end gap-6">
                           <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-md flex items-center justify-center text-3xl font-bold text-blue-600 overflow-hidden">
                              {personalInfo?.avatar ? ( // Assuming avatar URL 
                                <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                              ) : (
                                (personalInfo?.name || user.email).charAt(0).toUpperCase()
                              )}
                           </div>
                           <div className="mb-1">
                              <h3 className="text-2xl font-bold text-slate-800">{personalInfo?.name || user.email}</h3>
                              <p className="text-slate-500 font-medium">{personalInfo?.role || 'Human Resources'}</p>
                           </div>
                        </div>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-gray-50 bg-white shadow-sm transition-all">
                           Edit Profile
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                              <div className="text-slate-700 font-medium">{personalInfo?.email || user.email}</div>
                           </div>
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Department</label>
                              <div className="text-slate-700 font-medium">{personalInfo?.department || 'Not Assigned'}</div>
                           </div>
                        </div>
                        <div className="space-y-4">
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Employee ID</label>
                              <div className="text-slate-700 font-medium">{personalInfo?._id || '---'}</div>
                           </div>
                           <div>
                              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone</label>
                              <div className="text-slate-700 font-medium">{personalInfo?.phone || '---'}</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          );
      case 'report':
        return renderReports();
      default:
        return <div>Select a tab</div>;
    }
  };

  const NavItem = ({ id, label, icon }) => (
    <button 
      onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-3 ${
        activeTab === id 
        ? 'bg-primary-600/20 text-sky-100 font-medium border border-primary-500/10' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex h-screen bg-secondary-50 font-inter overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">HRM System</h1>
        </div>
        <nav className="mt-10 px-4 space-y-2">
          <NavItem id="employee" label="Employee Management" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} />
          <NavItem id="time" label="Time Management" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
          <NavItem id="personal" label="Personal Management" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} />
          <NavItem id="report" label="Report" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex justify-between items-center py-4 px-6 bg-white shadow-sm z-10">
          <button className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="text-xl font-semibold text-slate-800 capitalize">{activeTab.replace('_', ' ')}</div>
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
          {renderContent()}
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
