'use server'
import 'server-only'

import { fetchProductPriceByName } from '@/actions/product'

const secretKey = process.env.STRIPE_SECRET_KEY
if (secretKey == null) {
	console.error("STRIPE_SECRET_KEY is not set.")
	process.exit(1)
}
const stripe = require('stripe')(secretKey)


export async function calculatePriceBasedOnCartState(cartState: { [key: string]: number; }) {
	let overallPrice = 0
	for (let productName of Object.keys(cartState)) {
		if (cartState[productName] <= 0) {
			console.error('cartState[productName] <= 0 is true!')
			return 0
		}
		const productPrice = await fetchProductPriceByName(productName)
		overallPrice += productPrice*cartState[productName]
	}
	return overallPrice
}

export async function createPaymentIntent(cartState: { [key: string]: number; }) {
	const price = await calculatePriceBasedOnCartState(cartState)

	if (price <= 0) {
		return null
	}

	const paymentIntent = await stripe.paymentIntents.create({
		amount: parseInt((price*100).toString()),
		currency: 'usd',
	})

	return paymentIntent.client_secret
}

export async function fetchStripePublishableKey() {
	const key = process.env.STRIPE_PUBLISHABLE_KEY
	if (key == undefined) {
		console.error('STRIPE_PUBLISHABLE_KEY is not set.')
		process.exit(1)
	}
	return key
}

