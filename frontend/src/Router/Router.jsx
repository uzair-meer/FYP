import { Route, Routes } from 'react-router-dom'

import SetPricesForm from 'src/pages/company/Setprice/SetPricesForm'
import { Dashboard } from 'src/pages/company/dashbord/Dashboard'
// import Employes from 'src/pages/company/employes/Employes'
import CompanyHistory from 'src/pages/company/history/CompanyHistory'
import Home from 'src/pages/home'
import CompanyRates from 'src/pages/client/CompanyRates/CompanyRates.jsx'
import SignUp from '../components/Signup/SignUp'
import { useAuth } from '../context/AuthContext'
import AdminPanel from '../pages/admin'
import Companies from '../pages/admin/companies/Companies'
import { AdminDashboard } from '../pages/admin/dashboard/AdminDashboard'
import Company from '../pages/company'
import RequestedBookings from '../pages/company/requestedBookings/RequestedBookings'
import DriverPanel from '../pages/driver'
import DriverDashboard from '../pages/driver/dashboard/DriverDashboard'
import DriverHistory from '../pages/driver/history/DriverHistory'
import Services from '../pages/services/Services'
import SignIn from '../pages/signin/SignIn'
import User from '../pages/client'
import UserDashboard from '../pages/client/dashboard/UserDashboard'
import UserHistory from '../pages/client/history/UserHistory'
import Profile from '../pages/client/profile/Profile'
import UserProtectedRoute, {
	AdminProtectedRoute,
	CompanyProtectedRoute,
	DriverProtectedRoute,
} from './ProtectedRoutes'
// import CurrentBooking from "../pages/client/currentBooking/CurrentBooking";
import CompaniesRequests from '../pages/admin/companiesRequests/CompaniesRequests'
import CompanyCompletedBookings from '../pages/company/completedBookings/CompanyCompletedBookings'
import Employees from '../pages/company/employees/Employees'
import SentimentReport from '../pages/company/sentimentReport/SentimentReport'
import DriverCurrentBooking from '../pages/driver/currentBooking/DriverCurrentBooking'
import ClientCompletedBookings from '../pages/client/completedBookings/ClientCompletedBookings'

import BookingDetail from '../pages/client/inprogressBookings/BookingDetail'
import InprogressBookings from '../pages/client/inprogressBookings/InprogressBookings'
import ClientBookingDetail from '../pages/client/detailBooking/ClientBookingDetail'
// import FetchPricesForm from "../pages/services/GetPrices";

const AppRouter = () => {
	const { user } = useAuth()
	return (
		<Routes>
			{/* public routes */}
			<Route path="/" element={<Home />} />
			<Route path="signup" element={<SignUp />} />
			<Route path="signin" element={<SignIn />} />

			{/* // client routes */}

			<Route
				path="client"
				element={<UserProtectedRoute user={user} component={<User />} />}
			>
				<Route index element={<UserDashboard />} />
				<Route path="bookings" element={<UserHistory />} />
				<Route path="profile" element={<Profile />} />
				<Route path="rates" element={<CompanyRates />} />
				{/* <Route path="current-booking" element={<CurrentBooking />} /> */}
				<Route path="inprogress-bookings" element={<InprogressBookings />} />
				{/* FIXME: the followig route should no not be open if state is not provided as it is only opened by Link */}
				<Route path="inprogress-bookings/details" element={<BookingDetail />} />
				<Route
					path="bookings/completed"
					element={<ClientCompletedBookings />}
				/>
				<Route path="booking/detail" element={<ClientBookingDetail/>} />
			</Route>

			<Route
				path="company"
				element={<CompanyProtectedRoute user={user} component={<Company />} />}
			>
				{/* Define your nested routes here */}
				<Route index element={<Dashboard />} />
				<Route path="bookings" element={<CompanyHistory />} />
				{/* <Route path="employes" element={<Employes />} /> */}
				<Route path="employees" element={<Employees />} />
				<Route path="bookings/requested" element={<RequestedBookings />} />
				<Route path="setprice" element={<SetPricesForm />} />
				<Route
					path="bookings/completed"
					element={<CompanyCompletedBookings />}
				/>
				<Route path="reviews/sentiment/report" element={<SentimentReport />} />
			</Route>

			<Route
				path="admin"
				element={<AdminProtectedRoute user={user} component={<AdminPanel />} />}
			>
				<Route index element={<AdminDashboard />} />
				<Route path="companies" element={<Companies />} />
				<Route path="companies/requests" element={<CompaniesRequests />} />
				<Route path="services" element={<Services />} />
			</Route>

			<Route
				path="driver"
				element={
					<DriverProtectedRoute user={user} component={<DriverPanel />} />
				}
			>
				<Route index element={<DriverDashboard />} />
				<Route path="bookings" element={<DriverHistory />} />
				<Route path="current-booking" element={<DriverCurrentBooking />} />
			</Route>
		</Routes>
	)
}

export default AppRouter
