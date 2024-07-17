'use client'

import Image from 'next/image'
import Link from 'next/link'
import ProductPreviewImage from '@/components/ProductPreviewImage'
import { useRef } from 'react'
import priceFormatter from '@/lib/priceFormatter'


export default function InteractiveProductPreviewCard({ product }: {product: {[key: string]: any;}}) {
	const imageRef = useRef({ setHovered: (flag: boolean) => { return; } })

	const onMouseEnter = () => { imageRef.current.setHovered(true) }
	const onMouseLeave = () => { imageRef.current.setHovered(false) }

	return (
		<Link className="m-0 p-0" href={"/product/" + product.name.replaceAll(" ", "_")}>
			<div className="flex flex-col rounded-lg gap-3 justify-center items-center align-center bg-white/50 bg-black/10 p-3 border border-white shadow w-full w-full h-full backdrop-blur-sm hover:shadow-inner hover:backdrop-blur hover:bg-blue-900/10" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
				<ProductPreviewImage ref={imageRef} preview={product.previewImage} extraPreview={product.extraPreviewImage} />
				<div className="flex w-full flex-row items-center justify-between flex-wrap gap-2 text-sm">
					<p className="font-bold">{product.name}</p>
					<p className="font-bold">${priceFormatter.format(product.priceInUSD)}</p>
				</div>
			</div>
		</Link>
	)
}

