export default function countCartItems(cartState: { [key: string]: number; }) {
	let result = 0
	for (let key of Object.keys(cartState)) {
		result += cartState[key]
	}
	return result
}

