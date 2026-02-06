import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const accessToken = params.get("accessToken");
    const user = params.get("user");

    if (accessToken && user) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", user);

      navigate("/home");
    }
  }, []);

  return <div>Logging in...</div>;
}

export default LoginSuccess;
