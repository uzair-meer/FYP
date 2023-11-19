import React, { useState } from "react";
import signup from "../../assets/signup.jpg";
import UserForm from "./UserSignUp";
import CompanyForm from "./CompanyForm";
function SignUp() {
  const [mode, setMode] = useState("client");

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <>
      <div className="flex">
        <img src={signup} className="w-[45%]" />
        <div className="mt-5 w-[30%] mx-auto ml-25 bg-white ">
          <div className="flex justify-center mb-4 space-x-4">
            <button
              className={`${
                mode === "client"
                  ? "bg-primary text-white"
                  : "bg-redish text-primary"
              } px-4 py-2 rounded-full focus:outline-none`}
              onClick={() => toggleMode("client")}
            >
              Client
            </button>
            <button
              className={`${
                mode === "company"
                  ? "bg-primary text-white"
                  : "bg-redish text-primary"
              } px-4 py-2 rounded-full focus:outline-none`}
              onClick={() => toggleMode("company")}
            >
              Company
            </button>
          </div>
          {mode === "client" ? (
            <div>
              <UserForm />
            </div>
          ) : (
            <div>
              <CompanyForm />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SignUp;
