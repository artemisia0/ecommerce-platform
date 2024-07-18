'use client'

import { Input, Button } from '@/lib/material-ui'
import { signUp } from '@/actions/auth'
import Status from '@/lib/Status'
import { useState } from 'react'


export default function Page() {
	const [statusValue, setStatusValue] = useState<Status | null>(null)

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		if (formData.get('password') !== formData.get('passwordCopy')) {
			setStatusValue({
				statusSuccess: false,
				statusMessage: "Passwords are not the same."
			})
			return;
		}
		signUp(formData.get('username') as string, formData.get('password') as string)
			.then(
				(status: Status) => setStatusValue(status)
			)
			.catch(
				(err) => console.error(err)
			)
	}

	return (
		<main className="min-h-screen flex flex-col items-center justify-center align-center">
			<form onSubmit={onSubmit} className="rounded-lg flex flex-col justify-center items-center align-center p-3 gap-3 border border-black/20 backdrop-blur shadow">
				<Input crossOrigin="" type="text" label="Username" name="username" />
				<Input  crossOrigin="" type="password" label="Password" name="password" />
				<Input crossOrigin=""  type="password" label="Enter password again" name="passwordCopy" />
				{statusValue != null && statusValue.statusMessage.length != 0 &&
					<div className="">
						<span className={`text-sm font-bold ${statusValue.statusSuccess ? 'text-green-900' : 'text-red-900'}`}>
							{statusValue.statusMessage}
						</span>
					</div>
				}
				<Button variant="outlined" type="submit" className="m-3">Sign Up</Button>
			</form>
		</main>
	)
}

