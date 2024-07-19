'use client'

import { loadStripe } from '@stripe/stripe-js'
import PaymentPage from '@/components/PaymentPage'
import { createPaymentIntent, fetchStripePublishableKey } from '@/actions/payment'
import cartStateAtom from '@/lib/cartStateAtom'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { Spinner } from '@/lib/material-ui'


export default function Page() {
	const cartState = useAtomValue(cartStateAtom)
	const [clientSecret, setClientSecret] = useState<null | string>(null)
	const [stripe, setStripe] = useState<any>(null)

	useEffect(
		() => {
			const fetchData = async () => {
				setClientSecret(await createPaymentIntent(cartState))
				setStripe(await loadStripe(await fetchStripePublishableKey()))
			}
			fetchData()
		}, [cartState]
	)

	if (stripe == null || clientSecret == null) {
		return (
			<main className="min-h-screen flex justify-center items-center align-center">
				<Spinner />
			</main>
		)
	}

	return (
		<>
			{stripe && clientSecret &&
				<PaymentPage stripe={stripe} options={{clientSecret}} />
			}
		</>
	)
}

