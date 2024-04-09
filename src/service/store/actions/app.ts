import { $sidebarCollapsed } from '@/service/store/atoms/app.ts'

export function toggleSidebarCollapsed() {
	$sidebarCollapsed(e => !e)
}
