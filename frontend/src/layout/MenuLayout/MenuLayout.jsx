import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "src/context/AuthContext.jsx";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MyPopover } from "src/components/Popover/Popover.jsx";
import truck from "src/assets/truck.png";

import PropTypes from "prop-types";

MenuLayout2.propTypes = {
  menuItems: PropTypes.any,
};

export default function MenuLayout2({ menuItems }) {
  const { user } = useAuth();

  const [route, setRoute] = useState("");
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setRoute(location.pathname);
    setIsDrawerOpen(false);
  }, [location]);

  return (
    <div className="flex h-screen">
      {/* <!-- sidebar --> */}
      <div className="flex flex-col w-48 bg-primary">
        <div className="h-[15%] flex items-center justify-center ">
          <div className="flex items-center mt-5 gap-1">
            <img
              src={truck}
              alt="logo"
              className="w-[5rem] cursor-pointer my-2 p-2 ml-3 block"
            />
            {/* <p className="text-white font-bold ">{user?.name}</p> */}
          </div>
          <button
            className="absolute top-4 right-1 sm:hidden hover:bg-grey p-1 rounded-[5px]"
            onClick={() => setIsDrawerOpen(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="">
          <ul className="flex flex-col items-start justify-start text-textColor">
            {menuItems?.map((link) => (
              <Link to={link.route} key={link.name}>
                <li
                  className={`w-[9rem] p-2 pl-0 border-primary cursor-pointer flex items-center hover:bg-white hover:text-primary text-white rounded-r-[10px] transition-all ${
                    route === link.route &&
                    "border-l-8 border-white bg-primary text-white"
                  }`}
                >
                  <div>{link.icon}</div>
                  <span>{link.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>

      {/* <!-- Main content --> */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* navbar */}
        <div className="flex items-center justify-end h-16 border-b bg-primary">
          <div className="h-[12%] flex items-center justify-end p-4">
            <BiMenu
              className="text-2xl sm:hidden"
              onClick={() => setIsDrawerOpen(true)}
            />

            {/* LINKS */}
            <div className="basis-[95%]">
              <ul className="w-full flex items-center justify-end gap-2 sm:gap-5">
                <li>
                  <Link>
                    <MyPopover>
                      <img
                        className="inline-block h-9 w-9 rounded-full border-black border-[1px]"
                        src="https://source.unsplash.com/random/35×35"
                        alt=""
                      />
                    </MyPopover>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* content */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
