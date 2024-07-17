'use client'

import {
	Drawer,
	Button,
	IconButton,
	Typography,
	Radio,
} from '@/lib/material-ui'

import { useAtom } from 'jotai'
import { isDrawerOpenAtom } from '@/lib/drawerState'
import { fetchCategoryNames } from '@/actions/category'
import { fetchCollectionNames } from '@/actions/collection'
import { useState, useEffect } from 'react'
import Link from 'next/link'


function SexRadioIcon() {
	return (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
	)
}

function CategoryItemIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
</svg>
	)
}

function CollectionItemIconLeft() {
	return (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
</svg>
	)
}

function CollectionItemIconRight() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
</svg>
	)
}

export default function MainDrawer() {
	const [sexValue, setSexValue] = useState("unisex")
	const [categoryLabels, setCategoryLabels] = useState(["Chinos Pants", "Jeans Pants", "Jeans Jackets", "Formal Shirts", "T-Shirs", "Sweaters", "Suits"])
	const [collectionLabels, setCollectionLabels] = useState(["Hot Summer 2024", "Coolest Winter 2024", "Beach & Surfing & Sun", "Formal Suit Classics", "Limited Edition 2024", "Luxury Autumn 2024", "Happy Spring 2024"])
	const [isDrawerOpen, setIsDrawerOpen] = useAtom(isDrawerOpenAtom)

	const onSexValueChange = (event: any) => {
		setSexValue(event.target.value)
	}

	const closeDrawer = () => setIsDrawerOpen(false)

	const sexLabels = ["man", "woman", "unisex", "other"]
	useEffect(
		() => {
			fetchCategoryNames().then(res => setCategoryLabels(res))
			fetchCollectionNames().then(res => setCollectionLabels(res))
		},
		[]
	)

	return (
		<Drawer open={isDrawerOpen} onClose={closeDrawer} className="bg-transparent backdrop-blur-sm backdrop-saturate-1 bg-white/80 overflow-y-scroll">
			<div className="flex justify-end items-center align-center">
				<IconButton onClick={closeDrawer} variant="text" color="blue-gray" className="rounded-full text-black">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
					</svg>
				</IconButton>
			</div>

			<div className="flex flex-col hover:text-blue-900">
				<Typography as="h2" className="flex justify-center font-light text-lg">
					S E X
				</Typography>
				<div className="grid grid-cols-2 p-6">
					{sexLabels.map(
						(label) => (
							<Radio value={label} name="sex" onChange={onSexValueChange} key={label} crossOrigin="" ripple={false} className="p-0 m-0 h-4 w-4 ransition-all hover:before:opacity-0 border-none" label={<Typography className="text-black font-light text-md hover:text-red-900">{label}</Typography>} icon={<SexRadioIcon />} checked={label === sexValue}></Radio>
						)
					)}
				</div>
			</div>

			<div className="flex flex-col hover:text-blue-900">
				<Typography as="h2" className="flex justify-center font-light text-lg">
					C A T E G O R Y
				</Typography>
				<div className="flex justify-center items-center align-center p-6 pl-0">
					<div className="flex flex-col gap-y-3 justify-center align-center">
						{categoryLabels.map(
							(label) => (
								<div key={label} className="flex gap-x-4 hover:gap-x-2 hover:pl-2 text-black font-light text-md">
									<CategoryItemIcon></CategoryItemIcon>
									<Link href={"/category/" + label.replaceAll(" ", "_") + "?page=1&sex=" + sexValue} className="hover:text-red-900">
										<button onClick={closeDrawer} className="p-0 m-0">
											{label}
										</button>
									</Link>
								</div>
							)
						)}
					</div>
				</div>
			</div>

			<div className="flex flex-col hover:text-blue-900">
				<Typography as="h2" className="flex justify-center font-light text-lg">
					C O L L E C T I O N
				</Typography>
				<div className="flex justify-center items-center align-center p-6">
					<div className="flex flex-col gap-y-3 justify-center align-center">
						{collectionLabels.map(
							(label) => (
								<div key={label} className="flex justify-center items-center align-center gap-x-4 hover:gap-x-2 text-black font-light text-md">
									<CollectionItemIconLeft></CollectionItemIconLeft>
									<a className="hover:text-red-900">
										{label}
									</a>
									<CollectionItemIconRight></CollectionItemIconRight>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</Drawer>
	)
}

