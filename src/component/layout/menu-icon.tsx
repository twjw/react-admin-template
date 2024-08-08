import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { sidebarCollapsedAtom } from '@/service/store/atom/app.ts'
import clsx from 'clsx'

export type MenuProps = {
	className?: string
	collapsed?: boolean
}

export function MenuIcon({ className, collapsed }: MenuProps) {
	const sidebarCollapsed = sidebarCollapsedAtom.use()
	const _collapsed = collapsed === undefined ? sidebarCollapsed : collapsed
	const Component = _collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
	return (
		<Component
			className={clsx('text-18 <md:(text-14)', className)}
			onClick={() => sidebarCollapsedAtom(e => !e)}
		/>
	)
}
