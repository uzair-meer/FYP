import React from "react";
import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { Driver_Routes } from "src/constants/constants";

function DriverPanel() {
  return <MenuLayout menuItems={Driver_Routes} />;
}

export default DriverPanel;
