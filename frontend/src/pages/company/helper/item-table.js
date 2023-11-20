export function createTableData(data) {
	return data.map((item, index) => {
		const { _id, name, packingPrice, unpackingPrice, movingPrice } = item
		let obj = { sr: index + 1, name }

		if (packingPrice && packingPrice > 0) {
			obj = { ...obj, packingPrice }
		}
		if (unpackingPrice && unpackingPrice > 0) {
			obj = { ...obj, unpackingPrice }
		}
		if (movingPrice && movingPrice > 0) {
			obj = { ...obj, movingPrice }
		}

		obj = { ...obj, data: item }
		return obj
	})
}

export function generateColumnNames(data) {
	let newColNames = ['Sr.', 'Item name']

	if (data.length > 0) {
		if (data[0]?.packingPrice && data[0]?.packingPrice > 0) {
			newColNames = [...newColNames, 'Packing Price']
		}
		if (data[0]?.unpackingPrice && data[0]?.unpackingPrice > 0) {
			newColNames = [...newColNames, 'Unpacking Price']
		}
		if (data[0]?.movingPrice && data[0]?.movingPrice > 0) {
			newColNames = [...newColNames, 'Moving Price']
		}
	}

	return newColNames
}
