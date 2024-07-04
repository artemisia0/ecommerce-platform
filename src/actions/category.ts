'use server'

import { PrismaClient } from '@prisma/client'
import type CategoryData from '@/lib/CategoryData'


const prisma = new PrismaClient()

export async function createCategory(categoryData: CategoryData): 
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}>
{
	const maybeFoundCategory = await prisma.category.findUnique({
		where: {
			name: categoryData.name,
		}
	})

	if (maybeFoundCategory != null) {
		return {
			statusMessage: `Category with name '${categoryData.name}' already exists.`,
			statusSuccess: false,
		}
	}

	const products = []
	for (const productName of categoryData.productNames) {
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
	try {
		const createdCategory = await prisma.category.create({
			data: {
				name: categoryData.name,
				description: categoryData.description,
				products: {
					connect: products,
				},
			}
		})
	} catch (err) {
		return {
			statusMessage: `Failed to create category: '${err}'.`,
			statusSuccess: false,
		}
	}
	return {
		statusMessage: "Successfully added new category.",
		statusSuccess: true,
	}
}

export async function fetchCategoryByName(categoryName: string) {
	const found = await prisma.category.findUniqueOrThrow({
		where: {
			name: categoryName,
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

	return {
		statusMessage: "Category data successfully fetched.",
		statusSuccess: true,
		...found,
	}
}

export async function listCategories(jsonCategoryAsString: string) {
	const jsonCategory = JSON.parse(jsonCategoryAsString)
	try {
		const found = await prisma.category.findMany({where: jsonCategory})
		return found
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

export async function updateCategory(categoryData: CategoryData):
Promise<{
	statusMessage: string;
	statusSuccess: boolean;
}> {
	const maybeFoundCategory = await prisma.category.findUnique({
		where: {
			name: categoryData.name,
		}
	})

	if (maybeFoundCategory == null) {
		return {
			statusMessage: `No category with provided name.`,
			statusSuccess: false,
		}
	}

	const products = []
	for (const productName of categoryData.productNames) {
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

	try {
		await prisma.category.update({
			where: {
				name: categoryData.name,
			},
			data: {
				description: categoryData.description,
				products: {
					connect: products,
				}
			}
		})
	} catch (err) {
		return {
			statusMessage: "Failed to update category.",
			statusSuccess: false,
		}
	}

	return {
		statusMessage: "Category successfully updated.",
		statusSuccess: false,
	}
}

export async function deleteCategoryByName(categoryName: string) {
	try {
		await prisma.category.delete({where: { name: categoryName }})
		return {
			statusMessage: "Category successfully deleted.",
			statusSuccess: true,
		}
	} catch (err) {
		return {
			statusMessage: "No category with provided name.",
			statusSuccess: false,
		}
	}
}

export async function fetchCategoryNames() {
	try {
		const found = await prisma.category.findMany({
			select: {
				name: true,
			}
		})
		const categoryNames = found.map((obj) => obj.name) 
		return categoryNames
	} catch (err) {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	}
}

