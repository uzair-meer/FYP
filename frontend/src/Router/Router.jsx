import { Route, Routes } from "react-router-dom";
import Services from "../pages/company/services/Services";
import PriceCalculator from "../pages/company/services/PriceCalculator";
import Layout from "../layout/Layout";
const AppRouter = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Layout />} />
      <Route path="services" element={<Services />} />
      <Route path="services/get/quote" element={<PriceCalculator />} />
    </Routes>
  );
};

export default AppRouter;
