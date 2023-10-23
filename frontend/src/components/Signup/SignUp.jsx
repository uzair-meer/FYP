import React, { useState } from "react";

function SignUp() {
  const [mode, setMode] = useState("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    companyName: "",
    moving: false,
    packing: false,
    unpacking: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`${
            mode === "user"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          } px-4 py-2 rounded-full focus:outline-none`}
          onClick={() => toggleMode("user")}
        >
          User
        </button>
        <button
          className={`${
            mode === "company"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-600"
          } px-4 py-2 rounded-full focus:outline-none`}
          onClick={() => toggleMode("company")}
        >
          Company
        </button>
      </div>
      {mode === "user" ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">User Form</h2>
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
              className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">Company Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="companyName"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Company Name:
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Services:
              </label>
              <input
                type="checkbox"
                id="moving"
                name="moving"
                checked={formData.moving}
                onChange={handleChange}
              />
              <label htmlFor="moving" className="ml-2 text-gray-700 text-sm">
                Moving
              </label>
              <input
                type="checkbox"
                id="packing"
                name="packing"
                checked={formData.packing}
                onChange={handleChange}
              />
              <label htmlFor="packing" className="ml-2 text-gray-700 text-sm">
                Packing
              </label>
              <input
                type="checkbox"
                id="unpacking"
                name="unpacking"
                checked={formData.unpacking}
                onChange={handleChange}
              />
              <label htmlFor="unpacking" className="ml-2 text-gray-700 text-sm">
                Unpacking
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full focus:outline-none"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp;
