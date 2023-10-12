import React from "react";
import truck from "../../../assets/truck.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-black">
      <div className="text-center p-2 w-[90%] mx-auto ">
        {/* //footer content */}
        <div>
          <h1 className="text-[3rem] text-white">
            Let Us Deliver Your Package To Its Destination
          </h1>
          <p className="p-2 my-2">
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>

          <button className="bg-primary rounded-full text-white p-2">
            Register Now
          </button>
        </div>

        <div className="p-4 sm:flex justify-between border-t mt-6 border-teal-50 items-center">
          <div>
            <img src={truck} />
            <h3 className="text-white text-left">
              We are the best in bussiness.
            </h3>
          </div>
          <ul className="text-white">
            <Link to="/">
              <li className="mx-2 p-1">Home</li>
            </Link>

            <Link>
              <li className="mx-2 p-1">About</li>
            </Link>
            <Link to="/user/register">
              <li className="mx-2 p-1">Services</li>
            </Link>
          </ul>
        </div>

        {/* //coopy riths */}
        <div className="flex justify-between items-center text-white">
          <p>©️ 2023, All rights are reserved for Company Name</p>
          <ul className="flex gap-5">
            <li>Privacy Policy</li>
            <li>Terms and condition</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
