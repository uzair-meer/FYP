import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "src/api/services/auth.service";

const { registerUser } = AuthService;

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cnic: "",
    role: "client",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // CNIC validation
    if (!formData.cnic || !/^\d{13}$/.test(formData.cnic)) {
      errors.cnic = "CNIC must be exactly 13 digits long";
    }

    // Phone number validation
    if (!formData.phone || !/^\d{11}$/.test(formData.phone)) {
      errors.phone = "Phone number must be exactly 11 digits long";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // If the form is valid, submit the data
      console.log(formData);
      registerUser(formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        cnic: "",
        role: "client",
      });
      // navigate("/signin");
    }
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
          value={formData.email}
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
          value={formData.password}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.password ? "border-red-500" : ""
          }`}
        />
      </div>

      {errors.cnic && (
        <div className="text-red-500 text-sm mb-4">{errors.cnic}</div>
      )}
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
          className={`w-full p-2 border rounded ${
            errors.cnic ? "border-red-500" : ""
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
          value={formData.phone}
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
  );
};

export default UserForm;

// import { useState } from "react";
// import { useNavigate } from "react-router";
// import AuthService from "src/api/services/auth.service";

// const { registerUser } = AuthService;

// const UserForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     cnic: "",
//     role: "client"
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You can now access the form data in the `formData` object
//     console.log(formData);
//     registerUser(formData);
//     setFormData({
//       name: "",
//       email: "",
//       password: "",
//       phone: "",
//       cnic: "",
//       role: "client"
//     });
//     navigate("/signin");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label
//           htmlFor="name"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Name:
//         </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="cnic"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           CNIC:
//         </label>
//         <input
//           type="text"
//           id="cnic"
//           name="cnic"
//           value={formData.cnic}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="email"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Email:
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="password"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Password:
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <div className="mb-4">
//         <label
//           htmlFor="phone"
//           className="block text-gray-700 text-sm font-bold mb-2"
//         >
//           Phone:
//         </label>
//         <input
//           type="tel"
//           id="phone"
//           name="phone"
//           value={formData.phone}
//           onChange={handleChange}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <button
//         type="submit"
//         className="bg-primary text-white px-4 py-2 rounded-full focus:outline-none"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };

// export default UserForm;
