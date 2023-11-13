// ServicesContext.js
import React, { createContext, useState, useContext } from "react";

const ServicesContext = createContext();

export const useServices = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [items, setItems] = useState([]);

  const [bookingData, setBookingData] = useState({
    destinationAddress: "",
    services: [],
    status: "",
    employees: [],
  });

  const updateBookingData = (newData) => {
    setBookingData(newData);
  };

  const value = {
    pickupLocation,
    setPickupLocation,
    destinationLocation,
    setDestinationLocation,
    selectedServices,
    setSelectedServices,
    items,
    setItems,
    bookingData,
    updateBookingData,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};
