import cartStateAtom from '@/lib/cartStateAtom'
import { useAtom } from 'jotai'


export default function removeBadCartItems(cartState: { [key: string]: number; }, setCartState: any) {
	const newCartState = {...cartState}
	const productNamesToDelete: string[] = []
	for (let productName of Object.keys(newCartState)) {
		if (newCartState[productName] <= 0) {
			productNamesToDelete.push(productName)
		}
	}
	productNamesToDelete.forEach((name) => delete newCartState[name])
	setCartState(newCartState)
}

