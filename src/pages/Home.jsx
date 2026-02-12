function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: 40 }}>
      <h1>🏠 Home</h1>

      {user ? (
        <>
          <p>
            Xin chào: <b>{user.email}</b>
          </p>
          <p>Role: {user.role}</p>
          
          {/* Temporary button removed as per request */}

          <div className="mt-4 text-xs text-slate-400 font-mono">
            Debug: {JSON.stringify(user)}
          </div>

          {(user?.role?.toLowerCase() === 'hr' || user?.role?.toLowerCase() === 'admin') && (
            <button
              onClick={() => window.location.href = "/hr-dashboard"}
              className="block mt-4 mb-4 px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-sky-500/30 transition-all font-medium"
            >
              Go to HR Dashboard
            </button>
          )}

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/invite";
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Chưa đăng nhập</p>
      )}
    </div>
  );
}

export default Home;
