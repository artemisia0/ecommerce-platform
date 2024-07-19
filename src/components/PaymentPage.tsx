'use client'

import CheckoutForm from '@/components/CheckoutForm'
import { Elements } from '@stripe/react-stripe-js'


export default function Page({ stripe, options }: { stripe: any; options: any; }) {
	return (
	 	<main className="flex flex-col min-h-screen justify-center items-center align-center">
			<div className="flex p-3 border border-black/20 backdrop-blur shadow m-3 justify-center items-center align-center rounded-lg">
				<Elements stripe={stripe} options={options}>
					<CheckoutForm />
				</Elements>
			</div>
		</main>
	)
}

