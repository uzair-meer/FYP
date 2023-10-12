import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const history = useNavigate();

  // const [selectedDate, setSelectedDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    phone: "",
  });
  const [errors, setErrors] = useState({});

  const { name, email, password, phone } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    const errors = {};
    if (!name.trim()) {
      errors.name = "user name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[0-9]+$/.test(phone)) {
      errors.phone = "Phone number must contain only digits";
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      console.log("error");
      return;
    }

    try {
      // Send request to server to create new user
      //  console.log(selectedDate)
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      history("/login");
      // setErrors(data);
    } catch (err) {
      // Server-side validation errors
      console.log(err);
    }
  };

  return (
    <div className="w-[20%] mx-auto my-5">
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h3 className="text-primary text-headings"> Sign Up</h3>
          <div className="my-1">
            <label htmlFor="name" className="font-bold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="my-1">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="my-1">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div className="my-1">
            <label htmlFor="role" className="font-bold">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
              required
            >
              <option value="user">User</option>
              <option value="company">Company</option>
            </select>
          </div>

          <div className="my-1">
            <label htmlFor="phone" className="font-bold">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
            />
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
          </div>

          <button type="submit" className="p-1 bg-primary text-white">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;

// Client-side validation
// if (password !== confirmPassword) {
//   setErrors({ confirmPassword: 'Passwords do not match' });
//   return;
// }

// Redirect to login page
// history.push('/login');
