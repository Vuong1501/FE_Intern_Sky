import { Routes, Route, Navigate } from "react-router-dom";
// import Invite from "./pages/Invite";
import LoginSuccess from "./pages/LoginSuccess";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InviteAccept from "./pages/InviteAccept";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}

function App() {
  const token = localStorage.getItem("accessToken");

  return (
    <div className="font-inter min-h-screen">
      <Routes>
        {/* root */}
        <Route path="/" element={token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/invite/accept" element={<InviteAccept />} />
        <Route path="/login" element={<Login />} />

        <Route path="/login-success" element={<LoginSuccess />} />

        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
