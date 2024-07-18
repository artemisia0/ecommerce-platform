import { getSession } from '@/actions/session'
import sessionDataFromSession from '@/lib/sessionDataFromSession'
import MyProfilePage from '@/components/MyProfilePage'


export default async function Page() {
	const sessionData = sessionDataFromSession(await getSession())
	return (
		<MyProfilePage sessionData={sessionData} />
	)
}

