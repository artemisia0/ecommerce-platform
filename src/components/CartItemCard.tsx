'use client'

import { IconButton } from '@/lib/material-ui'
import { useState, useEffect } from 'react'
import InteractiveProductPreviewCard from '@/components/InteractiveProductPreviewCard'
import priceFormatter from '@/lib/priceFormatter'
import { useAtom } from 'jotai'
import cartStateAtom from '@/lib/cartStateAtom'
import removeBadCartItems from '@/lib/removeBadCartItems'


function StackIcon() {
	return (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3" />
</svg>
	)
}

function AddItemIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
	)
}

function RemoveItemIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg>
	)
}

export default function CartItemCard({ productData }: { productData: { [key: string]: any; } }) {
	const [cartState, setCartState] = useAtom(cartStateAtom)

	const addItem = () => {
		let newCartState = {...cartState}
		newCartState[productData.name] += 1
		setCartState(newCartState)
	}

	const removeItem = () => {
		let newCartState = {...cartState}
		newCartState[productData.name] -= 1
		removeBadCartItems(newCartState, setCartState)
	}

	return (
		<div className="shadow border border-black/20 bg-white backdrop-blur rounded-lg">
			<InteractiveProductPreviewCard product={productData} />
			<div className="p-3 flex justify-between w-full items-center align-center gap-3">
				<div className="flex justify-center items-center align-center gap-3">
					<span className="text-sm flex gap-1 justify-center items-center align-center p-2 rounded-lg border border-black/20">
						<StackIcon />
						{cartState[productData.name]}
					</span>
					<IconButton size="sm" variant="outlined" onClick={removeItem}>
						<RemoveItemIcon />
					</IconButton>
					<IconButton size="sm" variant="outlined" onClick={addItem}>
						<AddItemIcon />
					</IconButton>
				</div>
				<span className="text-sm font-bold">
					${priceFormatter.format(productData.priceInUSD * cartState[productData.name])}
				</span>
			</div>
		</div>
	)
}

