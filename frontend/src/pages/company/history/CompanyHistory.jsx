import Table from "src/components/Table/Table";
import { COMPANY_BOOKINGS_TABLE_COLUMNS } from "src/constants/constants";
import { UserHistory } from "src/constants/constants";

export default function CompanyHistory() {
  return (
    <div>
      <Table
        columns={COMPANY_BOOKINGS_TABLE_COLUMNS}
        data={UserHistory}
        loading={false}
      ></Table>
    </div>
  );
}
