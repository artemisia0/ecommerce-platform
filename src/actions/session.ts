'use server'

import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'


export async function getSession(): Promise<{ [key: string]: any; }> {
	if (process.env.IRON_SESSION_SECRET == null ||
		process.env.IRON_SESSION_COOKIE_NAME == null) {
		console.error("IRON_SESSION_COOKIE_NAME or IRON_SESSION_SECRET not set.")
		process.exit(1)
	}

	const session = await getIronSession(cookies(), {
		password: process.env.IRON_SESSION_SECRET ?? "",
		cookieName: process.env.IRON_SESSION_COOKIE_NAME ?? "",
	})
	return session
}

export async function mutateSession(data: { [key: string]: any; }) {
	const session = await getSession()
	for (let key of Object.keys(data)) {
		session[key] = data[key]
	}
	await session.save()
}

export async function deleteSession() {
	const session = await getSession()
	session.destroy()
}

