import { useSearchParams } from "react-router-dom";

function Login() {
  const [searchParams] = useSearchParams();
  const invited = searchParams.get("invited");
  const loginZoho = () => {
    // window.location.href = `http://localhost:3000/auth/zoho`;
    window.location.href =
      "https://undemonstrated-kinley-mischievously.ngrok-free.dev/auth/zoho";
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 font-inter">
      {/* LEFT IMAGE 60% */}
      <div className="hidden lg:block lg:col-span-3">
        <img
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786"
          className="w-full h-full object-cover"
          alt="login"
        />
      </div>

      {/* RIGHT FORM 40% */}
      <div className="lg:col-span-2 flex items-center justify-center bg-slate-50">
        <div className="w-full max-w-md px-10">
          <h1 className="text-4xl font-semibold mb-3">Welcome back 👋</h1>
          {invited && (
            <div className="mb-6 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700 text-sm">
              🎉 Tài khoản đã được kích hoạt – vui lòng đăng nhập
            </div>
          )}

          <p className="text-slate-500 mb-10">
            Đăng nhập để tiếp tục vào hệ thống quản lý
          </p>

          <button
            onClick={loginZoho}
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r from-blue-500 to-indigo-500
              text-white
              font-medium
              shadow-lg
              hover:scale-[1.02]
              transition
            "
          >
            Login with Zoho
          </button>

          <p className="text-sm text-slate-400 mt-6 text-center">
            Powered by Zoho OAuth
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
