import { Link } from "react-router-dom";
import truck from "../../../assets/truck.png";

function Navbar() {
  return (
    <div className="flex justify-between mx-auto p-2 items-center">
      <img src={truck} height={70} width={70} className="cursor-pointer" />
      <ul className="flex justify-between  gap-5 p-3">
        <Link to="/">
          <li className="hover:text-primary">Home</li>
        </Link>

        <Link to="#about">
          <li className="hover:text-primary">About</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
