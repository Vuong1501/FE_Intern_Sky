import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('leave'); // 'leave' or 'ot'

  // Mock Data for Reports
  const reportData = [
    { id: 1, name: 'Taylor', type: 'Nghỉ phép', data: { 8: 'P' }, total: 1 },
    { id: 2, name: 'Anna Lee', type: 'Nghỉ không lương', data: { 4: 'KL', 5: 'KL', 6: 'KL', 20: 'BH' }, total: 3 },
    { id: 3, name: 'John Smith', type: 'Nghỉ phép', data: { 11: 'P' }, total: 1 },
    { id: 4, name: 'Trần Hoài Trang', type: 'Nghỉ phép', data: { 15: 'L', 16: 'L', 17: 'L' }, total: 3 },
  ];

  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1); // Feb mock

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 min-h-[500px] animate-fade-in">
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
};

export default Reports;
