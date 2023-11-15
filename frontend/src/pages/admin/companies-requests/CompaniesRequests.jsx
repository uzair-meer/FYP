import { useEffect, useState } from 'react'
import { useAuth } from 'src/context/AuthContext.jsx'
import CompaniesRequestCard from './CompaniesRequestCard'

export default function CompaniesRequests() {
	// const { user } = useAuth(); //FIXME: will only be used for protected routes in backend other wise no use here for now

	const [companiesRequests, setCompaniesRequests] = useState([])

	useEffect(() => {
		const fetchRequest = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/admin/companies-requests'
				)
				const { data } = await response.json()
				console.log(data)
				setCompaniesRequests(data)
			} catch (error) {
				console.log(error)
			}
		}

		fetchRequest()
	}, [])

	return (
		<div>
			<div className="pending-cards flex flex-wrap gap-2 p-5">
				{companiesRequests &&
					companiesRequests.map((company) => (
						<CompaniesRequestCard
							key={company._id}
							company={company}
							setCompaniesRequests={setCompaniesRequests}
						/>
					))}
			</div>
		</div>
	)
}
