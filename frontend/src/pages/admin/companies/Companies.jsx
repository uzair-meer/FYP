import React from "react";
import Table from "src/components/Table/Table";
import { TOTAL_COMPANIES_COLS } from "src/constants/constants";
import { COMPANIES_DATA } from "src/constants/constants";

function Companies() {
  return (
    <div>
      <Table
        columns={TOTAL_COMPANIES_COLS}
        data={COMPANIES_DATA}
        loading={false}
      />
    </div>
  );
}

export default Companies;
