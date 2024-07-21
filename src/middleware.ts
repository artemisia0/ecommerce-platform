import { getSession } from '@/actions/session'
import { NextRequest, NextResponse } from 'next/server'
import { userRoleRankAdmin } from '@/lib/userRoleRank'


const routesForAdminOnly = ['/admin']

export default async function middleware(req: NextRequest) {
	const session = await getSession()
	for (let routeForAdminOnly of routesForAdminOnly) {
		if (req?.nextUrl?.pathname?.toString()?.startsWith(routeForAdminOnly)) {
			if (session?.userRoleRank == null
				|| session?.userRoleRank < userRoleRankAdmin) {
				const absoluteUrl = new URL('/', req.nextUrl.origin)
				return NextResponse.redirect(absoluteUrl.toString())
			}
		}
	}
	return NextResponse.next()
}

