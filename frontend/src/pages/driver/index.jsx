
//FIXME: its folder should be employee and driver should be manged inside employee as well as others employees
import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { Driver_Routes } from "src/constants/constants";

function DriverPanel() {
  return <MenuLayout menuItems={Driver_Routes} />;
}

export default DriverPanel;
