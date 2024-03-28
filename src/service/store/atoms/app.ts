import { watom } from 'wtbx-react-atom'
import { storage } from '@/service/store/storage.ts'
import { breakpoints } from '@/constants'
import { matchBreakpoint } from '@/components/rwd-element'

export const $sidebarCollapsed = watom<boolean>(false)
$sidebarCollapsed.watch((before, after) => storage.sidebarCollapsed.setItem(after))

export const $breakpoint = watom<(typeof breakpoints)[number]>(
	matchBreakpoint(breakpoints as unknown as number[]),
)
