import React, { useState } from "react";
import { useAuth } from "src/context/AuthContext.jsx";

const SetPricesForm = () => {
  const { user } = useAuth();

  const companyId = user?._id;
  const [inventory, setInventory] = useState([]); // Array to hold multiple items
  const [newItem, setNewItem] = useState({
    name: "",
    movingPrice: "",
    packingPrice: "",
    unpackingPrice: "",
  });
  console.log();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleAddItem = () => {
    // Add the newItem to the inventory array and reset newItem for the next entry
    setInventory([...inventory, newItem]);
    setNewItem({
      name: "",
      movingPrice: "",
      packingPrice: "",
      unpackingPrice: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inventory.length === 0) {
      alert(
        "Please add at least one newitem to the inventory before submitting."
      );
      return;
    }

    const url = "http://localhost:5000/company/product"; // Replace with the actual URL to your API

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyId, // Use the companyId from context
          inventory, // Send the entire array of inventory items
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Inventory items added successfully!");
        setInventory([]); // Clear the inventory array after successful submission
      } else {
        alert(`Failed to add inventory items: ${result.message}`);
      }
    } catch (error) {
      alert(`Network error: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Set Inventory Prices</h2>
      <form onSubmit={handleSubmit} className="p-10">
        <div className="flex gap-5">
          <div className="flex items-center">
            <label>Name:</label>

            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label>Moving Price:</label>
            <input
              type="number"
              name="movingPrice"
              value={newItem.movingPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label>Packing Price:</label>
            <input
              type="number"
              name="packingPrice"
              value={newItem.packingPrice}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label> Unpacking Price:</label>
            <input
              type="number"
              name="unpackingPrice"
              className="border-2"
              value={newItem.unpackingPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleAddItem}
          className="bg-primary p-1 rounded-sm"
        >
          Add to Inventory
        </button>
        <div>
          <button
            onClick={handleSubmit}
            className="bg-[green] p-1 rounded-sm mt-1"
          >
            Submit Inventory
          </button>
        </div>
      </form>
      <h3>Current Inventory</h3>
      <ul>
        {inventory.map((newitem, index) => (
          <li key={index}>
            {newitem.name} - Moving: ${newitem.movingPrice}, Packing: $
            {newitem.packingPrice}, Unpacking: ${newitem.unpackingPrice}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetPricesForm;
