import { watom } from 'wtbx-react-atom'
import { storage } from '@/service/store/storage.ts'
import { breakpoints } from '@/constants'
import { matchBreakpoint } from '@/components/rwd-element'

export const sidebarCollapsedAtom = watom<boolean>(false)
sidebarCollapsedAtom.watch((before, after) => storage.sidebarCollapsed.setItem(after))

export const breakpointAtom = watom<(typeof breakpoints)[number]>(
	matchBreakpoint(breakpoints as unknown as number[]),
)
