import React from "react";
import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { ADMIN_ROUTES } from "src/constants/constants";

function AdminPanel() {
  return <MenuLayout menuItems={ADMIN_ROUTES} />;
}

export default AdminPanel;
