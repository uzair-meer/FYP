
export default function ConfirmQuoteModal({ showModal, setToggle, data }) {
	const { destination, services, items } = data

	let price = 0
	items.forEach((item) => {
		price += item.price * item.quantity
	})

	// const [itemsPrice, setItemsPrice] = useState(price)

	return (
		<>
			{showModal ? (
				<>
					<div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none ">
						{/*content*/}
						<div className="rounded-lg shadow-lg flex flex-col bg-white outline-none focus:outline-none w-2/3 p-8">
							<div className="flex justify-between items-baseline">
								<div>
									<h1 className="text-headings">Company name</h1>
									<p className="mt-2">Shahroz & co</p>
									<h1 className="mt-4 text-headings">Destination</h1>
									<p className="mt-2">{destination}</p>
									<h1 className="mt-4 text-headings">Services</h1>
									<div className="flex mt-2">
										{services.map((service, index) => (
											<a
												key={`service-${index}`}
												className="rounded-2xl text-white bg-primary px-4 py-1 mx-2"
											>
												{service}
											</a>
										))}
									</div>
								</div>
								<div className="flex flex-col">
									<div className="flex flex-col w- mt-5 rounded-xl px-3 py-1 bg-red-100">
										<h3 className="pr-8 text-red-600">Total Cost</h3>
										<p className="pl-5 mt-4 text-headings">{price}RS</p>
									</div>
								</div>
							</div>
							<hr className="my-6" />
							<table>
								<thead>
									<tr>
										{/* <td></td> */}
										<th>name</th>
										<th>Qty</th>
										<th>Price</th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, index) => (
										<tr key={index}>
											<td>{item.name}</td>
											{/* <td>{item.variance}</td> */}
											<td>{item.quantity}</td>
											<td>{item.price}</td>
										</tr>
									))}
								</tbody>
							</table>
							<div className="mt-16 flex w-full justify-end">
								<button onClick={setToggle.bind(this, false)} className="mr-3 rounded-2xl text-white bg-slate-300 px-4 py-1">
									Cancel
								</button>
								<button className="rounded-2xl text-white bg-primary px-4 py-1">
									Confirm
								</button>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	)
}
