import React, { useState } from "react";
import AuthService from "src/api/services/auth.service";

const { registerUser } = AuthService;

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cnic: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now access the form data in the `formData` object
    console.log(formData);
    registerUser(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="cnic"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          CNIC:
        </label>
        <input
          type="text"
          id="cnic"
          name="cnic"
          value={formData.cnic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="phone"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-full focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
};

export default UserForm;
