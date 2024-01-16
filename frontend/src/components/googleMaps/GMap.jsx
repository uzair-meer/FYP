import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useServices } from "src/context/UserContext.jsx";

GMap.propTypes = {
  pickupLocation: PropTypes.any,
  destinationLocation: PropTypes.any,
  socketUrl: PropTypes.string,
  bookingId: PropTypes.string,
};

export default function GMap({
  pickupLocation,
  destinationLocation,
  socketUrl,
  bookingId,
}) {
  const { distance, setDistance } = useServices();
  const { time, setTime } = useServices();

  const [directions, setDirections] = useState(null);
  const [duration, setDuration] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [socket, setSocket] = useState(null);
  function getNumericDistance(distanceString) {
    // Extract the numeric part using a regular expression
    const numericPart = distanceString.match(/[0-9.]+/);

    // Check if the numeric part was found
    if (numericPart) {
      // Convert the numeric part to a floating point number and return
      return parseFloat(numericPart[0]);
    } else {
      // Return 0 or handle error appropriately if no numeric part is found
      return 0;
    }
  }

  useEffect(() => {
    if (pickupLocation && destinationLocation) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: pickupLocation,
          destination: destinationLocation,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            // Extract distance and duration
            const route = result.routes[0];
            const numerDistance = getNumericDistance(
              route.legs[0].distance.text
            );
            setDistance(numerDistance);

            setTime(route.legs[0].duration.text);
            // You can set these values in state to use elsewhere in your component
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [pickupLocation, destinationLocation]);

  useEffect(() => {
    // If the socketUrl or bookingId is not provided, do not establish a connection
    if (!socketUrl || !bookingId) return;
    console.log(socketUrl);
    // Establishing a new WebSocket connection
    const newSocket = io(socketUrl);

    // Joining the room with the provided booking ID
    newSocket.emit("joinRoom", { roomId: bookingId });
    console.log(`Joining room with ID: ${bookingId}`);

    // Listening for driver location updates

    newSocket.on("driverLocationUpdate", (location) => {
      console.log("Receiving driver location update:", location);
      console.log(location);
      setDriverLocation(location);
    });
    console.log(driverLocation);
    // Cleanup function for the useEffect hook
    return () => {
      // Leaving the room when the component unmounts or dependencies change
      if (bookingId) {
        newSocket.emit("leaveRoom", { roomId: bookingId });
      }

      // Removing the event listener to prevent memory leaks
      newSocket.off("driverLocationUpdate");

      // Closing the WebSocket connection
      newSocket.close();

      console.log(
        `Left room with ID: ${bookingId} and closed the socket connection`
      );
    };
  }, [socketUrl, bookingId]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
        },
        () => {
          console.error("Error fetching the current location");
        }
      );
    }
  }, []);

  //   useEffect(() => {
  //     if (pickupLocation && destinationLocation) {
  //       const directionsService = new window.google.maps.DirectionsService();

  //       directionsService.route(
  //         {
  //           origin: pickupLocation,
  //           destination: destinationLocation,
  //           travelMode: window.google.maps.TravelMode.DRIVING,
  //         },
  //         (result, status) => {
  //           if (status === window.google.maps.DirectionsStatus.OK) {
  //             setDirections(result);
  //           } else {
  //             console.error(`Error fetching directions ${result}`);
  //           }
  //         }
  //       );
  //     }
  //   }, [pickupLocation, destinationLocation]);

  const containerStyle = {
    width: "100%",
    height: "400px",
    margin: "auto",
    borderRadius: "20px",
  };
  const vehicleIcon = {
    url: "src/assets/truck.png", // Path to your vehicle icon image
    scaledSize: new window.google.maps.Size(32, 32), // Size of the icon
  };
  return (
    <>
      <div></div>
      <GoogleMap
        center={
          driverLocation ||
          (directions
            ? directions.routes[0].bounds.getCenter()
            : currentLocation)
        }
        zoom={15}
        mapContainerStyle={containerStyle}
      >
        {driverLocation && (
          <Marker position={driverLocation} icon={vehicleIcon} />
        )}
        {directions && <DirectionsRenderer directions={directions} />}
        {!driverLocation && !directions && currentLocation && (
          <Marker position={currentLocation} />
        )}
      </GoogleMap>
    </>
  );
}
