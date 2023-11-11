import React, { useState } from "react";

const FetchPricesForm = () => {
  const [inventoryItem, setInventoryItem] = useState("");
  const [inventoryItems, setInventoryItems] = useState([]);
  const [companyPrices, setCompanyPrices] = useState([]);
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
      console.log(data);
      setCompanyPrices(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inventoryItems.length > 0) {
      fetchPrices();
    } else {
      setError("Please add at least one item.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <p>Items to Fetch: {inventoryItems.join(", ")}</p>

        <button type="submit">Fetch Prices</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <h2>Company Prices</h2>
      <ul>
        {companyPrices.map((company) => (
          <li key={company.companyId}>
            {console.log("comapny id: ", company.companyId)}

            <h3>{company.companyName}</h3>
            <ul>
              {company.inventory.map((item) => (
                <li key={item.name}>
                  {console.log("invenotry id: ", company.inventory?.id)}
                  {item.name}: Moving - ${item.movingPrice}, Packing - $
                  {item.packingPrice}, Unpacking - ${item.unpackingPrice}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPricesForm;
