'use client'

import {
	Typography,
	Input,
	IconButton,
} from '@/lib/material-ui'

import { useState } from 'react'


function RemoveIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
	)
}

function AddIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>
	)
}

export default function ListEditor(
	{ inputType, inputLabel, listItems, setListItems }:
	{ inputType: string;
		inputLabel: string;
		listItems: string[];
		setListItems: (input: string[]) => void; }
) {
	const [itemToAddValue, setItemToAddValue] = useState("")

	const onItemToAddValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItemToAddValue(event.target.value)
	}

	const removeItem = (itemName: string) => {
		setListItems(JSON.parse(JSON.stringify(listItems.filter((oldItem) => oldItem !== itemName))))
	}

	const addItem = (itemName: string) => {
		setListItems(JSON.parse(JSON.stringify([...listItems, itemName])))
	}

	const addButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		addItem(itemToAddValue)
		setItemToAddValue("")
	}

	return (
		<div className="flex flex-col gap-3 font-normal text-md w-full">
			<div className="flex flex-col gap-2 w-full overflow-y-scroll max-h-96 p-3 border border-gray-400 rounded-lg snap-y">

				<div className="flex justify-between items-center rounded-lg p-1 w-full gap-3 snap-center">
					<Input crossOrigin="" type={inputType} label={inputLabel} value={itemToAddValue} onChange={onItemToAddValueChange}></Input>
					<button className="flex justify-center items-center hover:bg-black/10 rounded-full" onClick={addButtonCallback}>
						<AddIcon></AddIcon>
					</button>
				</div>

				{Object.entries(listItems.toReversed()).map(
					([index, item]) => (
						<div key={index} className="flex justify-between items-center border border-gray-400 rounded-lg p-1 w-full snap-center">
							<Typography variant="small" color="blue-gray">
								{item}
							</Typography>
							<button className="flex justify-center items-center hover:bg-black/10 rounded-full" onClick={(event: React.MouseEvent<HTMLButtonElement>) => { event.preventDefault(); removeItem(item); }}>
								<RemoveIcon></RemoveIcon>
							</button>
						</div>
					)
				)}
			</div>
		</div>
	)
}

