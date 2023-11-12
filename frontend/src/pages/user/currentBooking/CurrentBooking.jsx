import React, { useState } from "react";

const CurrentBooking = () => {
  const [status, setStatus] = useState("driverArrived"); // default status

  const statusClasses = {
    driverArrived: "w-1/4",
    packing: "w-2/4",
    dispatched: "w-3/4",
    unloading: "w-full",
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-gray-700 text-lg font-bold mb-2">
            Latest Order Status
          </h2>
          <div className="flex items-center">
            <div
              className={`h-1 bg-red-500 ${statusClasses[status]} transition-all duration-500`}
            ></div>
            <div className="h-1 bg-gray-300 flex-grow"></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Services:
          </h3>
          <p>Residential Moving, Packing, and Unloading</p>
        </div>

        <div className="mb-6">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">
            Location:
          </h3>
          <p>Johar Town, LHR - People's colony, FSD</p>
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={() => setStatus("packing")} // example of setting status
        >
          Update Status
        </button>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-6">
          <h3 className="text-gray-700 text-lg font-bold mb-2">
            Driver Information
          </h3>
          <div className="mb-2">
            <p className="text-gray-600">Name: Shahbaz Arshad</p>
            <p className="text-gray-600">Phone No: 0309 12345678</p>
            <p className="text-gray-600">Arrival: 11:00 AM</p>
            <p className="text-gray-600">Departure: Currently not departure</p>
          </div>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Chat with driver
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentBooking;
