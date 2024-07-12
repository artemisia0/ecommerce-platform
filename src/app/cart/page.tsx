'use client'

import { useAtom} from 'jotai'
import cartStateAtom from '@/lib/cartStateAtom'
import CartItemCard from '@/components/CartItemCard'
import LoadingProductPreviewCards from '@/components/LoadingProductPreviewCards'
import { fetchProductByName } from '@/actions/product'
import { useState, useEffect } from 'react'
import { Button } from '@/lib/material-ui'
import priceFormatter from '@/lib/priceFormatter'
import { calcOverallPrice, overallPriceAtom } from '@/lib/overallPrice'


type ProductDataStore = { [key: string]: { [key: string]: any; }; }

function CreditCardIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
</svg>
	)
}

export default function Page() {
	const [cartState, setCartState] = useAtom(cartStateAtom)
	const [productDataStore, setProductDataStore] = useState<undefined | ProductDataStore>(undefined)
	const [overallPrice, setOverallPrice] = useAtom(overallPriceAtom)

	const payCallback = () => {
		console.log("PAYMENT LOGIC IS HERE!")
	}

	useEffect(
		() => {
			const fetchData = async () => {
				setOverallPrice(await calcOverallPrice(cartState))
			}
			fetchData()
		}, [cartState, setOverallPrice]
	)

	useEffect(
		() => {
			const fetchData = async() => {
				const newProductDataStore: ProductDataStore = {  }
				for (let productName of Object.keys(cartState)) {
					newProductDataStore[productName] = await fetchProductByName(productName)
				}
				setProductDataStore(newProductDataStore)
			}
			fetchData()
		}, [cartState]
	)

	if (productDataStore == undefined) {
		return <LoadingProductPreviewCards />
	}

	if (overallPrice < 0.001) {
		return (
			<main className="min-h-[calc(100vh)] flex justify-center align-center items-center">
				<span className="text-2xl rounded-lg p-3 backdrop-blur border border-black/20">
					Shopping cart is empty :)
				</span>
			</main>
		)
	}

	return (
		<main className="min-h-screen flex flex-col gap-3 items-center align-center pt-8">
			<div className="flex flex-col gap-3 backdrop-blur bg-gray-500/10 border border-black/20 rounded-lg shadow p-3 justify-center items-center align-center w-64">
				<span className="font-bold text-red-900">- ${priceFormatter.format(overallPrice)}</span>
				<Button variant="outlined" className="bg-blue-900/20 flex gap-3 justify-center items-center align-center p-2 w-full text-md" onClick={payCallback}>
					Pay
					<CreditCardIcon />
				</Button>
			</div>
			<div className="flex flex-wrap w-full max-w-[960px] justify-center items-center align-center gap-6 p-6">
				{Object.keys(cartState).map(
					(productName: string, index) => (
						<CartItemCard key={index} productData={productDataStore[productName]} />
					)
				)}
			</div>
		</main>
	)
}

