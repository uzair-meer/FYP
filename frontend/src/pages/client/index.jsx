import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { CLIENT_PORTAL_ROUTES } from "src/constants/constants";
import MenuLayout2 from "../../layout/MenuLayout/MenuLayout2";

export default function C() {
  return (
    <>
      <MenuLayout2 menuItems={CLIENT_PORTAL_ROUTES} />
    </>
  );
}
