import { fetch2 } from '@/service/fetch2'
import { userProfileAtom } from '@/service/store/atom/user.ts'

export async function getUserProfile() {
	const res = await fetch2('mock:user:get:/api/user/profile')

	if (res.success) {
		userProfileAtom(res.data!)
		return res.data!
	}

	return null
}
