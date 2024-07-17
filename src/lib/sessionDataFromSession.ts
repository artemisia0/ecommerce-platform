export default function sessionDataFromSession(session: any) {
	return {
		username: session.username,
		userRoleRank: session.userRoleRank,
	}
}

