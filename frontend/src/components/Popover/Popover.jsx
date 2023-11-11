import { Popover } from "@headlessui/react";
import { useAuth } from "src/context/AuthContext.jsx";

export function MyPopover({ children }) {
  const { user, logout } = useAuth();

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">{children}</Popover.Button>
      <Popover.Panel className="absolute z-10 -translate-x-36 translate-y-2 w-44">
        <div className="bg-white shadow-md rounded-[8px] text-sm text-textColor">
          <div className="flex gap-3 p-2 items-center">
            <div className="row-span-2 col-span-1 flex justify-center items-center">
              <img
                className="inline-block w-8 min-w-[2rem] rounded-full "
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="flex flex-col">{user?.email}</div>
          </div>
          <hr />
          <div className="flex flex-col items-start">
            <button className="text-black w-full p-2 hover:bg-primary hover:text-white">
              My Account
            </button>
            <button
              onClick={logout}
              className="text-black w-full p-2 hover:bg-primary hover:text-white rounded-b-[5px]"
            >
              Logout
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
}
