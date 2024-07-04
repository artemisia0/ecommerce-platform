'use server'

import { PrismaClient } from '@prisma/client'
import type ProductData from '@/lib/ProductData'


const prisma = new PrismaClient()

export async function categoryExistsByName(name: string) {
	const found = await prisma.category.findUnique({ where: { name } })
	return found != null
}

export async function collectionExistsByName(name: string) {
	const found = await prisma.collection.findUnique({ where: { name } })
	return found != null
}

function URLValidness(URLString: string) {
	try {
		const newURL = new URL(URLString)
		return true
	} catch (err) {
		return false
	}
	return false
}

function productDataForPrismaClient(productData: ProductData) {
	let data: {
		name: string;
		description: string;
		imageURLs: string[];
		sex?: string;
		priceInUSD: number;
		previewImage: string;
		extraPreviewImage?: string;
		category: object;
		collection?: object;
	} = {
		name: productData.name,
		description: productData.description,
		imageURLs: productData.imageURLs,
		sex: productData.sex,
		priceInUSD: productData.priceInUSD,
		previewImage: productData.previewImage,
		extraPreviewImage: productData.extraPreviewImage,
		category: {
			connect: {
				name: productData.categoryName,
			}
		}
	}
	if (productData.collectionName != null) {
		data = {
			...data,
			collection: {
				connect: {
					name: productData.collectionName
				}
			}
		}
	}
	return data
}

async function productExistsByName(productName: string) {
	const maybeFound = await prisma.product.findUnique({
		where: {
			name: productName,
		}
	})
	return maybeFound != null
}

async function productDataStatus(productData: ProductData) {
	if (!(await categoryExistsByName(productData.categoryName))) {
		return {
			statusMessage: `No category with name '${productData.categoryName}'.`,
			statusSuccess: false,
		}
	}

	if (productData.collectionName != null && !(await collectionExistsByName(productData.collectionName))) {
		return {
			statusMessage: `No collection with name '${productData.collectionName}'.`,
			statusSuccess: false,
		}
	}

	if (productData.sex != null && ["man", "woman", "unisex", "other"].includes(productData.sex as string) == false) {
		return {
			statusMessage: "Invalid sex value.",
			statusSuccess: false,
		}
	}

	if (productData.priceInUSD < 0.0 || Number.isNaN(productData.priceInUSD
			|| productData.priceInUSD > 2000000000.0)) {
		return {
			statusMessage: "Invalid price",
			statusSuccess: false,
		}
	}

	const URLsToTest = [productData.previewImage, ...productData.imageURLs]
	if (productData.extraPreviewImage != null) {
		URLsToTest.push(productData.extraPreviewImage as string)
	}
	for (const URLString of URLsToTest) {
		if (!URLValidness(URLString)) {
			return {
				statusMessage: `Invalid image URL '${URLString}'.`,
				statusSuccess: false,
			}
		}
	}

	if (productData.name.length == 0) {
		return {
			statusMessage: `Name must not be empty.`,
			statusSuccess: false,
		}
	}

	if (productData.name.length > 80) {
		return {
			statusMessage: `Name is too long`,
			statusSuccess: false,
		}
	}

	if (productData.description.length == 0) {
		return {
			statusMessage: `Description must not be empty.`,
			statusSuccess: false,
		}
	}

	if (productData.description.length > 1000) {
		return {
			statusMessage: `Description is too long.`,
			statusSuccess: false,
		}
	}

	return {
		statusMessage: "",
		statusSuccess: true,
	}
}

export async function createProduct(productData: ProductData): 
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}>
{
	if (await productExistsByName(productData.name)) {
		return {
			statusMessage: `Product with name '${productData.name}' already exists.`,
			statusSuccess: false,
		}
	}

	const status = await productDataStatus(productData)
	if (!status.statusSuccess) {
		return status
	}

	try {
		const createdProduct = await prisma.product.create({
			data: productDataForPrismaClient(productData)
		})
	} catch (err) {
		return {
			statusMessage: `Failed to create product: '${err}'.`,
			statusSuccess: false,
		}
	}
	return {
		statusMessage: "Successfully added new product.",
		statusSuccess: true,
	}
}

export async function fetchProductByName(productName: string) {
	const found = await prisma.product.findUnique({
		where: {
			name: productName,
		},
		select: {
			name: true,
			description: true,
			sex: true,
			priceInUSD: true,
			previewImage: true,
			extraPreviewImage: true,
			category: {
				select: {
					name: true,
				}
			},
			collection: {
				select: {
					name: true,
				}
			},
			imageURLs: true,
		},
	})

	if (found == null) {
		return {
			statusMessage: "Product with provided name does not exist.",
			statusSuccess: false,
			name: "",
			description: "",
			sex: "",
			priceInUSD: 0.0,
			previewImage: "",
			extraPreviewImage: "",
			category: { name: "" },
			collection: { name: "" },
			imageURLs: [],
		}
	}

	return {
		statusMessage: "Product data successfully fetched.",
		statusSuccess: true,
		...found,
	}
}

export async function listProducts(jsonProductAsString: string) {
	const jsonProduct = JSON.parse(jsonProductAsString)
	try {
		const found = await prisma.product.findMany({where: jsonProduct})
		return found
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

export async function updateProduct(productData: ProductData):
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}> {
	if (!productExistsByName(productData.name)) {
		return {
			statusMessage: `No product with name '${productData.name}'.`,
			statusSuccess: false,
		}
	}

	const status = await productDataStatus(productData)
	if (!status.statusSuccess) {
		return status
	}

	try {
		await prisma.product.update({
			where: {
				name: productData.name,
			},
			data: productDataForPrismaClient(productData),
		})
	} catch (err) {
		return {
			statusMessage: `Failed to update product: ${err}.`,
			statusSuccess: false,
		}
	}

	return {
		statusMessage: "Product successfully updated.",
		statusSuccess: false,
	}
}

export async function deleteProductByName(productName: string) {
	try {
		await prisma.product.delete({where: { name: productName }})
		return {
			statusMessage: "Product successfully deleted.",
			statusSuccess: true,
		}
	} catch (err) {
		return {
			statusMessage: "No product with provided name.",
			statusSuccess: false,
		}
	}
}

export async function fetchProductNames() {
	try {
		const found = await prisma.product.findMany({
			select: {
				name: true,
			}
		})
		const productNames = found.map((obj) => obj.name) 
		return productNames
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

