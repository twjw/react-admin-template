import { sidebarCollapsedAtom } from '@/service/store/atoms/app.ts'

export function toggleSidebar() {
	sidebarCollapsedAtom(e => !e)
}

export function closeSidebar() {
	sidebarCollapsedAtom(true)
}
