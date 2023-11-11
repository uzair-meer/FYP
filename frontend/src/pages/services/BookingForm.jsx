import React, { useState } from "react";

const FetchPricesAndBookForm = () => {
  const clientId = "6518023f237f71d0a5423a12";
  const [inventoryItem, setInventoryItem] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [companyPrices, setCompanyPrices] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    pickUpAddress: "",
    destinationAddress: "",
    services: { packing: false, unpacking: false, moving: false },
    cart: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddItem = () => {
    if (inventoryItem) {
      setInventoryItems([...inventoryItems, inventoryItem.trim()]);
      setInventoryItem("");
    }
  };

  const fetchPrices = async () => {
    setIsLoading(true);
    setError(null);
    const itemsQuery = inventoryItems.join(",");

    try {
      const response = await fetch(
        `http://localhost:5000/client/select-company?inventoryItems=${encodeURIComponent(
          itemsQuery
        )}`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setCompanyPrices(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitFetchPrices = (e) => {
    e.preventDefault();
    if (inventoryItems.length > 0) {
      fetchPrices();
    } else {
      setError("Please add at least one item.");
    }
  };

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    setBookingDetails({
      ...bookingDetails,
      cart: company.inventory.map((item) => ({ name: item.name, quantity: 1 })),
    });
  };

  const handleServiceChange = (service) => {
    setBookingDetails({
      ...bookingDetails,
      services: {
        ...bookingDetails.services,
        [service]: !bookingDetails.services[service],
      },
    });
  };

  const handleCartQuantityChange = (index, quantity) => {
    const updatedCart = [...bookingDetails.cart];
    updatedCart[index].quantity = quantity;
    setBookingDetails({ ...bookingDetails, cart: updatedCart });
  };

  const handleBookingDetailChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const bookingData = {
      clientId,
      companyId: selectedCompany?.companyId,
      pickUpAddress: bookingDetails.pickUpAddress,
      destinationAddress: bookingDetails.destinationAddress,
      services: Object.keys(bookingDetails.services).filter(
        (service) => bookingDetails.services[service]
      ),
      cart: bookingDetails.cart.filter((item) => item.quantity > 0),
    };

    // TODO: Send the bookingData to your server's booking endpoint
    const url = "http://localhost:5000/client/booking";
    try {
      console.log(bookingData);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmitFetchPrices}>
        <label>
          Add Inventory Item:
          <input
            type="text"
            value={inventoryItem}
            onChange={(e) => setInventoryItem(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>
        <button type="submit">Fetch Prices</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <h2>Company Prices</h2>
      <ul>
        {companyPrices.map((company) => (
          <li key={company.companyId}>
            <h3>{company.companyName}</h3>
            <ul>
              {company.inventory.map((item) => (
                <li key={item.name}>
                  {item.name}: Moving - ${item.movingPrice}, Packing - $
                  {item.packingPrice}, Unpacking - ${item.unpackingPrice}
                </li>
              ))}
            </ul>
            <button onClick={() => handleSelectCompany(company)}>
              Book Now
            </button>
          </li>
        ))}
      </ul>

      {selectedCompany && (
        <form onSubmit={handleBookingSubmit}>
          <h2>Booking Details for {selectedCompany.companyName}</h2>
          <label>Pick-up Address:</label>
          <input
            name="pickUpAddress"
            type="text"
            value={bookingDetails.pickUpAddress}
            onChange={handleBookingDetailChange}
            required
          />
          <label>Destination Address:</label>
          <input
            name="destinationAddress"
            type="text"
            value={bookingDetails.destinationAddress}
            onChange={handleBookingDetailChange}
            required
          />
          {bookingDetails.cart.map((item, index) => (
            <div key={index}>
              <label>{item.name} Quantity:</label>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  handleCartQuantityChange(index, parseInt(e.target.value, 10))
                }
                min="0"
              />
            </div>
          ))}
          <div>
            <label>
              <input
                type="checkbox"
                checked={bookingDetails.services.packing}
                onChange={() => handleServiceChange("packing")}
              />
              Packing
            </label>
            <label>
              <input
                type="checkbox"
                checked={bookingDetails.services.unpacking}
                onChange={() => handleServiceChange("unpacking")}
              />
              Unpacking
            </label>
            <label>
              <input
                type="checkbox"
                checked={bookingDetails.services.moving}
                onChange={() => handleServiceChange("moving")}
              />
              Moving
            </label>
          </div>
          <button type="submit">Submit Booking</button>
        </form>
      )}
    </div>
  );
};

export default FetchPricesAndBookForm;
