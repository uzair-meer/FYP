import React, { useState, useEffect } from "react";
import { useAuth } from "src/context/AuthContext.jsx";
const CurrentBooking = () => {
  const { user } = useAuth();
  const [status, setStatus] = useState("driverArrived"); // default status

  const statusClasses = {
    driverArrived: "w-1/4",
    packing: "w-2/4",
    dispatched: "w-3/4",
    unloading: "w-full",
  };

  const [bookingData, setBookingData] = useState({
    destinationAddress: "",
    services: [],
    status: "",
    employees: [],
  });
  const [error, setError] = useState(null);

  // Fetch booking details on component mount
  useEffect(() => {
    const getCurrentBooking = async () => {
      let url = "http://localhost:5000/client/current-booking?";

      try {
        const response = await fetch(url + "clientId=" + user?._id);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        const bookingDetails = res.data[0];

        const details = {
          destinationAddress: bookingDetails.destinationAddress,
          services: bookingDetails.services,
          status: bookingDetails.status,
          employees: bookingDetails.employees.map((emp) => ({
            name: emp.name,
            phone: emp.phone,
          })),
        };
        console.log(bookingDetails);
        setBookingData(details);
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentBooking();

    // Cleanup function to cancel the ongoing request when the component unmounts
  }, []);
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-gray-700 text-lg font-bold mb-2">
            Current Booking Status
          </h2>
          <div className="flex items-center">
            <div
              className={`h-1 bg-red-500 ${statusClasses[status]} transition-all duration-500`}
            ></div>
            <div className="h-1 bg-gray-300 flex-grow"></div>
          </div>
          {bookingData.status}
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Services:
            {bookingData.services.map((serv) => (
              <p>{serv}</p>
            ))}
          </h3>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            destinationAddress:
          </h3>
          <p>{bookingData.destinationAddress}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h3 className="text-gray-700 text-lg font-bold mb-2">
            Employee Information
          </h3>
          <div className="mb-2">
            <p className="text-gray-600">
              Name: {bookingData.employees[0].name}
            </p>
            <p className="text-gray-600">
              Phone No: {bookingData.employees[0].phone}
            </p>
          </div>
          {/* <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Chat with driver
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CurrentBooking;
