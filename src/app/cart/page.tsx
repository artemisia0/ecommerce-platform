'use client'

import { useAtom} from 'jotai'
import cartStateAtom from '@/lib/cartStateAtom'
import CartItemCard from '@/components/CartItemCard'
import LoadingProductPreviewCards from '@/components/LoadingProductPreviewCards'
import { fetchProductByName } from '@/actions/product'
import { useState, useEffect } from 'react'


type ProductDataStore = { [key: string]: { [key: string]: any; }; }

export default function Page() {
	const [cartState, setCartState] = useAtom(cartStateAtom)
	const [productDataStore, setProductDataStore] = useState<undefined | ProductDataStore>(undefined)

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

	return (
		<main className="min-h-screen flex flex-col gap-3 justify-between items-center align-center pt-8">
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

