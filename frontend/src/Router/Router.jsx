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
import Profile from "../pages/user/profile/Profile";
import UserDashboard from "../pages/user/dashboard/UserDashboard";
import AdminPanel from "../pages/admin";
import User from "../pages/user";
import DriverPanel from "../pages/driver";
import DriverDashboard from "../pages/driver/dashboard/DriverDashboard";
import DriverHistory from "../pages/driver/history/DriverHistory";
import { useAuth } from "../context/AuthContext";
import UserProtectedRoute, {
  AdminProtectedRoute,
  CompanyProtectedRoute,
  DriverProtectedRoute,
} from "./ProtectedRoutes";
import SignIn from "../pages/signin/SignIn";
import Services from "../pages/services/Services";
import FetchEmployees from "../pages/company/components/FetchEmployees";
import CompanyRates from "src/pages/user/CompanyRates/CompanyRates.jsx";
import RequestedBookings from "../pages/company/Pending/RequestedBookings";
// import CurrentBooking from "../pages/user/currentBooking/CurrentBooking";
import InprogressBookings from "../pages/user/inprogressBookings/InprogressBookings";
import DriverCurrentBooking from "../pages/driver/currentBooking/DriverCurrentBooking";
import BookingDetail from "../pages/user/inprogressBookings/BookingDetail";
import CompaniesRequestCard from "../pages/admin/companies-requests/CompaniesRequestCard";
import CompaniesRequests from "../pages/admin/companies-requests/CompaniesRequests";
// import FetchPricesForm from "../pages/services/GetPrices";

const AppRouter = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

      {/* // user routes */}

      <Route
        path="user"
        element={<UserProtectedRoute user={user} component={<User />} />}
      >
        <Route index element={<UserDashboard />} />
        <Route path="bookings" element={<UserHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rates" element={<CompanyRates />} />
        {/* <Route path="current-booking" element={<CurrentBooking />} /> */}
        <Route path="inprogress-bookings" element={<InprogressBookings />} />
        {/* FIXME: the followig route should no not be open if state is not provided as it is only opened by Link */}
        <Route path="inprogress-bookings/details" element={<BookingDetail />} />
      </Route>

      <Route
        path="company"
        element={<CompanyProtectedRoute user={user} component={<Company />} />}
      >
        {/* Define your nested routes here */}
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<CompanyHistory />} />
        <Route path="employes" element={<Employes />} />
        <Route path="requested" element={<RequestedBookings />} />
        <Route path="setprice" element={<SetPricesForm />} />
        <Route path="get-employees" element={<FetchEmployees />} />
      </Route>

      <Route
        path="admin"
        element={<AdminProtectedRoute user={user} component={<AdminPanel />} />}
      >
        
        <Route index element={<AdminDashboard />} />
        <Route path="companies" element={<Companies />} />
        <Route path="companies-requests" element={<CompaniesRequests />} />
        <Route path="services" element={<Services />} />
      </Route>

      <Route
        path="driver"
        element={
          <DriverProtectedRoute user={user} component={<DriverPanel />} />
        }
      >
        <Route index element={<DriverDashboard />} />
        <Route path="bookings" element={<DriverHistory />} />
        <Route path="current-booking" element={<DriverCurrentBooking />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
