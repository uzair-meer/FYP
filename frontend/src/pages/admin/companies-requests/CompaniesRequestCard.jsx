import PropTypes from 'prop-types'

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
			key={`company-request-cart-${company._id}`}
			className="card w-[20rem] p-5 flex flex-col bg-primary text-white rounded-[8px]"
		>
			<div className="card-header"></div>
			<div className="card-body flex flex-col w-full gap-2">
				<div className="flex w-full justify-between">
					<p className="font-bold">Company name</p>
					<p className="">{company.name}</p>
				</div>
				<div className="flex w-full justify-between">
					<p className="font-bold">Email</p>
					<p className="">{company.email}</p>
				</div>
				<div className="flex w-full justify-between">
					<p className="font-bold">Phone</p>
					<p className="">{company.phone}</p>
				</div>
				<div className="flex w-full justify-between">
					<p className="font-bold">NTN number</p>
					<p className="">{company.ntn}</p>
				</div>
				<div className="flex w-full justify-between">
					<p className="font-bold">Current status</p>
					<p className="">{company.status}</p>
				</div>
				<div className="flex justify-between p-5 ">
					<button
						className="bg-secondary text-white rounded-[5px] px-5 py-2"
						onClick={() => handleAction('approved')}
					>
						Accept
					</button>
					<button
						className="bg-secondary text-white rounded-[5px] px-5 py-2"
						onClick={() => handleAction('declined')}
					>
						Declined
					</button>
				</div>
			</div>
		</div>
	)
}
