'use server'

import { redirect } from 'next/navigation'


export default async function redirectWithSearchParam(pathname: string, searchParams: URLSearchParams, key: string, value: string) {
	searchParams.set(key, value)
	const newURL = pathname + "?" + searchParams.toString()
	console.log("newURL = " + newURL)
	console.log("searchParams = " + searchParams)
	console.log("searchParams.toString() = " + searchParams.toString())
	redirect(newURL)
}

