import { productPagesCount, paginatedProductNamesByCategoryName } from '@/actions/product'
import LoadingProductPreviewCard from '@/components/LoadingProductPreviewCard'
import ProductPreviewCard from '@/components/ProductPreviewCard'
import PaginationDashboard from '@/components/PaginationDashboard'


export default async function CategoryPage({ params, searchParams }: { params: { categoryName: string; }; searchParams: { page: number; }; }) {
	const categoryName = params.categoryName.replaceAll("_", " ")
	const productNames = await paginatedProductNamesByCategoryName(
		categoryName,
		Number(searchParams.page),
	)
	const maxPage = await productPagesCount()

	return (
		<main className="min-h-[calc(100vh-100px)] flex flex-col gap-3 justify-between items-center align-center pt-8">
			<div className="flex flex-wrap w-full max-w-[960px] justify-center items-center align-center gap-6 p-6">
				{productNames.map(
					(productName: string) => (
						<ProductPreviewCard key={productName} productName={productName} />
					)
				)}
			</div>
			<PaginationDashboard page={searchParams.page} maxPage={maxPage}></PaginationDashboard>
		</main>
	)
}

