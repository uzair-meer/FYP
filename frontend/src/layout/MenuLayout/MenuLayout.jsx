import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "src/context/AuthContext.jsx";

import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";
import { MyPopover } from "src/components/Popover/Popover.jsx";
import truck from "src/assets/truck.png";

export function MenuLayout({ menuItems }) {
  const { user } = useAuth();

  const [route, setRoute] = useState("");
  const location = useLocation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setRoute(location.pathname);
    setIsDrawerOpen(false);
  }, [location]);

  return (
    <div className="flex">
      {/* side bar */}
      <div
        className={`w-[12rem] bg-primary flex flex-col h-screen items-start fixed top-0 left-0 z-40 drop-shadow-md sm:drop-shadow-none  sm:static sm:translate-x-0 ${
          isDrawerOpen ? "" : " hidden sm:flex"
        }`}
      >
        <div className="h-[15%] flex items-center justify-center">
          <div className="flex items-center mt-5 gap-1">
            <img
              src={truck}
              alt="logo"
              className="w-[5rem] cursor-pointer my-2 p-2 ml-3 block"
            />
            <p className="text-white font-bold ">{user?.name}</p>
          </div>
          <button
            className="absolute top-4 right-1 sm:hidden hover:bg-grey p-1 rounded-[5px]"
            onClick={() => setIsDrawerOpen(false)}
          >
            <AiOutlineClose />
          </button>
        </div>
        <div className="mt-12">
          <ul className="flex flex-col items-start justify-start gap-5 text-textColor">
            {menuItems?.map((link) => (
              <Link to={link.route} key={link.name}>
                <li
                  className={`w-[9rem] p-2 pl-0 border-primary cursor-pointer flex items-center hover:bg-white hover:text-primary text-white rounded-r-[10px]  transition-all ${
                    route.split("/")[2] === link.route.split("/")[2] &&
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
      {/* Searchbar */}
      <div className="w-[98%] h-screen flex flex-col justify-between  bg-primary">
        <div className="header h-[12%] flex items-center justify-between p-4">
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
        <div className="h-[85%] w-[98%] m-auto bg-white rounded-[5px] overflow-auto no-scrollbar shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MenuLayout;
