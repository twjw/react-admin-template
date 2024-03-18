import { Profile } from '@/service/fetch2/api-types/user.ts'
import { watom } from 'wtbx-react-atom'

export const $userProfile = watom<null | Profile.Response>(null)
