'use client'

import { ThemeProvider } from '@material-tailwind/react'
import JotaiProvider from '@/components/JotaiProvider'


export default function Provider(
	{ children }: { children: any }
) {
	return (
		<ThemeProvider>
			<JotaiProvider>
				{ children }
			</JotaiProvider>
		</ThemeProvider>
	)
}


