import { sidebarCollapsedAtom } from '@/service/store/atom/app.ts'

export function toggleSidebar() {
	sidebarCollapsedAtom(e => !e)
}

export function closeSidebar() {
	sidebarCollapsedAtom(true)
}
