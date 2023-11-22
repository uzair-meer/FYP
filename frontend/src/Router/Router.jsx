import { Route, Routes } from "react-router-dom";
import SignUp from "../components/Signup/SignUp";
import { useAuth } from "../context/AuthContext";
import AdminPanel from "../pages/admin";
import CompaniesRequests from "../pages/admin/companiesRequests/CompaniesRequests";
import CompanyRates from "../pages/client/CompanyRates/CompanyRates";
import ClientChatPage from "../pages/client/chat/ClientChatPage";
import ClientCompletedBookings from "../pages/client/completedBookings/ClientCompletedBookings";
import ClientDashboard from "../pages/client/dashboard/ClientDashboard";
import ClientBookingDetail from "../pages/client/detailBooking/ClientBookingDetail";
import Profile from "../pages/client/profile/Profile";
import Company from "../pages/company";
import CompanyChatPage from "../pages/company/chat/CompanyChatPage";
import CompanyCompletedBookings from "../pages/company/completedBookings/CompanyCompletedBookings";
import { Dashboard } from "../pages/company/dashbord/Dashboard";
import Employees from "../pages/company/employees/Employees";
import RequestedBookings from "../pages/company/requestedBookings/RequestedBookings";
import SentimentReport from "../pages/company/sentimentReport/SentimentReport";
import SetPrices from "../pages/company/setprice/SetPrices";
import EmployeeDashboard from "../pages/employee/dashboard/EmployeeDashboard";
import Home from "../pages/home";
import Services from "../pages/services/Services";
import SignIn from "../pages/signin/SignIn";
import UserProtectedRoute, {
  AdminProtectedRoute,
  CompanyProtectedRoute,
  DriverProtectedRoute,
} from "./ProtectedRoutes";
import CompanyProfile from "../pages/company/profile/CompanyProfile";

export default function AppRouter() {
  const { user } = useAuth();
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="signin" element={<SignIn />} />

      {/* // client routes */}
      <Route
        path="client"
        element={
          <UserProtectedRoute user={user} component={<ClientDashboard />} />
        }
      >
        <Route index element={<Services />} />
        <Route path="profile" element={<Profile />} />
        <Route path="rates" element={<CompanyRates />} />
        <Route path="chat" element={<ClientChatPage />} />
        <Route
          path="bookings/completed"
          element={<ClientCompletedBookings />}
        />
        {/* FIXME: the followig route should no not be open if state is not provided as it is only opened by Link */}
        <Route path="booking/detail" element={<ClientBookingDetail />} />
      </Route>

      {/* // company routes */}
      <Route
        path="company"
        element={<CompanyProtectedRoute user={user} component={<Company />} />}
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="bookings/requested" element={<RequestedBookings />} />
        <Route path="prices" element={<SetPrices />} />
        <Route
          path="bookings/completed"
          element={<CompanyCompletedBookings />}
        />
        {/* <Route path="bookings/detail" element={<Company />} /> */}
        <Route path="reviews/sentiment/report" element={<SentimentReport />} />
        <Route path="chat" element={<CompanyChatPage />} />
        {/* <Route path="profile" element={<CompanyProfile />} /> */}
      </Route>

      {/* // company routes */}
      <Route
        path="admin"
        element={<AdminProtectedRoute user={user} component={<AdminPanel />} />}
      >
        {/* <Route index element={<AdminDashboard />} /> */}
        <Route
          index
          path="companies/requests"
          element={<CompaniesRequests />}
        />
      </Route>

      {/* // company routes */}
      <Route
        path="employee"
        element={
          <DriverProtectedRoute user={user} component={<EmployeeDashboard />} />
        }
      >
        <Route index element={<EmployeeDashboard />} />
      </Route>
    </Routes>
  );
}
