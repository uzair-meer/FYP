
//FIXME: its folder should be employee and driver should be manged inside employee as well as others employees
import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { Employee_Routes } from "src/constants/constants";

function EmployeePanel() {
  return <MenuLayout menuItems={Employee_Routes} />;
}

export default EmployeePanel;
