import { useEffect, useState } from 'react'
import { RiLoader2Fill } from 'react-icons/ri'

import PropTypes from 'prop-types'

Table.propTypes = {
	columns: PropTypes.array,
	data: PropTypes.array,
	isActions: PropTypes.bool,
	isLoading: PropTypes.bool,
	noDataMessage: PropTypes.string,
	enableRowToggle: PropTypes.bool,
	components: PropTypes.array,
	idKey: PropTypes.string,
	isSentiment: PropTypes.bool,
}

export default function Table({
	columns = [],
	data = [],
	isActions = false,
	isLoading = false,
	noDataMessage = 'No Data',
	enableRowToggle = false,
	components,
	idKey = undefined,
	isSentiment = false,
}) {
	const [allData, setAllData] = useState(data)

	useEffect(() => {
		if (enableRowToggle) {
			const transformed = data.map((item) => ({ ...item, isOpen: false }))
			setAllData(transformed)
		}

		setAllData(data)
	}, [enableRowToggle, data])

	return (
		<div className="w-full">
			{isLoading ? (
				<div className="mt-8 w-full h-[40vh] grid place-items-center">
					<RiLoader2Fill />
				</div>
			) : allData.length === 0 ? (
				<div className="mt-8 w-full h-[40vh] grid place-items-center text-textColor">
					{noDataMessage}
				</div>
			) : (
				<div className="mt-8 ">
					<div className="-px-4 -my-2 overflow-x-auto sm:-px-6 lg:-px-8">
						<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
							<table
								className="min-w-full divide-y divide-gray-300 table-fixed equal-cols"
								style={{ '--num-cols': columns.length + 1 }}
							>
								<thead>
									<tr>
										{columns.map((colomName, index) => (
											<th
												key={`column-${index + Date.now()}`}
												scope="col"
												className="py-3.5 text-left text-lg font-semibold text-textColor"
											>
												{colomName}
											</th>
										))}

										{(enableRowToggle || isActions) && (
											<th
												key={'action'}
												scope="col"
												className="py-3.5 text-left text-lg font-semibold text-textColor"
											>
												Action
											</th>
										)}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{allData.map((item, index) => (
										<TableRow
											components={components}
											data={item}
											enableRowToggle={enableRowToggle}
											idKey={idKey}
											key={`tr-body-${index}-${Date.now()}`}
											isActions={isActions}
											isSentiment={isSentiment}
										/>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

TableRow.propTypes = {
	idKey: PropTypes.string, //it should be the mainId on which any action will happen
	data: PropTypes.object,
	enableRowToggle: PropTypes.bool,
	components: PropTypes.array,
	isActions: PropTypes.bool,
	isSentiment: PropTypes.bool,
}

//TODO: id should be added at the time of transforming data into arrays id should be something on whose base action will happen

function TableRow({
	enableRowToggle,
	data,
	components,
	idKey,
	isActions = false,
	isSentiment = false,
}) {
	const [toggleRow, setToggleRow] = useState(false)

	// console.log(data)
	const detailedData = data.data

	let id
	if (idKey) {
		id = detailedData[idKey]
		// console.log(id)
	}

	const singleValues = []
	for (const key in data) {
		if (key != 'isOpen' && key != 'data') {
			singleValues.push(data[key])
		}
	}

	let className = ''
	if (isSentiment) {
		className =
			data.sentimentScore <= -1
				? 'bg-red-400' // very negative
				: data.sentimentScore < 0
				? 'bg-red-300' // negative
				: data.sentimentScore === 0
				? 'bg-yellow-100' // neutral
				: data.sentimentScore < 1
				? 'bg-green-200' // positive
				: 'bg-green-300' // very positive
	}

	return (
		<>
			<tr className={className} key={`tr-body-${Date.now()}`}>
				{singleValues.map((value, index) => (
					<td className="py-4 px-2" key={`td-body-${index}-${Date.now()}`}>
						{value}
					</td>
				))}
				{/* //edit or delete components should be mapped here but with some kind of check */}

				{isActions && !toggleRow && (
					<td className="py-4 flex justify-start self-center min-w-full">
						{components.map(({ Component, props }, index) => (
							<Component
								id={id}
								data={detailedData}
								key={`comp-${index}}`}
								{...props}
							/>
						))}
					</td>
				)}

				{enableRowToggle && !isActions && (
					<td className="text-center">
						<button
							className="px-3 py-2 text-white font-semibold rounded-full bg-primary"
							type="button"
							onClick={(e) => setToggleRow((prev) => !prev)}
						>
							{toggleRow ? 'Close' : 'View Detail'}
						</button>
					</td>
				)}
			</tr>
			{/* collapsable */}
			{enableRowToggle && toggleRow && (
				<tr key={`tr-body-${Date.now() + 2}`}>
					<td colSpan={singleValues.length + 1}>
						{components.map(({ Component, props }, index) => (
							<Component
								id={id}
								data={detailedData}
								key={`comp-${index}-${Date.now()}`}
								{...props}
							/>
						))}
					</td>
				</tr>
			)}
		</>
	)
}
