import { $userProfile } from '@/service/store/atoms/user.ts'

function Page() {
	const userProfile = $userProfile.use

	return <div>{userProfile?.name}</div>
}

export default Page
