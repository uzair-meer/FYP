import React, { useState, useRef, useMemo } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCirclePlus } from "react-icons/fa6";
import { useLocation } from "react-router";
import ConfirmQuoteModal from "src/components/ConfirmQuoteModal";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

const data = {
  destination: "Johar Town, Lhr - People's Colony, Fsd",
  services: ["Resdential Moving", "Packing"],
  items: [
    { name: "sofa", variance: "5 seater", price: 10, quantity: 5 },
    { name: "bed", variance: "king size", price: 100, quantity: 2 },
  ],
};

function Services() {
  const stuff = [
    { name: "Bed", price: 20 },
    { name: "Sofa", price: 10 },
    { name: "Fridge", price: 5 },
    { name: "Oven", price: 30 },
  ];

  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [items, setItems] = useState([]);
  const [stuffItem, setStuffItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showConfirmQuoteModal, setShowConfirmQuoteModal] = useState(false);

  const google = window.google;

  const handleServiceChange = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  const handleAddItem = () => {
    const stuffItemObj = stuff.find((item) => item.name === stuffItem);
    setItems((prevItems) => [
      ...prevItems,
      { ...stuffItemObj, quantity: +quantity },
    ]);

    // if (selectedItem && quantity) {

    // }
  };

  const handleRemoveItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };
  const getQuote = () => {
    setShowConfirmQuoteModal(true);
    // navigate('get/quote', { state: { pickupLocation, destinationLocation } })
  };

  return (
    <>
      <div className="flex ">
        <form
          onSubmit={(e) => e.preventDefault()}
          action=""
          className="w-[50%]  p-5 ml-4 border-r-[1px]"
        >
          <h1 className="text-headings font-bold">Get a Quote</h1>

          <div className="flex gap-5 mt-10">
            <div className="flex flex-col">
              <label htmlFor="pickupLocation" className="font-medium">
                Pickup
              </label>

              <input
                type="text"
                id="pickupLocation"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="border rounded-md "
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="destinationLocation" className="font-medium">
                Destination
              </label>

              <input
                type="text"
                id="destinationLocation"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                className="border rounded-md"
                required
              />
            </div>
          </div>

          {/* services */}
          <div className="mt-6">
            <h2 className="font-medium">Services</h2>
            <div className=" flex mt-3">
              <label className="mr-3">
                <input
                  type="checkbox"
                  name="services"
                  value="Shifting"
                  className="mx-2"
                  checked={selectedServices.includes("Shifting")}
                  onChange={() => handleServiceChange("Shifting")}
                />
                Shifting
              </label>
              <label className="mr-3">
                <input
                  type="checkbox"
                  name="services"
                  value="Packing"
                  className="mx-2"
                  checked={selectedServices.includes("Packing")}
                  onChange={() => handleServiceChange("Packing")}
                />
                Packing
              </label>
              <label className="mr-3">
                <input
                  type="checkbox"
                  name="services"
                  className="mx-2"
                  value="Unpacking"
                  checked={selectedServices.includes("Unpacking")}
                  onChange={() => handleServiceChange("Unpacking")}
                />
                Unpacking
              </label>
            </div>
          </div>
          {/* items */}
          <div className="mt-6">
            <h2 className="my-2 font-medium">Select Items</h2>
            <select
              onChange={(e) => setStuffItem(e.target.value)}
              className="w-1/4 rounded-md border px-2 py-1"
            >
              <option value="">Select</option>
              {/* Add your item options here */}
              {stuff.map((item, index) => (
                <option value={item.name} key={`stuff-${index}`}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Qty "
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border rounded-md w-23 p-1 mx-2 ml-5"
            />
            <FaCirclePlus
              onClick={handleAddItem}
              className="inline text-[1.6rem] mx-2 mb-1 cursor-pointer text-primary"
            />
            {/* <button
              type="button"
              onClick={handleAddItem}
              className="border p-1 bg-[green] text-white"
            >
              Add Item
            </button> */}
          </div>

          <div className="mt-6">
            <h2 className="my-2 font-medium">Details {"(Optional)"}</h2>
            <form>
              <textarea
                className="border rounded-md p-2 "
                placeholder="Extra details..."
                rows={5}
                cols={50}
              />
            </form>
          </div>
          {/* <button
            className="bg-primary m-auto p-3 my-10 rounded-md text-white"
            onClick={getQuote}
          >
            Get Quote
          </button> */}
        </form>
        <div className=" flex flex-col m-10 ml-20 p-5 justify-between">
          {/* // locations */}
          <div>
            <h1 className="text-headings">Pickup - Destination</h1>
            <div className="flex space-x-1 pb-3 mt-3 border-b-[1px]">
              {pickupLocation && (
                <>
                  {/* <h1 className="text-headings">Pickup</h1> */}
                  <p>{pickupLocation}</p>
                </>
              )}
              <p>-</p>
              {destinationLocation && (
                <>
                  {/* <h1 className="text-paragrah  my-1">Destination</h1> */}
                  <p>{destinationLocation}</p>
                </>
              )}
            </div>
          </div>
          {/* // selected services */}
          <div className="my-3 border-b-[1px] pb-5">
            {selectedServices.length > 0 && (
              <>
                <h1 className="text-headings mb-4">Services</h1>
                <div className="flex gap-5">
                  {selectedServices.map((service) => (
                    <h3
                      className="px-4 py-1 rounded-full bg-primary text-white"
                      key={service}
                    >
                      {service}
                    </h3>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* // items */}
          <div>
            <div className="flex justify-between mx-2 mb-2">
              <p className="text-primary">Item</p>
              <p className="text-primary">Qty</p>
              <p className="text-primary">Item</p>
            </div>
            {items.map((item, index) => (
              <div
                className="flex justify-between mx-2 border-b-[1px] py-2 "
                key={index}
              >
                <p>{item.name}</p>
                <p>{item.quantity}</p>
                <AiOutlineDelete
                  onClick={() => handleRemoveItem(index)}
                  className="inline text-[1.3rem] mx-2 cursor-pointer text-primary"
                />
              </div>
            ))}
          </div>
          <button
            className="bg-primary m-auto px-10 font-bold py-2 my-10 rounded-full text-white self-end "
            onClick={getQuote}
          >
            Continue
          </button>
        </div>
      </div>
      <ConfirmQuoteModal
        data={{
          destination: destinationLocation,
          services: selectedServices,
          items: items,
        }}
        showModal={showConfirmQuoteModal}
        setToggle={setShowConfirmQuoteModal}
      />
    </>
  );
}

export default Services;
