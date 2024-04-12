import { $sidebarCollapsed } from '@/service/store/atoms/app.ts'

export function toggleSidebar() {
	$sidebarCollapsed(e => !e)
}

export function closeSidebar() {
	$sidebarCollapsed(true)
}
