import { CLIENT_PORTAL_ROUTES } from "src/constants/constants";
import MenuLayout from "src/layout/MenuLayout/MenuLayout";

export default function ClientDashboard() {
  return (
    <>
      <MenuLayout menuItems={CLIENT_PORTAL_ROUTES} />
    </>
  );
}

// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useState } from "react";
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

// export default function UserDashboard() {
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
//     <>
//       <div>user dashboard</div>
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
//     </>
//   );
// }

// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
// import { useEffect, useState } from 'react'
// import io from 'socket.io-client'

// const socket = io('http://localhost:5000')

// export default function UserDashboard() {
// 	const [driverLocation, setDriverLocation] = useState(null)

// 	useEffect(() => {
// 		socket.emit('joinRoom', { roomId: '123' })

// 		socket.on('updateLocationToClient', (location) => {
// 			console.log(location)
// 			setDriverLocation(location)
// 		})

// 		// Cleanup function
// 		return () => {
// 			socket.off('locationUpdate')
// 			socket.disconnect()
// 		}
// 	}, [])

// 	return (
// 		<>
// 			<div>user dashboard</div>
// 			{/* <LoadScript googleMapsApiKey={"YOUR_API_KEY"} libraries={['places']}>
//                 <GoogleMap center={driverLocation || { lat: 0, lng: 0 }} zoom={15}>
//                     {driverLocation && <Marker position={driverLocation} />}
//                 </GoogleMap>
//             </LoadScript> */}
// 		</>
// 	)
// }
