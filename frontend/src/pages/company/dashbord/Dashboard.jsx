import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Dashboard = () => {
  return (
    <>
      {/* // dash stats */}
      <div>
        <div className="w-full flex flex-wrap justify-center gap-20">
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">130+</h2>
            <p className="text-primary">Bookings</p>
          </div>
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">30+</h2>
            <p className="mx-1 text-primary">Clients</p>
          </div>
          <div className="p-2">
            <h2 className="text-[2rem] font-bold ">1.1M+</h2>
            <p className="text-primary">Revenue</p>
          </div>
        </div>
      </div>
    </>
  );
};
