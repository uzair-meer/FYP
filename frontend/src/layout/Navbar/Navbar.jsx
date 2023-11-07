import { Link as ScrollLink } from "react-scroll";
import truck from "src/assets/truck.png";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="flex justify-between items-center bg-primary w-full drop-shadow-md sticky overflow-none z-10 top-0 p-2">
      {/* Logo */}
      <img className="w-[3rem]" src={truck} />
      <h3 className="text-textColor">HShift</h3>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={toggleNavbar}
        type="button"
        className="md:hidden block text-textColor focus:outline-none p-2"
      >
        <AiOutlineMenu className="text-2xl" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden md:mt-0 absolute top-full left-0 bg-white w-full z-20`}
      >
        <ul className="flex flex-col items-center text-center text-textColor py-2">
          <li className="my-2 cursor-pointer text-link hover:underline decoration-secondary">
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              duration={500}
              onClick={toggleNavbar}
              activeClass="text-primary underline"
            >
              Home
            </ScrollLink>
          </li>
          <li className="my-2 cursor-pointer text-link hover:underline decoration-secondary">
            <ScrollLink
              to="portfolio"
              spy={true}
              smooth={true}
              duration={500}
              onClick={toggleNavbar}
              activeClass="text-primary underline"
            >
              Portfolio
            </ScrollLink>
          </li>
          <li className="my-2 cursor-pointer text-link hover:underline decoration-secondary">
            <ScrollLink
              to="services"
              spy={true}
              smooth={true}
              duration={500}
              onClick={toggleNavbar}
              activeClass="text-primary underline"
            >
              Services
            </ScrollLink>
          </li>
        </ul>
      </div>

      {/* navlinks */}
      <div className="hidden md:flex mr-[2rem]">
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
    </nav>
  );
}
export default Navbar;
