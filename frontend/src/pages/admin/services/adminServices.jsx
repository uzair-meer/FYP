import React, { useState } from "react";

function Services() {
  const [services, setServices] = useState([]);
  const [service, setService] = useState({
    id: null,
    name: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setService({ ...service, [name]: value });
  };

  const handleAddService = () => {
    if (!service.name || !service.description) return;

    if (isEditing) {
      // Update existing service
      const updatedServices = services.map((item) =>
        item.id === service.id ? service : item
      );
      setServices(updatedServices);
      setIsEditing(false);
    } else {
      // Add new service
      setServices([...services, { ...service, id: Date.now() }]);
    }

    // Clear form inputs
    setService({ id: null, name: "", description: "" });
  };

  const handleEditService = (id) => {
    const editedService = services.find((item) => item.id === id);
    setService(editedService);
    setIsEditing(true);
  };

  const handleDeleteService = (id) => {
    const updatedServices = services.filter((item) => item.id !== id);
    setServices(updatedServices);
  };

  return (
    <div>
      <h2>Service Form</h2>
      <form>
        <label>
          Service Name:
          <input
            type="text"
            name="name"
            value={service.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Service Description:
          <input
            type="text"
            name="description"
            value={service.description}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleAddService}>
          {isEditing ? "Update Service" : "Add Service"}
        </button>
      </form>

      <h2>Service List</h2>
      <ul>
        {services.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEditService(item.id)}>Edit</button>
            <button onClick={() => handleDeleteService(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Services;
