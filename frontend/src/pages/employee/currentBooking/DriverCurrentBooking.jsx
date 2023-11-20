import React, { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext'

function DriverCurrentBooking() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStatus, setCurrentStatus] = useState("Driver Arrived");

  const updateStatus = (newStatus) => {
    setCurrentStatus(newStatus);
  };

  // Render loading, error, or booking data
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="w-[95%] mx-auto">
      <h2 className="font-bold text-headings">Latest Order Status</h2>
      {/* status bar component */}
      <div className="bg-[#f2bbb3] p-2 ">
        {/* services and location */}
        <div className="flex justify-between items-center">
          <div className="">
            <div>
              <h3 className="text-[1.1rem] my-2 font-bold">Services</h3>
              <p>packing, unpacking</p>
            </div>
            <div>
              <h3 className="text-[1.1rem] my-2 font-bold">Location</h3>
              <p>Gujranwal</p>
            </div>
          </div>
          <div>
            <button className="bg-primary rounded-md text-white p-1">
              View Details
            </button>
          </div>
        </div>
        {/* // status */}
        <div className="mt-5">
          <div className="p-4">
            <div className="flex items-center">
              {/* Status: Driver Arrived */}
              <div
                className={`text-center rounded-md ${
                  currentStatus === "Driver Arrived"
                    ? "text-primary font-bold"
                    : "text-gray-500"
                }`}
              >
                Driver Arrived
              </div>
              <div
                className={`flex-auto border-t-2 ${
                  currentStatus !== "Driver Arrived"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              ></div>

              {/* Status: Packing */}
              <div
                className={`text-center  ${
                  currentStatus === "Packing"
                    ? "text-primary font-bold"
                    : "text-gray-500"
                }`}
              >
                Packing
              </div>
              <div
                className={`flex-auto border-t-2 ${
                  currentStatus !== "Packing" &&
                  currentStatus !== "Driver Arrived"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              ></div>

              {/* Status: Dispatched */}
              <div
                className={`text-center ${
                  currentStatus === "Dispatched"
                    ? "text-primary font-bold"
                    : "text-gray-500"
                }`}
              >
                Dispatched
              </div>
              <div
                className={`flex-auto border-t-2 ${
                  currentStatus === "Unloading"
                    ? "border-primary"
                    : "border-gray-300"
                }`}
              ></div>

              {/* Status: Unloading */}
              <div
                className={`text-center ${
                  currentStatus === "Unloading"
                    ? "text-primary font-bold"
                    : "text-gray-500"
                }`}
              >
                Unloading
              </div>

              {/* Update Button */}
              <button
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  if (currentStatus === "Driver Arrived")
                    updateStatus("Packing");
                  else if (currentStatus === "Packing")
                    updateStatus("Dispatched");
                  else if (currentStatus === "Dispatched")
                    updateStatus("Unloading");
                  else updateStatus("Driver Arrived"); // Resets to first status
                }}
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex my-7">
        <div className="">
          <div className="flex gap-5">
            <h3 className="font-bold">Name:</h3>
            <p>hamza</p>
          </div>
          <div className="flex gap-5">
            <h3 className="font-bold">Phone:</h3>
            <p>12455</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default DriverCurrentBooking
