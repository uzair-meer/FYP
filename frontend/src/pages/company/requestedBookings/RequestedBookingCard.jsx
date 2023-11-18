import AssignEmployeeModal from "src/pages/company/components/AssignEmployeeModal.jsx";
import { useState } from "react";

import PropTypes from "prop-types";

RequestedBookingCard.propTypes = {
  booking: PropTypes.object, // Adjust according to the actual data shape
  employees: PropTypes.array, // Adjust as needed
  setRequestedBookings: PropTypes.func, //FIXME: it should be removed from here -> rerender the booking requests
};

export default function RequestedBookingCard({
  booking,
  employees,
  setRequestedBookings,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = async (status) => {
    if (status === "approved") {
      setIsModalOpen(true);
      return;
    }

    const url = "http://localhost:5000/company/assign/employees";
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          bookingId: booking._id,
          requestStatus: "declined",
        }),
      });
      const data = await response.json();
      //FIXME: add message if successful declinec
      console.log(data);
      //should not be used like that
      setRequestedBookings((prev) => {
        const filteredBookings = prev.filter(
          (bookingRequest) => bookingRequest._id !== booking._id
        );
        return filteredBookings;
      });
    } catch (error) {
      //FIXME: add message if error
      console.log(error);
    }
  };

  return (
    <div
      key={booking._id}
      className="card w-[20rem] p-5 flex flex-col bg-primary text-white rounded-[8px]"
    >
      <div className="card-header"></div>
      <div className="card-body flex flex-col w-full gap-2">
        <div className="flex w-full justify-between">
          <p className="font-bold">Client Name</p>
          <p className="">{booking.clientName}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Items</p>
          <p className="">{booking.cart.map((c) => c.name).join(",")}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Pickup Address</p>
          <p className="">{booking.pickupAddress}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Destination Address</p>
          <p className="">{booking.destinationAddress}</p>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-bold">Services</p>
          <p className="">{booking.services.join(",")}</p>
        </div>
        <div className="flex justify-between p-5 ">
          <button
            className="bg-secondary text-white rounded-[5px] px-5 py-2"
            onClick={() => handleAction("approved")}
          >
            Accept
          </button>
          <button
            className="bg-secondary text-white rounded-[5px] px-5 py-2"
            onClick={() => handleAction("declined")}
          >
            Declined
          </button>
        </div>
      </div>
      <AssignEmployeeModal
        employees={employees}
        showAddEmployeeModal={isModalOpen}
        setShowAddEmployeeModal={setIsModalOpen}
        bookingId={booking._id}
        setRequestedBookings={setRequestedBookings}
      />
    </div>
  );
}
