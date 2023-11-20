import { RiDashboardFill } from 'react-icons/ri'

import { BiSolidUserCircle } from 'react-icons/bi'
import { BsBookmark, BsFillCalendarCheckFill, BsGear } from 'react-icons/bs'
import { FaUsers } from 'react-icons/fa'
import { MdPriceChange, MdReviews } from 'react-icons/md'
import { TbBrandBooking } from 'react-icons/tb'

export const CLIENT_PORTAL_ROUTES = [
  {
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
  //   name: "BookingDetail",
  //   route: "/user/inprogress-bookings/detail",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
]

export const COMPANY_PORTAL_ROUTES = [
  {
    name: 'Dashboard',
    route: '/company',
    icon: (
      <RiDashboardFill className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: 'Employees',
    route: '/company/employees',
    icon: (
      <FaUsers className="text-[1.4rem]   text-white mx-2 cursor-pointer" />
    ),
  },
  {
    name: 'Requested Bookings',
    route: '/company/bookings/requested',
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  {
    name: 'Completed Bookings',
    route: '/company/bookings/completed',
    icon: (
      <MdReviews className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: 'Set Prices',
    route: '/company/prices',
    icon: (
      <MdPriceChange className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
  {
    name: 'Sentiment Analysis',
    route: '/company/reviews/sentiment/report',
    icon: (
      <MdPriceChange className="text-[1.4rem] text-white  mx-2 cursor-pointer" />
    ),
  },
]

export const ADMIN_ROUTES = [
  {
    name: 'Requests',
    route: '/admin/companies/requests',
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
    icon: (
      <BsFillCalendarCheckFill className="text-[1.4rem] text-white hover:text-primary  mx-2 cursor-pointer" />
    ),
  },
  // {
  //   name: "CurrentBooking",
  //   route: "/driver/current-booking",
  //   icon: <TbBrandBooking className="text-[1.4rem]  mx-2 cursor-pointer" />,
  // },
]



