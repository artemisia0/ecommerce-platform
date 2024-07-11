'use client'

import { IconButton } from '@/lib/material-ui'
import { useState, useEffect } from 'react'
import InteractiveProductPreviewCard from '@/components/InteractiveProductPreviewCard'
import priceFormatter from '@/lib/priceFormatter'
import { useAtom } from 'jotai'
import cartStateAtom from '@/lib/cartStateAtom'
import removeBadCartItems from '@/lib/removeBadCartItems'


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
					<IconButton disabled size="sm" variant="outlined">
						{cartState[productData.name]}
					</IconButton>
					<IconButton size="sm" variant="outlined" onClick={addItem}>
						<AddItemIcon />
					</IconButton>
					<IconButton size="sm" variant="outlined" onClick={removeItem}>
						<RemoveItemIcon />
					</IconButton>
				</div>
				<span className="text-sm font-bold">
					${priceFormatter.format(productData.priceInUSD * cartState[productData.name])}
				</span>
			</div>
		</div>
	)
}

