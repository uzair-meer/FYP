import { useState } from "react";
import DeleteModel from "../components/DeleteModal";
import AddEmployeeModal from "../components/AddEmployeeModal";
import del from "src/assets/images/delete.png";
import { LiaUserEditSolid } from "react-icons/lia";
import EditEmployeeModal from "../components/EditEmployeeModal";
import { employees } from "src/constants/constants";
Button;
import React from "react";
import Button from "src/components/Button/Button";

const Employes = () => {
  // Delete Model
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showEditEmployeeModal, setShowEditEmployeeModal] = useState(false);
  const [userId, setUserId] = useState(null);

  // Function to toggle the modal
  const toggleDeleteModal = (id) => {
    setShowDeleteModal(!showDeleteModal);
    setUserId(id);
  };
  const toggleEmployeeModal = () => {
    setShowAddEmployeeModal(!showAddEmployeeModal);
  };

  const toggleEditModal = () => {
    console.log("hi");
    setShowEditEmployeeModal(!showEditEmployeeModal);
  };
  return (
    <div>
      <div className="flex justify-between p-3">
        <h3 className="text-paragraph font-bold">Employess</h3>
        <div onClick={toggleEmployeeModal} className="w-fit ">
          <Button>Add Employee</Button>
        </div>
      </div>
      {/* // search bar */}
      <div>
        <div className="flex border-2 mx-4 sm:mx-auto w-[15rem] md:w-[20rem] rounded ">
          <input
            type="text"
            className="px-4 py-2 block w-[90%]"
            placeholder="Search..."
          />
          <button className="flex items-center justify-center px-4 border-l">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
          </button>
        </div>
      </div>

      {/* // table */}
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
                Name
              </th>
              <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
                Phone Number
              </th>
              <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
                Rule
              </th>
              <th className="min-w-[3rem] py-4 px-4 font-medium text-primary ">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-black ">Actions</th>
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
                  <img
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
      <DeleteModel
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />
      <AddEmployeeModal
        showAddEmployeeModal={showAddEmployeeModal}
        setShowAddEmployeeModal={setShowAddEmployeeModal}
      />
      <EditEmployeeModal
        showEditEmployeeModal={showEditEmployeeModal}
        setShowEditEmployeeModal={setShowEditEmployeeModal}
      />
    </div>
  );
};

export default Employes;
