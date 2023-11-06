import React, { useState } from "react";
import AuthService from "src/api/services/auth.service";
const { register, login } = AuthService;
function SignUp() {
  const [mode, setMode] = useState("user");
  const [servicesData, setServicesData] = useState([]); // To store service data from the backend

  useEffect(() => {
    // Fetch service data from the backend when the component mounts
    fetchServiceData();
  }, []);

  const fetchServiceData = async () => {
    try {
      // Replace with your actual API endpoint to fetch service data
      const response = await fetch("/api/services"); // Adjust the URL as needed
      if (!response.ok) {
        throw new Error("Failed to fetch service data");
      }

      const data = await response.json();
      setServicesData(data); // Store the fetched service data
    } catch (error) {
      console.error("Error fetching service data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an array to store selected services based on checkboxes
    const selectedServices = servicesData
      .filter((service) => formData[service._id]) // Check if the checkbox is checked
      .map((service) => service._id); // Get the service IDs

    // Create a company object to send to your backend
    const companyData = {
      companyName: formData.companyName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      services: selectedServices, // Include the selected service IDs
    };

    // Send the companyData to your backend for registration
    // ...

    // Reset the form
    setFormData({
      companyName: "",
      email: "",
      password: "",
      phone: "",
    });
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
              <div className="mb-4">
                <label
                  htmlFor="cnic"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Cnic:
                </label>
                <input
                  type="password"
                  id="cnic"
                  name="cnic"
                  value={formData.cnic}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
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
            {/* <div className="mb-4">
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
            </div> */}
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
