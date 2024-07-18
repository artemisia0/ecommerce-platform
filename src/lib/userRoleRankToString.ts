export default function userRoleRankToString(rank: number) {
	if (rank === 0) {
		return 'User'
	} else if (rank === 1000) {
		return 'Manager'
	} else if (rank === 2000) {
		return 'Admin'
	} else if (rank === 3000) {
		return 'CEO'
	}
	return 'Unknown'
}
