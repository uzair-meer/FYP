import React from "react";
className = "min-w-[3rem] py-4 px-4 font-medium text-primary ";
function Table({ data }) {
  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-left">
            {/* data.map => <tr className="min-w-[3rem] py-4 px-4 font-medium text-primary "></tr> */}
          </tr>
        </thead>
        <tbody className=" border-t-2 border-[#C9CAC8]">
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="py-3 px-4 ">
                <p className="text-black">{employee.name}</p>
              </td>
              <td className="py-3 px-4 ">
                <p className="text-black ">{employee.phone}</p>
              </td>
              <td className="py-3 px-4 ">
                <p className="text-black ">{employee.role}</p>
              </td>
              <td className="py-3 px-4 ">
                <p className="text-black ">{employee.email}</p>
              </td>
              <td className="py-3 px-4 flex cursor-pointer ">
                <LiaUserEditSolid
                  size="24px"
                  className="text-primary"
                  onClick={toggleEditModal}
                />
                <Image
                  src={del}
                  className="cursor-pointer w-[1.2rem] mx-2"
                  onClick={toggleDeleteModal}
                  alt="delte"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
