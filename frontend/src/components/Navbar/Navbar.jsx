import Link from "next/link";
import truck from "../../../public/assets/truck.png";
import Image from "next/image";

function Navbar() {
  return (
    <div className="flex justify-between mx-auto p-2 items-center">
      <Image src={truck} height={70} width={70} className="cursor-pointer" />
      <ul className="flex justify-between  gap-5 p-3">
        <Link href="/">
          <li className="hover:text-primary">Home</li>
        </Link>

        <Link href="#about">
          <li className="hover:text-primary">About</li>
        </Link>
      </ul>
    </div>
  );
}

export default Navbar;
