// ServicesContext.js
import React, { createContext, useState, useContext } from "react";

const ServicesContext = createContext();

export const useServices = () => useContext(ServicesContext);

export const ServicesProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [items, setItems] = useState([]);

  const value = {
    pickupLocation,
    setPickupLocation,
    destinationLocation,
    setDestinationLocation,
    selectedServices,
    setSelectedServices,
    items,
    setItems,
  };

  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};
