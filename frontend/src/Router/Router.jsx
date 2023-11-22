import { Route, Routes } from 'react-router-dom'
import SignUp from '../components/Signup/SignUp'
import { useAuth } from '../context/AuthContext'
import AdminPanel from '../pages/admin'
import CompaniesRequests from '../pages/admin/companiesRequests/CompaniesRequests'
import CompanyRates from '../pages/client/CompanyRates/CompanyRates'
import ClientAllBookings from '../pages/client/allBookings/ClientAllBookings'
import ClientChatPage from '../pages/client/chat/ClientChatPage'
import ClientCompletedBookings from '../pages/client/completedBookings/ClientCompletedBookings'
import ClientDashboard from '../pages/client/dashboard/ClientDashboard'
import ClientBookingDetail from '../pages/client/detailBooking/ClientBookingDetail'
import GetaQuote from '../pages/client/getAquote/GetaQuote'
import ClientInprogressBookings from '../pages/client/inprogressBookings/ClientInprogressBookings'
import Profile from '../pages/client/profile/Profile'
import Company from '../pages/company'
import CompanyAllBookings from '../pages/company/allBookings/CompanyAllBookings'
import CompanyBookingDetail from '../pages/company/bookingDetail/CompanyBookingDetail'
import CompanyChatPage from '../pages/company/chat/CompanyChatPage'
import CompanyCompletedBookings from '../pages/company/completedBookings/CompanyCompletedBookings'
import { Dashboard } from '../pages/company/dashbord/Dashboard'
import Employees from '../pages/company/employees/Employees'
import CompanyInprogressBookings from '../pages/company/inprogressBookings/CompanyInprogressBookings'
import RequestedBookings from '../pages/company/requestedBookings/RequestedBookings'
import SentimentReport from '../pages/company/sentimentReport/SentimentReport'
import SetPrices from '../pages/company/setprice/SetPrices'
import EmployeeDashboard from '../pages/employee/dashboard/EmployeeDashboard'
import Home from '../pages/home'
import SignIn from '../pages/signin/SignIn'
import UserProtectedRoute, {
	AdminProtectedRoute,
	CompanyProtectedRoute,
	DriverProtectedRoute,
} from './ProtectedRoutes'

export default function AppRouter() {
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
				element={
					<UserProtectedRoute user={user} component={<ClientDashboard />} />
				}
			>
				<Route index element={<GetaQuote />} />
				<Route path="profile" element={<Profile />} />
				<Route path="rates" element={<CompanyRates />} />
				<Route path="chat" element={<ClientChatPage />} />
				<Route
					path="bookings/completed"
					element={<ClientCompletedBookings />}
				/>
				{/* FIXME: the followig route should no not be open if state is not provided as it is only opened by Link */}
				<Route path="booking/detail" element={<ClientBookingDetail />} />
				<Route path="bookings/all" element={<ClientAllBookings />} />
				<Route
					path="bookings/inprogress"
					element={<ClientInprogressBookings />}
				/>
			</Route>

			{/* // company routes */}
			<Route
				path="company"
				element={<CompanyProtectedRoute user={user} component={<Company />} />}
			>
				<Route index element={<Dashboard />} />
				<Route path="employees" element={<Employees />} />
				<Route path="bookings/requested" element={<RequestedBookings />} />
				<Route path="setprice" element={<SetPrices />} />
				<Route
					path="bookings/completed"
					element={<CompanyCompletedBookings />}
				/>
				<Route path="reviews/sentiment/report" element={<SentimentReport />} />
				<Route path="chat" element={<CompanyChatPage />} />
				<Route path="bookings/all" element={<CompanyAllBookings />} />
				<Route
					path="bookings/inprogress"
					element={<CompanyInprogressBookings />}
				/>
				<Route path="booking/detail" element={<CompanyBookingDetail />} />
			</Route>

			{/* // company routes */}
			<Route
				path="admin"
				element={<AdminProtectedRoute user={user} component={<AdminPanel />} />}
			>
				{/* <Route index element={<AdminDashboard />} /> */}
				<Route
					index
					path="companies/requests"
					element={<CompaniesRequests />}
				/>
			</Route>

			{/* // company routes */}
			<Route
				path="employee"
				element={
					<DriverProtectedRoute user={user} component={<EmployeeDashboard />} />
				}
			>
				<Route index element={<EmployeeDashboard />} />
			</Route>
		</Routes>
	)
}
