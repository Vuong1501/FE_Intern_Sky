import { Routes, Route, Navigate } from "react-router-dom";
// import Invite from "./pages/Invite";
import LoginSuccess from "./pages/LoginSuccess";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InviteAccept from "./pages/InviteAccept";
import HRDashboard from "./pages/HRDashboard";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}

function RoleRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user")); // Assuming user object with role exists
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Normalize roles for comparison
  const userRole = user?.role?.toLowerCase();
  const allowed = allowedRoles.map(r => r.toLowerCase());

  if (allowedRoles && !allowed.includes(userRole)) {
     // Redirect to home if not authorized, or maybe a 403 page
     return <Navigate to="/home" />;
  }

  return children;
}


function App() {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role?.toLowerCase();

  return (
    <div className="font-inter min-h-screen">
      <Routes>
        {/* root */}
        <Route path="/" element={token ? (userRole === 'hr' ? <Navigate to="/hr-dashboard" /> : <Navigate to="/home" />) : <Login />} />
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

        <Route
          path="/hr-dashboard"
          element={
            <RoleRoute allowedRoles={['HR', 'Admin']}>
              <HRDashboard />
            </RoleRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
