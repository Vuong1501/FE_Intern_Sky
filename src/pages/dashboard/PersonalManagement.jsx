import React, { useState, useEffect } from 'react';
import userApi from '../../api/userApi';

const PersonalManagement = () => {
  const [personalInfo, setPersonalInfo] = useState(null);
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'User', role: 'Employee' };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userApi.getMe();
        setPersonalInfo(res.data || res);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

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
};

export default PersonalManagement;
