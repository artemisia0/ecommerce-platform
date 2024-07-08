import { useRef, useImperativeHandle, forwardRef, Suspense } from 'react'
import { fetchProductByName } from '@/actions/product'
import InteractiveProductPreviewCard from '@/components/InteractiveProductPreviewCard'


export default async function ProductPreviewCard(
	{ productName }: 
	{ productName: string; }
) {
	const product = await fetchProductByName(productName)

	return (
		<InteractiveProductPreviewCard product={product} />
	)
}

