import { Route, Routes } from "react-router-dom";

import CompanyHistory from "src/pages/company/history/CompanyHistory";

import Home from "src/pages/home";

import Employes from "src/pages/company/employes/Employes";
import { Dashboard } from "src/pages/company/dashbord/Dashboard";
import SetPricesForm from "src/pages/company/Setprice/SetPricesForm";
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />

      <Route path="company" element={<Home />}>
        {/* Define your nested routes here */}
        <Route index element={<Dashboard />} />
        <Route path="bookings" element={<CompanyHistory />} />
        <Route path="employes" element={<Employes />} />
        <Route path="setprice" element={<SetPricesForm />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
