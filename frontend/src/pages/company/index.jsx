import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { COMPANY_PORTAL_ROUTES } from "src/constants/constants";

export default function Company() {
  return (
    <>
      <MenuLayout menuItems={COMPANY_PORTAL_ROUTES} />
    </>
  );
}
