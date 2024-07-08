'use client'

import { forwardRef, useImperativeHandle, useState } from 'react'
import Image from 'next/image'


const ProductPreviewImage = forwardRef(function ProductPreviewImage(props: { extraPreview: string; preview: string; }, ref) {
	const [imageHovered, setImageHovered] = useState(false)

	useImperativeHandle(ref, () => ({
		setHovered: (flag: boolean) => {
			setImageHovered(flag)
		},
	}), [])

	return (
		<Image src={imageHovered ? props.extraPreview : props.preview} width={320} height={320} className="rounded" alt="Product preview image" />
	)
})

export default ProductPreviewImage

