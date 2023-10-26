import React from "react";
import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { ADMIN_ROUTES } from "src/constants/constants";

function Admin() {
  return <MenuLayout menuItems={ADMIN_ROUTES} />;
}

export default Admin;
