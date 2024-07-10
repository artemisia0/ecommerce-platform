'use client'

import {
	ButtonGroup,
	Input,
	Alert,
	Button,
	Typography,
	Textarea,
	Switch,
	Select,
	Option,
} from '@/lib/material-ui'

import ListEditor from '@/components/ListEditor'
import { atom, useAtom } from 'jotai'
import type ProductData from '@/lib/ProductData'
import { createProduct, fetchProductByName, deleteProductByName, updateProduct } from '@/actions/product'
import { useState } from 'react'
import imageURLsStateAtom from '@/lib/imageURLsStateAtom'


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
	const [statusMessage, setStatusMessage] = useState('')
	const [statusSuccess, setStatusSuccess] = useState(true)
	const [imageURLsState, setImageURLsState] = useAtom(imageURLsStateAtom)
	const [productNameValue, setProductNameValue] = useState('')
	const [productDescriptionValue, setProductDescriptionValue] = useState('')
	const [productCategoryNameValue, setProductCategoryNameValue] = useState('')
	const [productCollectionNameValue, setProductCollectionNameValue] = useState('')
	const [belongsToSomeCollection, setBelongsToSomeCollection] = useState(false)
	const [fetchFormStatusMessage, setFetchFormStatusMessage] = useState('')
	const [fetchFormStatusSuccess, setFetchFormStatusSuccess] = useState(true)
	const [productSexValue, setProductSexValue] = useState<string | undefined>("unisex")
	const [priceInUSDValue, setPriceInUSDValue] = useState(0.0)
	const [previewImageValue, setPreviewImageValue] = useState("")
	const [extraPreviewImageValue, setExtraPreviewImageValue] = useState("")
	const [hasExtraPreviewImage, setHasExtraPreviewImage] = useState(false)

	const onExtraPreviewImageValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setExtraPreviewImageValue(event.target.value as string)
	}

	const onPreviewImageValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPreviewImageValue(event.target.value)
	}

	const onPriceInUSDValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPriceInUSDValue(parseFloat(event.target.value))
	}

	const onHasExtraPreviewImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setHasExtraPreviewImage(event.target.checked)
	}

	const productSexOptions = [
		{ label: "Man", value: "man" },
		{ label: "Woman", value: "woman" },
		{ label: "Unisex", value: "unisex" },
		{ label: "Other", value: "other" }
	]

	const onProductSexValueChange = (newValue: string | undefined) => {
		setProductSexValue(newValue)
	}

	const onBelongsToSomeCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setBelongsToSomeCollection(event.target.checked)
	}

	const onProductCategoryNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProductCategoryNameValue(event.target.value)
	}

	const onProductCollectionNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProductCollectionNameValue(event.target.value)
	}

	const onProductDescriptionValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setProductDescriptionValue(event.target.value)
	}

	const onProductNameValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setProductNameValue(event.target.value)
	}

	const productData: () => ProductData = () => {
		return {
			name: productNameValue,
			description: productDescriptionValue,
			categoryName: productCategoryNameValue,
			sex: productSexValue,
			priceInUSD: priceInUSDValue,
			previewImage: previewImageValue,
			extraPreviewImage: hasExtraPreviewImage ? extraPreviewImageValue : undefined,
			collectionName: belongsToSomeCollection ? productCollectionNameValue : undefined,
			imageURLs: imageURLsState,
		}
	}

	const addButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		createProduct(productData())
			.then(res => { setStatusMessage(res.statusMessage); setStatusSuccess(res.statusSuccess); })
			.catch(err => console.error(err))
		setFetchFormStatusMessage("")
	}

	const updateButtonCallback = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		updateProduct(productData())
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
		deleteProductByName(productNameValue)
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
		const productName = formData.get('productName') as string
		fetchProductByName(productName)
			.then(res => {
				setProductNameValue(res.name)
				setProductDescriptionValue(res.description)
				setProductSexValue(res.sex)
				setPriceInUSDValue(res.priceInUSD)
				setPreviewImageValue(res.previewImage)
				setExtraPreviewImageValue("")
				setHasExtraPreviewImage(false)
				if (res.extraPreviewImage != null) {
					setExtraPreviewImageValue(res.extraPreviewImage as string)
					setHasExtraPreviewImage(true)
				}
				setProductCategoryNameValue(res.category.name)
				setProductCollectionNameValue("")
				setBelongsToSomeCollection(false)
				if (res.collection?.name != null) {
					setProductCollectionNameValue(res.collection?.name as string)
					setBelongsToSomeCollection(true)
				}
				setImageURLsState(res.imageURLs)
				setFetchFormStatusMessage(res.statusMessage)
				setFetchFormStatusSuccess(res.statusSuccess)
			})
			.catch(err => {
				console.error(err)
			})
		setStatusMessage("")
	}

	return (
		<main className="flex flex-col gap-3 justify-center items-center min-h-screen">
			<form onSubmit={fetchFormSubmitCallback} className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-black/20 rounded-lg shadow bg-white/50 p-3">
				<Input name="productName" label="Product Name" crossOrigin=""></Input>
				{fetchFormStatusMessage.length !== 0 &&
					<Alert variant="ghost" className="p-2 m-0" icon={fetchFormStatusSuccess ? <InfoIcon /> : <ErrorIcon />}><Typography variant="small" color="black">{fetchFormStatusMessage}</Typography></Alert>
				}
				<Button type="submit" color="white" className="bg-blue-900/20">Fetch</Button>
			</form>
			<form className="flex flex-col gap-3 justify-center items-center w-full max-w-96 backdrop-blur-sm border border-black/20 rounded-lg shadow bg-white/50 p-3">
				<Input value={productNameValue} onChange={onProductNameValueChange} label="Product Name" crossOrigin=""></Input>
				<Textarea onChange={onProductDescriptionValueChange} value={productDescriptionValue} label="Product Description"></Textarea>
				<Input value={priceInUSDValue} type="number" onChange={onPriceInUSDValueChange} label="Product Price in USD" crossOrigin=""></Input>
				<Select menuProps={{ className: "p-1 bg-transparent bg-white/50 backdrop-blur-sm" }} label="Select Sex" value={productSexValue} onChange={onProductSexValueChange}>
					{productSexOptions.map(
						(opt) => (
							<Option key={opt.value} className={"focus:bg-transparent focus:bg-gray-500/10 active:bg-gray-500/10 " + (productSexValue === opt.value ? "bg-gray-500/20" : " ")} value={opt.value}>{opt.label}</Option>
						)
					)}
				</Select>
				<Input value={productCategoryNameValue} onChange={onProductCategoryNameValueChange} label="Product Category Name" crossOrigin=""></Input>
				<div className="flex w-full gap-3">
					<Input value={productCollectionNameValue} onChange={onProductCollectionNameValueChange} label="Product Collection Name" crossOrigin="" disabled={!belongsToSomeCollection} className={"disabled:bg-gray-500/10"}></Input>
					<Switch crossOrigin="" ripple={false} className="w-full h-full checked:bg-green-900/20 bg-gray-900/20" containerProps={{className: "w-11 h-6"}} circleProps={{className: "before:hidden left-0.5 border-none"}} checked={belongsToSomeCollection} onChange={onBelongsToSomeCollectionChange}></Switch>
				</div>
				<Input value={previewImageValue} onChange={onPreviewImageValueChange} label="Product Preview Image" crossOrigin=""></Input>
				<div className="flex w-full gap-3">
					<Input value={extraPreviewImageValue} onChange={onExtraPreviewImageValueChange} label="Product Extra Preview Image" crossOrigin="" disabled={!hasExtraPreviewImage} className={"disabled:bg-gray-500/10"}></Input>
					<Switch crossOrigin="" ripple={false} className="w-full h-full checked:bg-green-900/20 bg-gray-900/20" containerProps={{className: "w-11 h-6"}} circleProps={{className: "before:hidden left-0.5 border-none"}} checked={hasExtraPreviewImage} onChange={onHasExtraPreviewImageChange}></Switch>
				</div>
				<ListEditor inputType="url" inputLabel="Add image URL" listItems={imageURLsState} setListItems={setImageURLsState}>
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

