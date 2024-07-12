'use client'

import { Button } from '@/lib/material-ui'
import cartStateAtom from '@/lib/cartStateAtom'
import { useAtom } from 'jotai'
import priceFormatter from '@/lib/priceFormatter'


export default function ProductViewerDashboard({ product }: { product: {[key: string]: any;} }) {
	const [cartState, setCartState] = useAtom(cartStateAtom)

	const addToCartCallback = () => {
		const newCartState: { [key:string]: number; } = {...cartState}
		if (newCartState[product.name as string] != null) {
			newCartState[product.name as string] += 1
		} else {
			newCartState[product.name as string] = 1
		}
		setCartState(newCartState)
	}

	return (
		<div className="overflow-y-scroll scrollbar-hide flex flex-col gap-3 bg-gray-500/10 backdrop-blur w-64 p-3 max-h-[320px] h-min border border-black/20">
			<p className="text-blue-900 text-center font-light text-lg">
				{product.name}
			</p>
			<p className="">
				{product.description}
			</p>
			<p className="">
				<span className="font-bold">
					sex
				</span>
				: {product.sex}
			</p>
			<p className="">
				<span className="font-bold">
					price
				</span>
				: ${priceFormatter.format(product.priceInUSD)}
			</p>
			<Button variant="outlined" className="mt-3 rounded-none" onClick={addToCartCallback}>
				Add to Cart
			</Button>
		</div>
	)
}

