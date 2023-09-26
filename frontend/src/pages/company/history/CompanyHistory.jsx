import { CompanyHistoryCols, UserHistory } from "../../../constants/constants";
import Layout from "../../../layout/Layout";

export default function CompanyHistory() {
  return (
    <Layout>
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              {CompanyHistoryCols.map((col) => (
                <th className="min-w-[3rem] py-4 px-4 font-medium text-primary">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className=" border-t-2 border-[#C9CAC8]">
            {UserHistory.map((history) => (
              <tr key={history.id}>
                <td className="py-3 px-4 ">
                  <p className="text-black">{history.date}</p>
                </td>
                <td className="py-3 px-4 ">
                  <p className="text-black ">{history.name}</p>
                </td>
                <td className="py-3 px-4 ">
                  <p className="text-black ">{history.services}</p>
                </td>
                <td className="py-3 px-4 ">
                  <p className="text-black ">{history.price}</p>
                </td>
                <td className="py-3 px-4 ">
                  <p className="text-black ">{history.status}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
