import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../api/userApi";

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);

      // Call API to get User info via userApi
      userApi.getMe()
      .then((response) => {
        console.log("User info fetched:", response);
        
        // Handle nested data structure if axios interceptor didn't already unwrap it
        // Note: axiosClient response interceptor returns response.data
        // But if backend returns { success: true, data: {...} }, then 'response' here is that object.
        // Let's handle both cases just to be safe, assuming interceptor returns the body.
        
        const userData = response.data || response;
        
        localStorage.setItem("user", JSON.stringify(userData));

        // Redirect to Dashboard (Dashboard handles role-based view)
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("Login failed:", err);
        alert("Đăng nhập thất bại: Không thể lấy thông tin user.");
        navigate("/login");
      });
    } else {
      // No token found
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Đang đăng nhập...</h2>
        <p className="text-gray-500">Vui lòng chờ trong giây lát.</p>
      </div>
    </div>
  );
}

export default LoginSuccess;
