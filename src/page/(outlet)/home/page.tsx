import { userProfileAtom } from '@/service/store/atom/user.ts'

function Page() {
	const userProfile = userProfileAtom.use()

	return <div>{userProfile?.name}</div>
}

export default Page
