import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "src/api/services/auth.service";

const { registerCompany } = AuthService;

function CompanyForm() {
  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can now access the form data in the `companyFormData` object
    console.log(companyFormData);
    registerCompany(companyFormData);

    setCompanyFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    navigate("/signin");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Company Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={companyFormData.name}
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
            value={companyFormData.email}
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
            value={companyFormData.password}
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
            value={companyFormData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        {/* // services */}
        {/* <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Services:
      </label>
      <input
        type="checkbox"
        id="moving"
        name="moving"
        checked={companyFormData.moving}
        onChange={handleChange}
      />
      <label
        htmlFor="moving"
        className="ml-2 text-gray-700 text-sm mr-2"
      >
        Moving
      </label>
      <input
        type="checkbox"
        id="packing"
        name="packing"
        checked={companyFormData.packing}
        onChange={handleChange}
      />
      <label
        htmlFor="packing"
        className="ml-2 text-gray-700 text-sm mr-2"
      >
        Packing
      </label>
      <input
        type="checkbox"
        id="unpacking"
        name="unpacking"
        checked={companyFormData.unpacking}
        onChange={handleChange}
      />
      <label
        htmlFor="unpacking"
        className="ml-2 text-gray-700 text-sm mr-2"
      >
        Unpacking
      </label>
    </div> */}
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-full focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CompanyForm;
