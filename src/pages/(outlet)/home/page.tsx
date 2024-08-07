import { userProfileAtom } from '@/service/store/atoms/user.ts'

function Page() {
	const userProfile = userProfileAtom.use()

	return <div>{userProfile?.name}</div>
}

export default Page
