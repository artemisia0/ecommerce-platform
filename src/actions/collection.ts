'use server'

import { PrismaClient } from '@prisma/client'
import type CollectionData from '@/lib/CollectionData'


const prisma = new PrismaClient()

async function collectionDataValidnessStatus(collectionData: CollectionData) {
	if (collectionData.name.length === 0) {
		return {
			statusMessage: "Name must not be empty.",
			statusSuccess: false,
		}
	}

	if (collectionData.name.length > 80) {
		return {
			statusMessage: "Name is too long",
			statusSuccess: false,
		}
	}

	if (collectionData.description.length === 0) {
		return {
			statusMessage: "Description must not be empty.",
			statusSuccess: false,
		}
	}

	if (collectionData.description.length > 1000) {
		return {
			statusMessage: "Description is too long.",
			statusSuccess: false,
		}
	}

	const products = []
	for (const productName of collectionData.productNames) {
		try {
			const product = await prisma.product.findUniqueOrThrow({
				where: {
					name: productName,
				},
				select: {
					id: true
				}
			})
			products.push(product)
		} catch (err) {
			return {
				statusMessage: `Product with name '${productName}' does not exist.`,
				statusSuccess: false,
			}
		}
	}

	return {
		statusMessage: "",
		statusSuccess: true,
	}
}

async function collectionExistsByName(collectionName: string) {
	const maybeFound = await prisma.collection.findUnique({ where: { name: collectionName } })
	return maybeFound != null
}

export async function createCollection(collectionData: CollectionData): 
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}>
{
	if (await collectionExistsByName(collectionData.name)) {
		return {
			statusMessage: `Collection with name '${collectionData.name}' already exists.`,
			statusSuccess: false,
		}
	}

	const status = await collectionDataValidnessStatus(collectionData)
	if (!status.statusSuccess) {
		return status
	}

	try {
		const createdCollection = await prisma.collection.create({
			data: {
				name: collectionData.name,
				description: collectionData.description,
				products: {
					connect: collectionData.productNames.map((name) => ({name})),
				},
			}
		})
	} catch (err) {
		return {
			statusMessage: `Failed to create collection: '${err}'.`,
			statusSuccess: false,
		}
	}
	return {
		statusMessage: "Successfully added new collection.",
		statusSuccess: true,
	}
}

export async function fetchCollectionByName(collectionName: string) {
	const found = await prisma.collection.findUnique({
		where: {
			name: collectionName,
		},
		select: {
			name: true,
			description: true,
			products: {
				select: {
					name: true,
				}
			}
		},
	})

	if (found == null) {
		return {
			statusMessage: "Could not find such a collection.",
			statusSuccess: false,
			name: "",
			description: "",
			products: [],
		}
	}

	return {
		statusMessage: "Collection data successfully fetched.",
		statusSuccess: true,
		...found,
	}
}

export async function listCollections(jsonCollectionAsString: string) {
	const jsonCollection = JSON.parse(jsonCollectionAsString)
	try {
		const found = await prisma.collection.findMany({where: jsonCollection})
		return found
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

export async function updateCollection(collectionData: CollectionData):
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}> {
	if (!(await collectionExistsByName(collectionData.name))) {
		return {
			statusMessage: `No collection with provided name.`,
			statusSuccess: false,
		}
	}

	const status = await collectionDataValidnessStatus(collectionData)
	if (!status.statusSuccess) {
		return status
	}

	try {
		await prisma.collection.update({
			where: {
				name: collectionData.name,
			},
			data: {
				description: collectionData.description,
				products: {
					connect: collectionData.productNames.map((name) => ({name})),
				}
			}
		})
	} catch (err) {
		return {
			statusMessage: "Failed to update collection.",
			statusSuccess: false,
		}
	}

	return {
		statusMessage: "Collection successfully updated.",
		statusSuccess: false,
	}
}

export async function deleteCollectionByName(collectionName: string) {
	try {
		await prisma.collection.delete({where: { name: collectionName }})
		return {
			statusMessage: "Collection successfully deleted.",
			statusSuccess: true,
		}
	} catch (err) {
		return {
			statusMessage: "No collection with provided name.",
			statusSuccess: false,
		}
	}
}

export async function fetchCollectionNames() {
	try {
		const found = await prisma.collection.findMany({
			select: {
				name: true,
			}
		})
		const collectionNames = found.map((obj) => obj.name) 
		return collectionNames
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

