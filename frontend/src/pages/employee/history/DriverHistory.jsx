import React, { useEffect, useState } from "react";
import { useAuth } from "src/context/AuthContext";

function EmployeeHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchDriverBookings = async () => {
      setIsLoading(true);
      setError(null);
      const employeeId = user?._id; // Replace with the actual driver's ID
      let url = "http://localhost:5000/employee/bookings?";
      console.log(employeeId);

      try {
        const response = await fetch(url + "employeeId=" + employeeId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Transform the fetched data to match the table structure
        const transformedBookings = data.map((booking) => ({
          clientName: booking.clientId.name, // Use the name from the nested clientId object
          phone: booking.clientId.phone, // Use the phone from the nested clientId object
          services: booking.services.join(", "),
          cartItems: booking.cart
            .map((item) => `${item.quantity}x ${item.name}`)
            .join(", "),
        }));

        setBookings(transformedBookings); // Set your state with the transformed data
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverBookings();
  }, [user?._id]); // If user._id changes, the effect will rerun

  // Render loading, error, or booking data
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="border-b">
          <tr>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Client Name
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Phone
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Services
            </th>
            <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
              Cart Items
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr className="border-b" key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {booking.clientName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.phone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.services}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {booking.cartItems}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeHistory;
