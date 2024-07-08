import ImageSkeleton from '@/components/ImageSkeleton'


export default function ProductPreviewCardSkeleton() {
	return (
		<div className="animate-pulse flex flex-col gap-3 justify-center items-center align-center bg-white/50 p-3 border border-white shadow shadow-lg w-full max-w-64 h-72 backdrop-blur-sm">
			<ImageSkeleton></ImageSkeleton>
			<div className="flex w-full flex-row items-center justify-between flex-wrap gap-2 text-sm">
				<p className="h-4 w-24 rounded-full bg-gray-300"></p>
				<p className="h-4 w-8 rounded-full bg-gray-300"></p>
			</div>
		</div>
	)
}

