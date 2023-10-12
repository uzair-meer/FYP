import { Route, Routes } from "react-router-dom";
import Services from "../pages/company/services/Services";
import UserHistoryTable from "../pages/user/userHistory/userHistory";
import CompanyHistory from "../pages/company/history/CompanyHistory";
import RegisterUser from "../pages/user/Auth/RegisterUser";
import UserSignIn from "../pages/user/Auth/LogIn";
import Home from "../pages/company";
import UserDashbord from "../pages/user/UserDashbord";
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="company/profile" element={<Services />} />
      <Route path="user/history" element={<UserHistoryTable />} />
      <Route path="register" element={<RegisterUser />} />
      <Route path="login" element={<UserSignIn />} />
      <Route path="user/profile" element={<UserDashbord />} />
    </Routes>
  );
};

export default AppRouter;
