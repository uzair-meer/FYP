import { RiDashboardFill } from "react-icons/ri";
import { FaBarsProgress } from "react-icons/fa6";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdReviews } from "react-icons/md";
import { BsFillCalendarCheckFill } from "react-icons/bs";

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

const USER_HISTORY_TABLE_COLUMNS = [
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

export const UserHistory = [
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
    route: "/portal",
    icon: <RiDashboardFill className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  {
    name: "Projects",
    route: "/portal/projects",
    icon: <FaBarsProgress className="text-[1.4rem] mx-2 cursor-pointer" />,
  },
  {
    name: "Profile",
    route: "/portal/profile",
    icon: <CgProfile className="text-[1.4rem]  mx-2 cursor-pointer" />,
  },
  {
    name: "About",
    route: "/portal/about",
    icon: (
      <BsFillInfoCircleFill className="text-[1.4rem]  mx-2 cursor-pointer" />
    ),
  },
];

export const ADMIN_ROUTES = [
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
  {
    name: "Reviews",
    route: "/company/reviews",
    icon: (
      <MdReviews className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
];
