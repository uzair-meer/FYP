// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "src/context/AuthContext.jsx";

// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import {
//   MapContainer,
//   Marker,
//   Polyline,
//   TileLayer,
//   useMap,
// } from "react-leaflet";
// import io from "socket.io-client";
// import truckIconMarkerPng from "../../../assets/truck_icon_marker.png";

// const socket = io("http://localhost:5000");

// // Custom hook to update the map's center
// function SetViewOnClick({ coords }) {
//   const map = useMap();
//   map.setView(coords, map.getZoom());
//   return null;
// }

// export default function BookingDetail() {
//   const { user } = useAuth();
//   const [status, setStatus] = useState("driverArrived"); // default status
//   const location = useLocation();
//   const booking = location.state;

//   const statusClasses = {
//     driverArrived: "w-1/4",
//     packing: "w-2/4",
//     dispatched: "w-3/4",
//     unloading: "w-full",
//   };

//   const [driverLocation, setDriverLocation] = useState([0, 0]); // Default driver location
//   const userLocation = [31.4511, 74.2925]; // Set user's fixed location

//   const customIcon = new L.Icon({
//     iconUrl: truckIconMarkerPng,
//     iconSize: [65, 65], // Size of the icon
//     iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
//     popupAnchor: [1, -34], // Point from which the popup should open relative to the iconAnchor
//     // shadowUrl: 'path/to/marker/shadow.png', // Optional: path to shadow image
//     shadowSize: [41, 41], // Size of the shadow image
//   });

//   useEffect(() => {
//     socket.emit("joinRoom", { roomId: "123" });

//     socket.on("updateLocationToClient", (location) => {
//       console.log("receving in client ", location);
//       // console.log(data)
//       setDriverLocation([location.lat, location.lng]);
//     });

//     // Cleanup function
//     return () => {
//       // socket.off('updateLocationToClient');
//       // socket.disconnect();
//     };
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <div className="mb-4">
//           <h2 className="text-gray-700 text-lg font-bold mb-2">
//             Current Booking Status
//           </h2>
//           <div className="flex items-center">
//             <div
//               className={`h-1 bg-red-500 ${statusClasses[status]} transition-all duration-500`}
//             ></div>
//             <div className="h-1 bg-gray-300 flex-grow"></div>
//           </div>
//           {booking.status}
//         </div>

//         <div className="mb-6">
//           <h3 className="text-gray-600 text-sm font-semibold mb-2">
//             Company name: <span>{booking.companyName}</span>
//           </h3>
//         </div>
//         <div className="mb-6">
//           <h3 className="text-gray-600 text-sm font-semibold mb-2">
//             Services:
//             {booking.services.length > 0 &&
//               booking.services.map((serv) => <p>{serv}</p>)}
//           </h3>
//         </div>

//         <div className="mb-6">
//           <h3 className="text-gray-600 text-sm font-semibold mb-2">
//             destinationAddress:
//           </h3>
//           <p>{booking.destinationAddress}</p>
//         </div>
//       </div>

//       <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         {booking.employees.length > 0 && (
//           <div className="mb-6">
//             <h3 className="text-gray-700 text-lg font-bold mb-2">
//               Employee Information
//             </h3>
//             <div className="mb-2">
//               <p className="text-gray-600">Name: {booking.employees[0].name}</p>
//               <p className="text-gray-600">
//                 Phone No: {booking.employees[0].phone}
//               </p>
//             </div>
//             {/* <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="button"
//           >
//             Chat with driver
//           </button> */}
//           </div>
//         )}
//       </div>
//       <br />
//       <br />
//       <MapContainer
//         center={userLocation}
//         zoom={15}
//         style={{ height: "400px", width: "100%" }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={driverLocation} icon={customIcon} />
//         <Marker position={userLocation} />
//         <Polyline positions={[userLocation, driverLocation]} color="blue" />
//         <SetViewOnClick coords={driverLocation} />
//       </MapContainer>
//     </div>
//   );
// }
