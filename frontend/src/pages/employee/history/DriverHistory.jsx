import React, { useEffect, useState } from "react";
import { useAuth } from "src/context/AuthContext";

function DriverHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDriverBookings = async () => {
      setIsLoading(true);
      setError(null);
      const driverId = user?._id; // Replace with the actual driver's ID
      let url = "http://localhost:5000/driver/bookings?";
      console.log(driverId);

      try {
        const response = await fetch(url + "driverId=" + driverId);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setBookings(data); // Set your state with the fetched data
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverBookings();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Render loading, error, or booking data
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.map((booking) => (
        <div key={booking._id} className="booking-card bg-primary p-1">
          <p>{booking.status}</p>
          <p>
            <strong>Pick-Up Address:</strong> {booking.pickUpAddress}
          </p>
          <p>
            <strong>Destination Address:</strong> {booking.destinationAddress}
          </p>
          <p>
            <strong>Services:</strong> {booking.services.join(", ")}
          </p>
          <div>
            <strong>Cart Items:</strong>
            <ul>
              {booking.cart.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DriverHistory;
