import PropTypes from 'prop-types'
import Button from '../../../components/Button/Button'

CompaniesRequestCard.propTypes = {
	company: PropTypes.object, // Adjust as needed
	setCompaniesRequests: PropTypes.func, //FIXME: it should be removed from here -> rerender the booking requests
}

export default function CompaniesRequestCard({
	company,
	setCompaniesRequests,
}) {
	const handleAction = async (status) => {
		const url = 'http://localhost:5000/admin/companies-requests'
		try {
			const response = await fetch(url, {
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'PUT',
				body: JSON.stringify({
					companyId: company._id,
					status,
				}),
			})
			const data = await response.json()
			//FIXME: add message if successful declinec
			console.log(data)
			//should not be used like that
			setCompaniesRequests((prev) => {
				const filteredCompanies = prev.filter(
					(companyRequest) => companyRequest._id !== company._id
				)
				return filteredCompanies
			})
		} catch (error) {
			//FIXME: add message if error
			console.log(error)
		}
	}

	return (
		<div
			className="w-full p-6 bg-[#FFEFEE] rounded-xl"
			key={`req-${company._id}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex justify-start items-center">
					<h2 className="font-semibold w-32">Company: </h2>
					<p>{company.name}</p>
				</div>
				<div className="flex gap-2">
					<Button onClick={() => handleAction('declined')}>Decline</Button>
					<Button onClick={() => handleAction('approved')}>Accept</Button>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="flex justify-start items-center mb-2">
					<h2 className="font-semibold w-32">Email:</h2>
					<p>{company.email}</p>
				</div>
				<div className="flex justify-start items-center mb-2">
					<h2 className="font-semibold w-32">NTN:</h2>
					<p>{company.ntn}</p>
				</div>
				<div className="flex justify-start items-center">
					<h2 className="font-semibold w-32">Phone:</h2>
					<p>{company.phone}</p>
				</div>
			</div>
		</div>
	)
}
