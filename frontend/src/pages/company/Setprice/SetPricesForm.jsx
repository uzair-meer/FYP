import React, { useState } from "react";

const SetPricesForm = () => {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({
    id: null,
    name: "",
    movingPrice: "",
    shiftingPrice: "",
    loadingPrice: "",
  });

  const addItem = (e) => {
    e.preventDefault(); // Prevent form submission
    if (item.name.trim() !== "") {
      setItems([...items, { ...item, id: Date.now() }]);
      setItem({
        ...item,
        name: "",
        movingPrice: 0,
        shiftingPrice: 0,
        loadingPrice: 0,
      });
    }
  };

  const editItem = (itemId) => {
    const selectedItem = items.find((item) => item.id === itemId);
    setItem(selectedItem);
  };

  const updateItem = (e) => {
    e.preventDefault(); // Prevent form submission
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id ? { ...item } : prevItem
      )
    );
    setItem({
      id: null,
      name: "",
      movingPrice: "",
      shiftingPrice: "",
      loadingPrice: "",
    });
  };

  const deleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div>
      <form onSubmit={item.id ? updateItem : addItem} className="p-10">
        <div className="flex gap-5">
          <div className="flex items-center">
            <label>Name:</label>
            <input
              type="text"
              value={item.name}
              onChange={(e) => setItem({ ...item, name: e.target.value })}
            />
          </div>
          <div className="flex items-center">
            <label>Moving Price:</label>
            <input
              type="number"
              value={item.movingPrice}
              onChange={(e) =>
                setItem({ ...item, movingPrice: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center">
            <label>Shifting Price:</label>
            <input
              type="number"
              value={item.shiftingPrice}
              onChange={(e) =>
                setItem({ ...item, shiftingPrice: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex items-center">
            <label>Loading Price:</label>
            <input
              type="number"
              className="border-2"
              value={item.loadingPrice}
              onChange={(e) =>
                setItem({ ...item, loadingPrice: Number(e.target.value) })
              }
            />
          </div>
        </div>
        <button type="submit">{item.id ? "Update Item" : "Add Item"}</button>
      </form>
      <h2>Item List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>Moving Price: ${item.movingPrice}</span>
              <span>Shifting Price: ${item.shiftingPrice}</span>
              <span>Loading Price: ${item.loadingPrice}</span>
              <button onClick={() => editItem(item.id)}>Edit Price</button>
              <button onClick={() => deleteItem(item.id)}>Delete Item</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the list.</p>
      )}
    </div>
  );
};

export default SetPricesForm;
