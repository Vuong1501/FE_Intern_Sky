import { Routes, Route, Navigate } from "react-router-dom";
// import Invite from "./pages/Invite";
import LoginSuccess from "./pages/LoginSuccess";
import Home from "./pages/Home";
import Login from "./pages/Login";
import InviteAccept from "./pages/InviteAccept";
import DashboardLayout from "./layouts/DashboardLayout";
import EmployeeManagement from "./pages/dashboard/EmployeeManagement";
import TimeManagement from "./pages/dashboard/TimeManagement";
import PersonalManagement from "./pages/dashboard/PersonalManagement";
import Reports from "./pages/dashboard/Reports";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("accessToken");
  return token ? children : <Navigate to="/login" />;
}

function DashboardRedirect() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const role = user.role?.toLowerCase();
  
  if (role === 'hr' || role === 'admin') return <Navigate to="report" replace />;
  return <Navigate to="personal" replace />;
}

// ... (keep RoleRoute if needed for other things, or remove if unused) ...

function App() {
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user?.role?.toLowerCase();

  return (
    <div className="font-inter min-h-screen">
      <Routes>
        {/* root */}
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
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
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardRedirect />} />
          <Route path="employee" element={<EmployeeManagement />} />
          <Route path="time" element={<TimeManagement />} />
          <Route path="personal" element={<PersonalManagement />} />
          <Route path="report" element={<Reports />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
