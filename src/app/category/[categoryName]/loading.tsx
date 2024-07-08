import ProductPreviewCardSkeleton from '@/components/ProductPreviewCardSkeleton'


export default function Loading() {
	const cardSkeletonCount = 16
	return (
		<main className="flex flex-col gap-3 justify-center items-center align-center pt-8">
			<div className="flex flex-wrap w-full max-w-[960px] justify-center items-center align-center gap-6 p-6">
				{Array.from({length: cardSkeletonCount}, (_, i) => i).map(
					(index) => (
						<ProductPreviewCardSkeleton key={index} />
					)
				)}
			</div>
		</main>
	)
}

