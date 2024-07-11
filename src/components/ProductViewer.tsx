import ImageGallery from '@/components/ImageGallery'
import ProductViewerDashboard from '@/components/ProductViewerDashboard'


export default function ProductViewer({ product }: { product: {[key: string]: any;}}) {
	return (
		<div className="m-8 gap-3 flex flex-col justify-center items-center align-center">
			<ProductViewerDashboard product={product} />
			<ImageGallery imageURLs={product.imageURLs} />
		</div>
	)
}

