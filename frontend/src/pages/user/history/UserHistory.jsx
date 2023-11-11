import Table from "src/components/Table/Table";
import { User_History } from "src/constants/constants";
import { USER_BOOKINGS_TABLE_COLUMNS } from "src/constants/constants";
import { useServices } from "src/context/UserContext.jsx";

export default function UserHistory() {
  return (
    <div>
      <Table
        columns={USER_BOOKINGS_TABLE_COLUMNS}
        data={User_History}
        loading={false}
      ></Table>
    </div>
  );
}
