import { RiDashboardFill } from "react-icons/ri";

import { BiSolidUserCircle } from "react-icons/bi";
import { BsBookmark, BsFillCalendarCheckFill, BsGear } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { MdPriceChange, MdReviews } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";

export const CLIENT_PORTAL_ROUTES = [
  {
<<<<<<< HEAD
    name: "Dashboard",
    route: "/user",
    icon: <RiDashboardFill className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  {
    name: "Bookings",
    route: "/user/bookings",
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem]  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Profile",
    route: "/user/profile",
    icon: <BiSolidUserCircle className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  // {
  //   name: "CurrentBooking",
  //   route: "/user/current-booking",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
  {
    name: "InprogressBookings",
    route: "/user/inprogress-bookings",
    icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  // {
=======
    name: 'Dashboard',
    route: '/client',
    icon: <RiDashboardFill className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  // {
	//   name: "Bookings",
    //   route: "/client/bookings",
    //   icon: (
      //     <BsFillCalendarCheckFill className="text-[1.4rem]  mx-2 cursor-pointer" />
    //   ),
  // },
  {
    name: 'Profile',
    route: '/client/profile',
    icon: <BiSolidUserCircle className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
    {
    name: 'Completed Bookings',
    route: '/client/bookings/completed',
    icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  // {
//   name: "InprogressBookings",
	//   route: "/user/inprogress-bookings",
	//   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
	// },
	// {
>>>>>>> d64b5ae (fixxing merges)
  //   name: "BookingDetail",
  //   route: "/user/inprogress-bookings/detail",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
<<<<<<< HEAD
];

export const COMPANY_PORTAL_ROUTES = [
  {
    name: "Dashboard",
    route: "/company",
=======
]

export const COMPANY_PORTAL_ROUTES = [
  {
    name: 'Dashboard',
    route: '/company',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
<<<<<<< HEAD
    name: "Employees",
    route: "/company/employees",
=======
    name: 'Employees',
    route: '/company/employees',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <FaUsers className="text-[1.4rem]   text-white mx-2 cursor-pointer" />
    ),
  },
  {
<<<<<<< HEAD
    name: "Requested Bookings",
    route: "/company/bookings/requested",
=======
    name: 'Requested Bookings',
    route: '/company/bookings/requested',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  {
<<<<<<< HEAD
    name: "Completed Bookings",
    route: "/company/bookings/completed",
=======
    name: 'Completed Bookings',
    route: '/company/bookings/completed',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <MdReviews className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
<<<<<<< HEAD
    name: "Set Prices",
    route: "/company/prices",
=======
    name: 'Set Prices',
    route: '/company/prices',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <MdPriceChange className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
<<<<<<< HEAD
    name: "Sentiment Analysis",
    route: "/company/reviews/sentiment/report",
=======
    name: 'Sentiment Analysis',
    route: '/company/reviews/sentiment/report',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <MdPriceChange className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
<<<<<<< HEAD
];

export const ADMIN_ROUTES = [
  {
    name: "Requests",
    route: "/admin/companies/requests",
=======
]

export const ADMIN_ROUTES = [
  {
    name: 'Requests',
    route: '/admin/companies/requests',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  // {
  //   name: "Companeies",
  //   route: "/admin/companies",
  //   icon: (
  //     <BsBookmark className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
  //   ),
  // },
  // {
  //   name: "Services",
  //   route: "/admin/services",
  //   icon: <BsGear className="text-[1.4rem] text-white  mx-2 cursor-pointer" />,
  // },
<<<<<<< HEAD
];

export const Driver_Routes = [
  {
    name: "Dashboard",
    route: "/driver",
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Bookings",
    route: "/driver/bookings",
=======
]

export const Driver_Routes = [
  // {
	//   name: "Dashboard",
    //   route: "/driver",
    //   icon: (
      //     <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    //   ),
  // },
  {
    name: 'Dashboard',
    route: '/employee',
>>>>>>> d64b5ae (fixxing merges)
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  // {
  //   name: "CurrentBooking",
  //   route: "/driver/current-booking",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
<<<<<<< HEAD
];

export const Driver_History_Cols = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Customer Name",
    accessor: "name",
  },
  {
    Header: "Customer phone",
    accessor: "phone",
  },
  {
    Header: "Services",
    accessor: "services",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

export const Driver_History = [
  {
    id: 1,
    date: "12 jan, 2023",
    services: "Packing",
    phone: "+92132223",
    status: "completed",
    name: "hamza",
  },
  {
    id: 2,
    date: "2 feb, 2023",
    services: "Packing, unpacking",
    phone: "12330011",
    status: "completed",
    name: "uzair",
  },
  {
    id: 3,
    date: "24 march, 2023",
    services: "moving",
    phone: "12341122",
    status: "completed",
    name: "abdul",
  },
];
=======
]



>>>>>>> d64b5ae (fixxing merges)
