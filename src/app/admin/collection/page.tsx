'use client'

import {
	ButtonGroup,
	Input,
	Alert,
	Button,
	Typography,
	Textarea,
} from '@/lib/material-ui'

import ListEditor from '@/components/ListEditor'
import { atom, useAtom } from 'jotai'
import type CollectionData from '@/lib/CollectionData'
import { createCollection, fetchCollectionByName, deleteCollectionByName, updateCollection } from '@/actions/collection'
import { useState } from 'react'
import collectionListEditorStateAtom from '@/lib/collectionListEditorStateAtom'


function InfoIcon() {
	return (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>
	)
}

function ErrorIcon() {
	return (
	<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>
	)
}

export default function Page() {
	const [listEditorState, setListEditorState] = useAtom(collectionListEditorStateAtom)
	const [statusMessage, setStatusMessage] = useState('')
	const [statusSuccess, setStatusSuccess] = useState(true)
	const [collectionNameValue, setCollectionNameValue] = useState('')
	const [collectionDescriptionValue, setCollectionDescriptionValue] = useState('')
	const [fetchFormStatusMessage, setFetchFormStatusMessage] = useState('')
	const [fetchFormStatusSuccess, setFetchFormStatusSuccess] = useState(true)

	const onCollectionDescriptionValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		event.preventDefault()
		setCollectionDescriptionValue(event.target.value)
	}

	const onCollectionNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()
		setCollectionNameValue(event.target.value)
	}

	const collectionData: () => CollectionData = () => {
		return {
			name: collectionNameValue,
			description: collectionDescriptionValue,
			productNames: listEditorState,
		}
	}

	const addButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		createCollection(collectionData())
			.then(res => { setStatusMessage(res.statusMessage); setStatusSuccess(res.statusSuccess); })
			.catch(err => console.error(err))
		setFetchFormStatusMessage("")
	}

	const updateButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		updateCollection(collectionData())
			.then(res => {
				setStatusMessage(res.statusMessage)
				setStatusSuccess(res.statusSuccess)
			})
			.catch(err => {
				console.error(err)
			})
		setFetchFormStatusMessage("")
	}

	const deleteButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		deleteCollectionByName(collectionNameValue)
			.then(res => {
				setStatusMessage(res.statusMessage)
				setStatusSuccess(res.statusSuccess)
			})
			.catch(err => {
				console.error(err)
			})
		setFetchFormStatusMessage("")
	}

	const fetchFormSubmitCallback = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		const collectionName = formData.get('collectionName') as string
		fetchCollectionByName(collectionName)
			.then(res => {
				setCollectionNameValue(res.name)
				setCollectionDescriptionValue(res.description)
				setListEditorState(res.products.map((p) => p.name))
				setFetchFormStatusMessage(res.statusMessage)
				setFetchFormStatusSuccess(res.statusSuccess)
			})
			.catch(err => {
				console.error(err)
			})
		setStatusMessage("")
	}

	return (
		<main className="flex flex-col gap-3 justify-center items-center pt-8">
			<form onSubmit={fetchFormSubmitCallback} className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-white rounded bg-white/50 p-3">
				<Input name="collectionName" label="Collection Name" crossOrigin=""></Input>
				{fetchFormStatusMessage.length !== 0 &&
					<Alert variant="ghost" className="p-2 m-0" icon={fetchFormStatusSuccess ? <InfoIcon /> : <ErrorIcon />}><Typography variant="small" color="black">{fetchFormStatusMessage}</Typography></Alert>
				}
				<Button type="submit" color="white" className="bg-blue-900/20">Fetch</Button>
			</form>
			<form className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-white rounded bg-white/50 p-3">
				<Input value={collectionNameValue} onChange={onCollectionNameValueChange} label="Collection Name" crossOrigin=""></Input>
				<Textarea onChange={onCollectionDescriptionValueChange} value={collectionDescriptionValue} label="Collection Description"></Textarea>
				<ListEditor inputType="text" inputLabel="Add product name" listItems={listEditorState} setListItems={setListEditorState}>
				</ListEditor>
				{statusMessage.length !== 0 &&
					<Alert variant="ghost" className="p-2 m-0" icon={statusSuccess ? <InfoIcon /> : <ErrorIcon />}><Typography variant="small" color="black">{statusMessage}</Typography></Alert>
				}
				<ButtonGroup color="white">
					<Button className="bg-green-900/20" onClick={addButtonCallback}>Add</Button>
					<Button className="bg-yellow-900/20" onClick={updateButtonCallback}>Update</Button>
					<Button className="bg-red-900/20" onClick={deleteButtonCallback}>Delete</Button>
				</ButtonGroup>
			</form>
		</main>
	)
}

