import ImageGallery from '@/components/ImageGallery'
import ProductViewerDashboard from '@/components/ProductViewerDashboard'


export default function ProductViewer({ product }: { product: {[key: string]: any;}}) {
	return (
		<div className="m-8 flex flex-col sm:flex-row justify-center items-center align-center">
			<ImageGallery imageURLs={product.imageURLs} />
			<ProductViewerDashboard product={product} />
		</div>
	)
}

