import { atom } from '@wymjs/react-atom'
import { storage } from '@/service/store/storage.ts'
import { breakpoints } from '@/constant'
import { matchBreakpoint } from '@/component/rwd-element'

export const sidebarCollapsedAtom = atom<boolean>(false)
sidebarCollapsedAtom.watch((before, after) => storage.sidebarCollapsed.setItem(after))

export const breakpointAtom = atom<(typeof breakpoints)[number]>(
	matchBreakpoint(breakpoints as unknown as number[]),
)
