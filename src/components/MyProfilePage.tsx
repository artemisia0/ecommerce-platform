'use client'

import userRoleRankToString from '@/lib/userRoleRankToString'


export default function MyProfilePage({ sessionData }: { sessionData: any; }) {
	return (
		<main className="flex flex-col justify-center align-center items-center min-h-screen">
			<div className="flex flex-col gap-3 justify-center items-center align-center border border-black/20 backdrop-blur shadow rounded-lg p-3">
				<span>
					Username: { sessionData.username }
				</span>
				<span>
					Status: { userRoleRankToString(sessionData.userRoleRank) }
				</span>
			</div>
		</main>
	)
}

