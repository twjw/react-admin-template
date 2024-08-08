import { Profile } from '@/service/fetch2/api-type/user.ts'
import { watom } from 'wtbx-react-atom'

export const userProfileAtom = watom<null | Profile.Response>(null)
