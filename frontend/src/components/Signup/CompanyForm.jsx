import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "src/api/services/auth.service";

const { registerUser } = AuthService;

function CompanyForm() {
  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    ntn: "",
    role: "company",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (
      !companyFormData.email ||
      !/^\S+@\S+\.\S+$/.test(companyFormData.email)
    ) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (companyFormData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // NTN validation
    if (!companyFormData.ntn || !/^\d{7}$/.test(companyFormData.ntn)) {
      errors.ntn = "NTN must be exactly 7 digits long";
    }

    // Phone number validation
    if (!companyFormData.phone || !/^\d{11}$/.test(companyFormData.phone)) {
      errors.phone = "Phone number must be exactly 11 digits long";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If the form is valid, submit the data
      console.log(companyFormData);
      registerUser(companyFormData);
      setCompanyFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        ntn: "",
        role: "company",
      });
      // navigate("/signin");
    }
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

        {errors.email && (
          <div className="text-red-500 text-sm mb-4">{errors.email}</div>
        )}
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
            className={`w-full p-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
        </div>

        {errors.password && (
          <div className="text-red-500 text-sm mb-4">{errors.password}</div>
        )}
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
            className={`w-full p-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
        </div>

        {errors.ntn && (
          <div className="text-red-500 text-sm mb-4">{errors.ntn}</div>
        )}
        <div className="mb-4">
          <label
            htmlFor="ntn"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            NTN no:
          </label>
          <input
            type="text"
            id="ntn"
            name="ntn"
            value={companyFormData.ntn}
            onChange={handleChange}
            className={`w-full p-2 border rounded ${
              errors.ntn ? "border-red-500" : ""
            }`}
          />
        </div>

        {errors.phone && (
          <div className="text-red-500 text-sm mb-4">{errors.phone}</div>
        )}
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
            className={`w-full p-2 border rounded ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
        </div>

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
