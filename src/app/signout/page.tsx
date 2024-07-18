'use client'

import { signOut } from '@/actions/auth'
import { useState, useEffect } from 'react'


export default function Page() {
	const [msg, setMsg] = useState('Loading...')

	useEffect(
		() => {
			signOut().then(() => setMsg("Successfully signed out."))
		}, []
	)

	return (
		<main className="min-h-screen flex flex-col items-center align-center justify-center">
			<span className={`${msg === 'Loading...' ? "text-blue-900" : "text-green-900"} text-sm font-bold p-3 border border-black/20 backdrop-blur shadow rounded-lg`}>
				{msg}
			</span>
		</main>
	)
}

