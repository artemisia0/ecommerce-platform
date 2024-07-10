'use client'

import { Button } from '@/lib/material-ui'


export default function ProductViewerDashboard({ product }: { product: {[key: string]: any;} }) {
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
				: ${product.priceInUSD}
			</p>
			<Button variant="outlined" className="mt-3 rounded-none">
				Add to Cart
			</Button>
		</div>
	)
}

