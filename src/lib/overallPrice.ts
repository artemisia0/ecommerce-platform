import { atom } from 'jotai'
import { fetchProductByName } from '@/actions/product'


const overallPriceAtom = atom(0)

async function calcOverallPrice(cartState: {[key: string]: number;}) {
	let result = 0
	for (let productName of Object.keys(cartState)) {
		const productsCount = cartState[productName]
		const priceInUSD = (await fetchProductByName(productName)).priceInUSD
		result += productsCount * priceInUSD
	}
	return result
}

export { overallPriceAtom, calcOverallPrice }

