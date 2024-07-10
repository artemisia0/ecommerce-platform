import { fetchProductByName } from '@/actions/product'
import ProductViewer from '@/components/ProductViewer'


export default async function Page({ params }: { params: { productName: string; } }) {
	const validProductName = params.productName.replaceAll("_", " ")
	const product = await fetchProductByName(validProductName)

	return (
		<main className="min-h-screen flex flex-col gap-0 items-center align-center">
			<ProductViewer product={product} />
		</main>
	)
}

