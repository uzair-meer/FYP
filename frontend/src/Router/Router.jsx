import { Route, Routes } from "react-router-dom";
import Services from "../pages/company/services/Services";
import Layout from "../layout/Layout";
import UserHistoryTable from "../pages/user/userHistory/userHistory";
import CompanyHistory from "../pages/company/history/CompanyHistory";
import RegisterUser from "../pages/user/Auth/RegisterUser";
import UserSignIn from "../pages/user/Auth/LogIn";
import CompanySignIn from "../pages/company/CompanyAuth/CompanySignIn";
import Home from "../pages/company";
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="history" element={<UserHistoryTable />} />
      <Route path="company/history" element={<CompanyHistory />} />
      <Route path="user/register" element={<RegisterUser />} />
      <Route path="user/login" element={<UserSignIn />} />
      <Route path="user/login" element={<UserSignIn />} />
      <Route path="company/login" element={<CompanySignIn />} />
    </Routes>
  );
};

export default AppRouter;
