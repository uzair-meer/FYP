import { RiDashboardFill } from "react-icons/ri";

import { FaUsers } from "react-icons/fa";
import { MdReviews } from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { MdPriceChange } from "react-icons/md";
import { BiSolidUserCircle } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { BsGear } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
export const EMPLOYES_TABLE_COLUMNS = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Phone Number",
    accessor: "phone",
  },
];

export const COMPANY_RATES_COLUMNS = [
  {
    Header: "Name",
    accessor: "companyName",
  },
  {
    Header: "Services",
    accessor: "services",
  },
  {
    Header: "Cost",
    accessor: "price",
  },
];

export const TOTAL_COMPANIES_COLS = [
  {
    Header: "Company Name",
    accessor: "companyname",
  },
  {
    Header: "Company Services",
    accessor: "companyservices",
  },
  {
    Header: "Company Contact",
    accessor: "companycontact",
  },
  {
    Header: "Company Status",
    accessor: "companystatus",
  },
];
export const COMPANIES_DATA = [
  {
    id: 1,
    companyname: "abc",
    companyservices: ["packing", "unpacking"],
    companycontact: "+921334550",
    companystatus: "pending",
  },
  {
    id: 2,
    companyname: "xyz",
    companyservices: ["packing", "unpacking"],
    companycontact: "+921334550",
    companystatus: "approved",
  },
  {
    id: 3,
    companyname: "qwerty",
    companyservices: ["packing", "unpacking"],
    companystatus: "approved",
    companycontact: "+921339950",
  },
  {
    id: 4,
    companyname: "batmbolies",
    companyservices: ["packing", "unpacking"],
    companycontact: "+921334550",
    companystatus: "declines",
  },
];
export const COMPANY_BOOKINGS_TABLE_COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Customer Name",
    accessor: "name",
  },
  {
    Header: "Services",
    accessor: "services",
  },
  {
    Header: "Quote",
    accessor: "quote",
  },
];

export const employees = [
  {
    id: 1,
    name: "abc",
    role: "driver",
    phone: "0303189384",
    email: "abc@gmail.com",
  },

  {
    id: 2,
    name: "xyz",
    role: "driver",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 3,
    name: "abc",
    role: "electrician",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 4,
    name: "abc",
    role: "labor",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 5,
    name: "abc",
    role: "driver",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 6,
    name: "lmn",
    role: "plumber",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 7,
    name: "abc",
    role: "electritian",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
  {
    id: 8,
    name: "abc",
    role: "driver",
    phone: "0303189384",
    email: "abc@gmail.com",
  },
];

// export const UserHistoryCols = ["Date", "Company Name", "Services", "Quote"];
// export const CompanyHistoryCols = [
//   "Date",
//   "Customer Name",
//   "Services",
//   "Quote",
//   "Status",
// ];

export const USER_BOOKINGS_TABLE_COLUMNS = [
  {
    Header: "Date",
    accessor: "date",
  },
  {
    Header: "Company Name",
    accessor: "company",
  },
  {
    Header: "Services",
    accessor: "services",
  },
  {
    Header: "Quote",
    accessor: "quote",
  },
];

export const User_History = [
  {
    id: 1,
    date: "12 jan, 2023",
    company: "Shehroz & Co",
    services: "Packing",
    quote: "12, 500",
    status: "completed",
    name: "hamza",
  },
  {
    id: 2,
    date: "2 feb, 2023",
    company: "Hakim & Co",
    services: "Packing, unpacking",
    quote: "20, 500",
    status: "completed",
    name: "uzair",
  },
  {
    id: 3,
    date: "24 march, 2023",
    company: "Shehroz & Co",
    services: "moving",
    quote: "12, 500",
    status: "completed",
    name: "abdul",
  },
  {
    id: 1,
    date: "12 jan, 2023",
    company: "Shehroz & Co",
    services: "Packing",
    quote: "12, 500",
    status: "completed",
    name: "haji",
  },
  {
    id: 3,
    date: "22 jul, 2023",
    company: "Anjum Movers",
    services: "Packing, unpacking",
    quote: "5, 500",
    status: "completed",
    name: "janum",
  },
  {
    id: 4,
    date: "11 dec, 2022",
    company: "Shehroz & Co",
    services: "moving",
    quote: "7, 200",
    status: "completed",
    name: "salman",
  },
];

export const CLIENT_PORTAL_ROUTES = [
  {
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
  //   name: "BookingDetail",
  //   route: "/user/inprogress-bookings/detail",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
];

export const COMPANY_PORTAL_ROUTES = [
  {
    name: "Dashboard",
    route: "/company",
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Employees",
    route: "/company/employes",
    icon: (
      <FaUsers className="text-[1.4rem]   text-white mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Bookings",
    route: "/company/bookings",
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  // {
  //   name: "Reviews",
  //   route: "/company/reviews",
  //   icon: (
  //     <MdReviews className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
  //   ),
  // },
  {
    name: "RequestedBookings",
    route: "/company/requested",
    icon: (
      <MdReviews className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "SetPrices",
    route: "/company/setprice",
    icon: (
      <MdPriceChange className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
];

export const ADMIN_ROUTES = [
  {
    name: "Dashboard",
    route: "/admin",
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Companeies",
    route: "/admin/companies",
    icon: (
      <BsBookmark className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: "Services",
    route: "/admin/services",
    icon: <BsGear className="text-[1.4rem] text-white  mx-2 cursor-pointer" />,
  },
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
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  // {
  //   name: "CurrentBooking",
  //   route: "/driver/current-booking",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
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
