"use client";
import { useState } from "react";

function AddEmployeeModal({ showAddEmployeeModal, setShowAddEmployeeModal }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "electrician",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission here.
  };

  return (
    <>
      {showAddEmployeeModal ? (
        <>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none ">
            {/*content*/}
            <div className="   rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none w-1/3 py-8">
              <div className="flex flex-col justify-center gap-4 text-left w-[80%]  mx-auto">
                {/*body*/}
                <form className="form">
                  <div>
                    <label className="inline-block my-2 font-bold">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-block my-2 font-bold">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-block my-2 font-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-block my-2 font-bold">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="inline-block my-2 font-bold">Role</label>
                    <select
                      //   value={formData.role}
                      //   onChange={handleChange}
                      className="block w-full bg-transparent p-2 border border-gray rounded-md"
                    >
                      <option value="electrician">Electrician</option>
                      <option value="driver">Driver</option>
                      <option value="plumber">Plumber</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    onClick={() => setShowAddEmployeeModal(false)}
                    className="block border-0 w-full p-2 text-title-xsml bg-primary text-white mt-4 font-semibold rounded-md"
                  >
                    Add
                  </button>
                  <button
                    type="submit"
                    onClick={() => setShowAddEmployeeModal(false)}
                    className="block border-0 w-full p-2 text-title-xsml bg-gray-200 text-primary mt-4 font-semibold rounded-md"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AddEmployeeModal;
