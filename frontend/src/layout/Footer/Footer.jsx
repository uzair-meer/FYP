import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import truck from "src/assets/truck.png";

function Footer() {
  return (
    <div className="bg-zinc-800">
      <div className="text-center p-2 w-[90%] mx-auto ">
        {/* //footer content */}
        <div>
          <h1 className="text-[3rem] text-white pt-10 font-bold ">
            Let Us Deliver Your Package To Its Destination
          </h1>

          <Link to="signup">
            <button className="bg-primary rounded-full text-white mt-7 mb-12 px-7 p-2">
              Register Now
            </button>
          </Link>
        </div>

        <div className="p-4 sm:flex justify-between border-t mt-6  items-center">
          <div className="mb-5">
            <img src={truck} className="w-[3rem]" />
            <h3 className="text-white text-left">
              We are the best in bussiness.
            </h3>
          </div>
          <ul className="flex items-center text-white decoration-2">
            <li className="mx-2 cursor-pointer text-link  hover:underline active:underline active:text-primary decoration-secondary">
              <ScrollLink activeClass=" underline" smooth spy to="home">
                Home
              </ScrollLink>
            </li>
            <li className="mx-2 cursor-pointer text-link hover:underline  decoration-secondary">
              <ScrollLink activeClass=" underline" smooth spy to="portfolio">
                Portfolio
              </ScrollLink>
            </li>
            <li className="mx-2 cursor-pointer hover:underline decoration-secondary">
              <ScrollLink activeClass=" underline" smooth spy to="services">
                Services
              </ScrollLink>
            </li>
          </ul>
        </div>

        {/* //coopy riths */}
        <div className="flex justify-between items-center pb-10 text-white">
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
