import { useLocation } from "react-router-dom";
import BookingDetail from "src/components/bookingDetail/BookingDetail";

export default function ClientBookingDetail() {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  if (!data) {
    return null;
  }

  return <BookingDetail data={data} />;
}
