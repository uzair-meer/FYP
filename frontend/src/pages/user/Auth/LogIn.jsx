import { useState } from "react";
import { useNavigate } from "react-router";

export default function UserSignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const history = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login authentication logic here
    // You can make an API request to authenticate the user credentials

    try {
      // Send request to server to get creditienals

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const user = await response.json();
      const { status, data } = user;
      if (status === "ok") {
        console.log(data.name);
        if (data.role === "company") {
          history("/company/profile", { state: { name: data.name } });
        } else {
          history("/user/profile", { state: { name: data.name } });
        }
      }
    } catch (err) {
      // Server-side validation errors
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-[20%] mx-auto my-3">
        <form onSubmit={handleSubmit} className="form">
          <h3 className="text-primary text-headings">Login</h3>
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
          </div>

          <div className="my-1">
            <label htmlFor="password" className="font-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full p-2 rounded-md border my-1"
            />
          </div>

          <button type="submit" className="p-1 bg-primary text-white">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
