import React from "react";
import Table from "src/components/Table/Table";
import { Driver_History_Cols } from "src/constants/constants";
import { Driver_History } from "src/constants/constants";

function DriverHistory() {
  return (
    <Table
      columns={Driver_History_Cols}
      data={Driver_History}
      loading={false}
    />
  );
}

export default DriverHistory;
