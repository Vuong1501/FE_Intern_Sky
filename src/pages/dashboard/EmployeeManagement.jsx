import React, { useState } from 'react';
import ImportUsers from '../../components/ImportUsers';

const EmployeeManagement = () => {
  const [showImportModal, setShowImportModal] = useState(false);

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

export default EmployeeManagement;
