import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Login() {
  const [searchParams] = useSearchParams();
  const invited = searchParams.get("invited");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const loginZoho = () => {
    window.location.href = `http://localhost:3000/auth/zoho`;
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center font-inter overflow-hidden bg-slate-900">

      {/* Dynamic Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[10s] ease-in-out transform scale-110"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")',
        }}
      >
        {/* Lighter overlay for brighter feel */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-sky-800/50 to-slate-900/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Glassmorphism Card */}
      <div 
        className={`
          relative z-10 w-full max-w-md mx-4 p-8 md:p-12
          bg-white/20 border border-white/30 shadow-2xl rounded-2xl
          backdrop-blur-xl transition-all duration-700 ease-out
          ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-tr from-sky-300 to-blue-500 shadow-lg shadow-sky-500/30">
             <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Welcome Back</h1>
          <p className="text-sky-100 text-lg">HRM System Access</p>
        </div>

        {/* Invited Notification */}
        {invited && (
          <div className="mb-8 p-4 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-100 flex items-center gap-3 animate-fade-in">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <span className="text-sm font-medium">Account activated successfully!</span>
          </div>
        )}

        {/* Login Button */}
        <div className="space-y-6">
          <button
            onClick={loginZoho}
            className="
              group relative w-full py-4 px-6 rounded-xl
              bg-gradient-to-r from-sky-400 to-blue-600
              hover:from-sky-300 hover:to-blue-500
              text-white font-semibold text-lg
              shadow-lg shadow-sky-500/30
              transform transition-all duration-300
              hover:-translate-y-1 hover:shadow-sky-500/50
              flex items-center justify-center gap-3
              overflow-hidden
            "
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>Sign in with Zoho</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
          </button>

          <p className="text-center text-sm text-slate-400/60 font-medium">
            Protected by formatting &copy; 2024
          </p>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-6 text-center w-full text-white/20 text-xs">
        System v1.0.0
      </div>
    </div>
  );
}

export default Login;
