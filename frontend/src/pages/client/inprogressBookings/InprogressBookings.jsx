// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "src/context/AuthContext.jsx";
// import BookingDetail from "./BookingDetail";

// export default function InprogressBookings() {
//   const { user } = useAuth();
//   const [inprogressBookings, setInprogressBookings] = useState([]);

//   // Fetch booking details on component mount
//   useEffect(() => {
//     const fetchInprogressBookings = async () => {
//       let url = "http://localhost:5000/client/inprogress-bookings?";

//       try {
//         const response = await fetch(url + "clientId=" + user?._id);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const result = await response.json();

//         setInprogressBookings(result.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchInprogressBookings();
//   }, []);

//   //when click on button a data should send to component in our react router there is something for that to transfer data between links

//   //TODO: make table here of all bookings fetched

//   return (
//     <>
//       <div className="overflow-x-auto relative">
//         <table className="w-full text-sm text-left text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="py-3 px-6">
//                 Date
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Company Name
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Services
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Cost (in Rs)
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Status
//               </th>
//               <th scope="col" className="py-3 px-6">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {inprogressBookings &&
//               inprogressBookings.map((booking, index) => {
//                 let totalPrice = 0;
//                 // Iterate over each service
//                 booking.services.forEach((service) => {
//                   // Iterate over each item in the cart
//                   booking.cart.forEach((item) => {
//                     switch (service) {
//                       case "packing":
//                         totalPrice += item.quantity * item.packingPrice;
//                         break;
//                       case "unpacking":
//                         totalPrice += item.quantity * item.unpackingPrice;
//                         break;
//                       default:
//                         // Assuming default case is for movingPrice
//                         totalPrice += item.quantity * item.movingPrice;
//                     }
//                   });
//                 });

//                 const serviceString = booking.services.join(", ");
//                 return (
//                   <tr
//                     key={`inprogress-booking-${index}`}
//                     className="bg-white border-b"
//                   >
//                     <td className="py-4 px-6">{booking.createdAt}</td>
//                     <td className="py-4 px-6">{booking.companyName}</td>
//                     <td className="py-4 px-6">{serviceString}</td>
//                     <td className="py-4 px-6">{totalPrice}</td>
//                     <td className="py-4 px-6">{booking.status}</td>
//                     <td className="py-4 px-6">
//                       {
//                         <Link
//                           to="/client/inprogress-bookings/details"
//                           state={booking}
//                         >
//                           View Details
//                         </Link>
//                       }
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// // return <BookingDetail booking={bookingData} />;
