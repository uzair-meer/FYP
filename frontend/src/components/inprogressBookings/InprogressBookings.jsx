import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { transformBookingData } from "../../helpers/booking.helper";
import Table from "../Table/Table";

export default function InprogressBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user.role !== "client") return;

    const fetchReq = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/client/all/bookings?clientId=${user._id}&status=inprogress`
        );
        const result = await response.json();

        if (result.status !== "ok") {
          throw new Error("something wrong wiht api");
        }
        // console.log(result.data);
        const transformedData = transformBookingData(result.data, user);
        // console.log("trans", transformedData);
        setBookings(transformedData);
      } catch (error) {
        //FIXME: handle error
        console.log(error);
      }
    };
    fetchReq();
  }, [user]);

  //TODO: decide what actions do option 1: navigate to detail page option 2: open model

  return (
    <div className="p-6">
      <h1 className="font-bold text-2xl my-6">
        {bookings.length > 0
          ? "Inprogress Bookings"
          : "No Bookings right now. :)"}
      </h1>
      {bookings.length > 0 && (
        <Table
          data={bookings}
          columns={[
            "Sr. ",
            `${user.role === "client" ? "Company name" : "Client name"}`,
            "Services",
            "Status",
            "Cost (in Rs)",
          ]}
        />
      )}
    </div>
  );
}
