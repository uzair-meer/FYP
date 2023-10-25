import { Route, Routes } from "react-router-dom";

import CompanyHistory from "src/pages/company/history/CompanyHistory";
import Home from "src/pages/home";
import Employes from "src/pages/company/employes/Employes";
import { Dashboard } from "src/pages/company/dashbord/Dashboard";
import SetPricesForm from "src/pages/company/Setprice/SetPricesForm";
import Company from "../pages/company";
import User from "../pages/user";
import UserHistory from "../pages/user/history/UserHistory";
import SignUp from "../components/Signup/SignUp";
import Admin from "../pages/admin";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import Companies from "../pages/admin/companies/Companies";
import Services from "../pages/admin/services/Services";
const AppRouter = () => {
  return (
    <Routes>
      {/* user routes */}
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<SignUp />} />

      <Route path="user" element={<User />}>
        <Route path="bookings" element={<UserHistory />} />
      </Route>

      <Route path="company" element={<Company />}>
        {/* Define your nested routes here */}
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<CompanyHistory />} />
        <Route path="employes" element={<Employes />} />
        <Route path="setprice" element={<SetPricesForm />} />
      </Route>

      <Route path="admin" element={<Admin />}>
        <Route index element={<AdminDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="services" element={<Services />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
