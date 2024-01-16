import { useEffect, useState } from "react";
import Table from "src/components/Table/Table.jsx";
import { useServices } from "src/context/UserContext.jsx";
import ConfirmBooking from "../components/ConfirmBooking";

export default function CompanyRates() {
  const { items, setCompanies, selectedServices, distance } = useServices();
  const [companiesData, setCompaniesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      const itemsQuery = items.map((item) => item.name.toLowerCase()).join(",");

      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/client/select-company?inventoryItems=${encodeURIComponent(
            itemsQuery
          )}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const { data } = await response.json();

        const transformedData = data.map((company, index) => {
          let grandTotal = 0;

          company.inventory.forEach((item) => {
            const matchingItem = items.find(
              (i) => i.name.toLowerCase() === item.name
            );

            let subTotal = 0;
            if (matchingItem) {
              subTotal = selectedServices.includes("Packing")
                ? subTotal + matchingItem.quantity * item.packingPrice
                : subTotal;
              subTotal = selectedServices.includes("Unpacking")
                ? subTotal + matchingItem.quantity * item.unpackingPrice
                : subTotal;
              subTotal = selectedServices.includes("Shifting")
                ? subTotal +
                  matchingItem.quantity * (item.movingPrice * distance)
                : subTotal;

              grandTotal += subTotal;
            }
          });

          return {
            sr: index + 1,
            companyName: company.companyName,
            services: selectedServices.join(", "),
            grandTotal: grandTotal,
            data: company,
          };
        });

        setCompaniesData(transformedData);
      } finally {
        setIsLoading(false);
      }
    };

    if (items.length > 0) {
      fetchPrices(items);
    }
  }, [items, selectedServices]);

  return (
    <div className="mx-4">
      <Table
        columns={["Sr. ", "Company name", "Services", "Cost (in Rs)"]}
        components={[{ Component: ConfirmBooking, props: {} }]}
        enableRowToggle={true}
        data={companiesData}
        idKey={"companyId"}
      />
    </div>
  );
}
