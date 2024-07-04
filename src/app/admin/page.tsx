import Link from 'next/link'
import { Button } from '@/lib/material-ui'


function AdminIcon() {
	return (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
	)
}

export default function Page() {
	return (
		<main className="flex flex-col gap-3 justify-center items-center pt-8">
			<div className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-white rounded bg-white/50 p-3">
				<p className="text-lg"><span className="font-bold">Products</span> management page</p>
				<Link href="/admin/product">
					<Button color="white" className="bg-blue-900/20">Go</Button>
				</Link>
			</div>
			<div className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-white rounded bg-white/50 p-3">
				<p className="text-lg"><span className="font-bold">Categories</span> management page</p>
				<Link href="/admin/category">
					<Button color="white" className="bg-blue-900/20">Go</Button>
				</Link>
			</div>
			<div className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-white rounded bg-white/50 p-3">
				<p className="text-lg"><span className="font-bold">Collections</span> management page</p>
				<Link href="/admin/collection">
					<Button color="white" className="bg-blue-900/20">Go</Button>
				</Link>
			</div>
		</main>
	)
}

