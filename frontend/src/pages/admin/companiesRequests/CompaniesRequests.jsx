import { useEffect, useState } from 'react'
import CompaniesRequestCard from './CompaniesRequestCard'

export default function CompaniesRequests() {
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
		<div className="w-full px-5 py-8 flex flex-col gap-3">
			{companiesRequests.length === 0 ? (
				<h1 className="font-semibold text-2xl text-center">
					There are no requests to check. :)
				</h1>
			) : (
				<>
					<h1 className="font-bold text-2xl">Requests</h1>
					{companiesRequests?.map((company) => (
						<CompaniesRequestCard
							key={company._id}
							company={company}
							setCompaniesRequests={setCompaniesRequests}
						/>
					))}
				</>
			)}
		</div>
	)
}
