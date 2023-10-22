import MenuLayout from "src/layout/MenuLayout/MenuLayout";
import { ADMIN_ROUTES } from "src/constants/constants";

export default function Home() {
  return (
    <>
      <MenuLayout menuItems={ADMIN_ROUTES} />
    </>
  );
}
