"use client";
import { useState } from "react";
// import { useAuth } from "src/context/AuthContext";
import PropTypes from "prop-types";

AssignEmployeeModal.propTypes = {
  showAddEmployeeModal: PropTypes.bool, // Adjust according to the actual data shape
  setShowAddEmployeeModal: PropTypes.func, // Adjust as needed
  bookingId: PropTypes.string,
  employees: PropTypes.array,
  setRequestedBookings: PropTypes.func
};

function AssignEmployeeModal({
  showAddEmployeeModal,
  setShowAddEmployeeModal,
  bookingId,
  employees,
  setRequestedBookings
}) {
  //   const { user } = useAuth();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const assignEmployeeHandler = (id) => {
    //FIXME: we want to change color of div here
    setSelectedEmployees((prev) => [...prev, id]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/company/assign/employees",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            bookingId,
            employeeIds: selectedEmployees,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setShowAddEmployeeModal(false);
      //FIXME: should be removed from props as well -> used for rerendering
      setRequestedBookings((prev) => {
        const filteredBookings = prev.filter(
          (bookingRequest) => bookingRequest._id !== bookingId
        );
        return filteredBookings;
      });
    } catch (error) {
      //FIXME: show error in some popup
      console.log(error);
    }
  };

  return (
    <>
      {showAddEmployeeModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none ">
            {/*content*/}
            <div className="   rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none w-1/3 py-8">
              <form
                onSubmit={submitHandler}
                method="POST"
                className="flex flex-col justify-center gap-4 text-left w-[80%]  mx-auto"
              >
                <div className="flex justify-between text-black">
                  <p>Name</p>
                  <p>Title</p>
                  <p>Action</p>
                </div>

                {/*body*/}
                {employees &&
                  employees.map((employee) => (
                    <div key={employee._id} className="flex justify-between">
                      <p className="text-black">{employee.name}</p>
                      <p className="text-black">{employee.title}</p>
                      <button
                        className="bg-primary text-white rounded-[5px] px-5 py-2"
                        type="button"
                        onClick={assignEmployeeHandler.bind(this, employee._id)}
                      >
                        Assign
                      </button>
                    </div>
                  ))}

                <button
                  className="bg-primary text-white rounded-[5px] px-5 py-2"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AssignEmployeeModal;
