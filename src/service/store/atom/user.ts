import { Profile } from '@/service/fetch2/api-type/user.ts'
import { atom } from '@wymjs/react-atom'

export const userProfileAtom = atom<null | Profile.Response>(null)
