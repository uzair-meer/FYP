import { Route, Routes } from "react-router-dom";

import CompanyHistory from "src/pages/company/history/CompanyHistory";
import Home from "src/pages/home";
import Employes from "src/pages/company/employes/Employes";
import { Dashboard } from "src/pages/company/dashbord/Dashboard";
import SetPricesForm from "src/pages/company/Setprice/SetPricesForm";
import Company from "../pages/company";
import UserHistory from "../pages/user/history/UserHistory";
import SignUp from "../components/Signup/SignUp";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import Companies from "../pages/admin/companies/Companies";
import Services from "../pages/admin/services/Services";
import Profile from "../pages/user/profile/Profile";
import UserDashboard from "../pages/user/dashboard/UserDashboard";
import AdminPanel from "../pages/admin";
import User from "../pages/user";
import DriverPanel from "../pages/driver";
import DriverDashboard from "../pages/driver/dashboard/DriverDashboard";
import DriverHistory from "../pages/driver/history/DriverHistory";
import { useAuth } from "../context/AuthContext";
import UserProtectedRoute, { AdminProtectedRoute } from "./ProtectedRoutes";
import SignIn from "../pages/signin/SignIn";
const AppRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

      <Route path="user" element={<User />}>
        <Route index element={<UserDashboard />} />
        <Route path="bookings" element={<UserHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="company" element={<Company />}>
        {/* Define your nested routes here */}
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<CompanyHistory />} />
        <Route path="employes" element={<Employes />} />
        <Route path="setprice" element={<SetPricesForm />} />
      </Route>

      <Route path="admin" element={<AdminPanel />}>
        <Route index element={<AdminDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="services" element={<Services />} />
      </Route>

      <Route path="driver" element={<DriverPanel />}>
        <Route index element={<DriverDashboard />} />
        <Route path="bookings" element={<DriverHistory />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
