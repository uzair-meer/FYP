import truck from "../../assets/truck.png";
import company from "../../assets/compnay.png";
import hero from "../../assets/hero.jpg";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer";
import MenuLayout from "src/layout/MenuLayout";
import { ADMIN_ROUTES } from "src/constants/constants";

export default function Home() {
  return (
    <>
    <MenuLayout menuItems = { ADMIN_ROUTES}  />
    </>
  );
}



