'use client'

import { ButtonGroup, IconButton } from '@/lib/material-ui'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'


export default function PaginationDashboard({ page, maxPage }: { page: number; maxPage: number; }) {
	const pathname = usePathname()
	const searchParams = new URLSearchParams(useSearchParams().toString())

	const currentPage = Number(page)
	const minPage = 1
	let pageNumbers: number[] = [minPage, maxPage]
	const diff = 2
	for (let i = currentPage-diff; i <= currentPage+diff; i += 1) {
		pageNumbers.push(i)
	}
	pageNumbers = Array.from(new Set(pageNumbers))
	pageNumbers = pageNumbers.filter((p) => p >= minPage && p <= maxPage)
	pageNumbers.sort((a, b) => a - b)

	const pageLinks: {[key: string]: string;} = {}
	pageNumbers.forEach(
		(pageNumber) => {
			searchParams.set('page', pageNumber.toString())
			pageLinks[pageNumber.toString()] = pathname + "?" + searchParams
		}
	)

	let iconsList = pageNumbers.map(
		(p) => (
			<IconButton key={p} className={"shadow-none " + (p === currentPage ? "bg-blue-900/20" : " ")}>
				<Link href={pageLinks[p.toString()]}>
					<div className="w-10 h-10 flex justify-center items-center align-center">
						{p}
					</div>
				</Link>
			</IconButton>
		)
	)

	if ((pageNumbers[1] ?? 1) - (pageNumbers[0] ?? 0) !== 1) {
		const i = 1
		iconsList = [
			...iconsList.slice(0, i),
			<IconButton key="first-three-points" className="shadow-none" disabled>...</IconButton>,
			...iconsList.slice(i),
		]
	}

	if ((pageNumbers[pageNumbers.length-1] ?? 1) - (pageNumbers[pageNumbers.length-2] ?? 0) !== 1) {
		const i = iconsList.length-1
		iconsList = [
			...iconsList.slice(0, i),
			<IconButton key="second-three-points" className="shadow-none" disabled>...</IconButton>,
			...iconsList.slice(i),
		]
	}

	return (
		<ButtonGroup variant="outlined" className="max-w-[320px] sm:max-w-none">

			<IconButton className="shadow-none" disabled={currentPage <= 1}>
				<Link href={pageLinks[(currentPage-1).toString()] ?? "/"}>
					<div className="w-10 h-10 flex justify-center items-center align-center">
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4">
						</ArrowLeftIcon>
					</div>
				</Link>
			</IconButton>

			{iconsList}

			<IconButton className="shadow-none" disabled={currentPage >= maxPage}>
				<Link href={pageLinks[(currentPage+1).toString()] ?? "/"}>
					<div className="w-10 h-10 flex justify-center items-center align-center">
						<ArrowRightIcon strokeWidth={2} className="h-4 w-4">
						</ArrowRightIcon>
					</div>
				</Link>
			</IconButton>
	
		</ButtonGroup>
	)
}

