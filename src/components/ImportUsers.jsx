import React, { useState } from 'react';
import hrApi from '../api/hrApi';

const ImportUsers = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState(null);
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewData(null);
      setError(null);
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Vui lòng chọn file.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await hrApi.uploadBulkInvite(file);
      // Handle nested data response if necessary
      const data = response.data || response;
      setPreviewData(data);
    } catch (err) {
      console.error("Upload failed", err);
      // Try to extract backend error message
      const msg = err.response?.data?.message || err.message || "Lỗi khi upload file.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!previewData || !previewData.valid || previewData.valid.length === 0) return;

    setLoading(true);
    try {
      await hrApi.confirmBulkInvite(previewData.valid);
      setSuccess(true);
      if (onSuccess) onSuccess();
      // Don't close immediately, let user see success message
    } catch (err) {
      console.error("Invite failed", err);
      setError(err.message || "Lỗi khi gửi lời mời.");
    } finally {
      setLoading(false);
    }
  };

  const hasValidUsers = previewData?.valid?.length > 0;
  const hasErrors = previewData?.invalid?.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-slate-800">Import Nhân viên từ Excel</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {success ? (
            <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Gửi lời mời thành công!</h3>
              <p className="text-gray-600 max-w-md">
                Đã gửi lời mời tham gia hệ thống đến <span className="font-bold text-slate-800">{previewData?.valid?.length}</span> nhân viên qua email.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-slate-900 text-white rounded-xl font-medium shadow-lg hover:bg-slate-800 transition-all"
              >
                Hoàn tất
              </button>
            </div>
          ) : (
            !previewData ? (
              <div className="space-y-6">
                {/* Upload Area */}
                <div 
                  className="border-2 border-dashed border-primary-200 rounded-xl p-10 text-center bg-primary-50/50 hover:bg-primary-50 transition-colors cursor-pointer group"
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileChange}
                  />
                  <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-500 group-hover:scale-110 transition-transform">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  </div>
                  <p className="text-lg font-medium text-slate-700">Kéo thả hoặc click để chọn file</p>
                  <p className="text-sm text-slate-400 mt-2">Hỗ trợ .xlsx, .xls, .csv</p>
                  {file && (
                    <div className="mt-4 p-2 bg-white rounded-lg border border-primary-200 inline-block px-4">
                      <span className="text-primary-600 font-medium">{file.name}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center">
                  <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Đang tải lên...' : 'Xem trước & Kiểm tra'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                   <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                      <div className="text-sm text-emerald-600 font-medium">Hợp lệ (Sẽ được mời)</div>
                      <div className="text-2xl font-bold text-emerald-700">{previewData.valid?.length || 0}</div>
                   </div>
                   <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl">
                      <div className="text-sm text-amber-600 font-medium">Đã tồn tại (Bỏ qua)</div>
                      <div className="text-2xl font-bold text-amber-700">{previewData.existing?.length || 0}</div>
                   </div>
                   <div className="bg-red-50 border border-red-100 p-4 rounded-xl">
                      <div className="text-sm text-red-600 font-medium">Lỗi dữ liệu</div>
                      <div className="text-2xl font-bold text-red-700">{previewData.invalid?.length || 0}</div>
                   </div>
                </div>

                {/* Valid Users Table */}
                {hasValidUsers && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3">Danh sách hợp lệ</h3>
                    <div className="overflow-x-auto border border-gray-100 rounded-lg">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                          <tr>
                            <th className="p-3">Họ tên</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phòng ban</th>
                            <th className="p-3">Role</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {previewData.valid.map((user, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50">
                              <td className="p-3 font-medium text-slate-700">{user.name}</td>
                              <td className="p-3 text-slate-600">{user.email}</td>
                              <td className="p-3 text-slate-500">{user.departmentName}</td>
                              <td className="p-3">
                                <span className="px-2 py-1 rounded bg-blue-50 text-blue-600 text-xs font-semibold">{user.role}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Error Table */}
                {hasErrors && (
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-3">Dòng bị lỗi</h3>
                    <div className="overflow-x-auto border border-red-100 rounded-lg bg-red-50/20">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-red-50 text-red-600 font-medium">
                          <tr>
                            <th className="p-3 w-20">Dòng</th>
                            <th className="p-3">Lý do lỗi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-red-100">
                          {previewData.invalid.map((err, idx) => (
                            <tr key={idx}>
                              <td className="p-3 font-bold text-red-700">#{err.row}</td>
                              <td className="p-3 text-red-600">{err.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )
          )}

          {error && !success && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-center">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Footer */}
        {!success && (
          <div className="p-6 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button 
              onClick={onClose}
              className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors"
            >
              Hủy
            </button>
            {previewData && (
              <>
                <button 
                    onClick={() => setPreviewData(null)}
                    className="px-5 py-2.5 text-primary-600 font-medium hover:bg-primary-50 rounded-lg transition-colors"
                >
                    Chọn file khác
                </button>
                {hasValidUsers && (
                  <button
                    onClick={handleConfirm}
                    disabled={loading}
                    className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-blue-600 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    {loading ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )}
                    Mời {previewData.valid.length} nhân viên
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportUsers;
