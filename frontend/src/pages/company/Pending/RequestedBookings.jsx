import { useAuth } from "src/context/AuthContext.jsx";
import { useEffect, useState } from "react";
import RequestedBookingCard from "./RequestedBookingCard";
// import PendingCard from "src/pages/company/Pending/PendingCard.jsx";

export default function RequestedBookings() {
  const { user } = useAuth();
  const [requestedBookings, setRequestedBookings] = useState([]);

  const [employees, setEmployees] = useState([]);

  //fetch free employees
  useEffect(() => {
    const getFreeEmployees = async () => {
      const resp = await fetch(
        `http://localhost:5000/company/get/free/employees?companyId=${user._id}`
      );
      const data = await resp.json();
      setEmployees(data);
    };
    getFreeEmployees();
  }, [user._id]);

  //fetch all requested bookings
  useEffect(() => {
    const fetchRequested = async () => {
      let url = "http://localhost:5000/company/booking-requests?";
      try {
        const response = await fetch(url + "companyId=" + user._id);
        const { data } = await response.json();
        setRequestedBookings(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user._id) {
      fetchRequested();
    }
  }, [user._id]);

  return (
    <div>
      <div className="pending-cards flex flex-wrap gap-2 p-5">
        {requestedBookings.map((booking) => (
          <RequestedBookingCard key={booking._id} booking={booking} employees={employees} setRequestedBookings={setRequestedBookings} />
        ))}
      </div>
    </div>
  );
}
