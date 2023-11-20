import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { CLIENT_PORTAL_ROUTES } from "src/constants/constants";

export default function User() {
  return (
    <>
      <MenuLayout menuItems={CLIENT_PORTAL_ROUTES} />
    </>
  );
}
