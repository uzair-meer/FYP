import React from "react";
import Layout from "../../../layout/Layout";

const companies = [
  {
    name: "abc",
    services: ["packing", "unpacking"],
    price: 12500,
  },
  {
    name: "lmp",
    services: ["packing", "loading"],
    price: 12000,
  },
  {
    name: "xyz",
    services: ["packing", "unpacking"],
    price: 13500,
  },
];
function SelectCompany() {
  return (
    <Layout>
      <h1 className="font-bold">Select Compnay</h1>

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
              Name
            </th>
            <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
              Services
            </th>
            <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
              Quote
            </th>
            <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
              Details
            </th>
          </tr>
        </thead>
        <tbody className=" border-t-2 border-[#C9CAC8]">
          {companies.map((company) => (
            <tr key={company}>
              <td className="py-3 px-4 ">
                <p className="text-black">{company.name}</p>
              </td>
              <td className="py-3 px-4 ">
                <p className="text-black ">
                  {company.services.map((service) => (
                    <span className="m-1">{service}</span>
                  ))}
                </p>
              </td>
              <td className="py-3 px-4 ">
                <p className="text-black ">{company.price}</p>
              </td>
              <td>
                <button className="bg-primary text-white p-1 rounded-md">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default SelectCompany;
