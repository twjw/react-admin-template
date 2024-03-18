import { $sidebarCollapsed } from '@/components/layout/atoms.ts'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { hookInstances } from '@/constants/injection.ts'

type MenuItem = Required<MenuProps>['items'][number]

const defaultSelectedKeys = [location.pathname]
const defaultOpenKeys = [location.pathname]

function baseItemProps(key: string) {
	return {
		key,
		onClick() {
			hookInstances.navigate?.(key)
		},
	}
}

function Sidebar() {
	const sidebarCollapsed = $sidebarCollapsed.use
	const items: MenuItem[] = [
		{ ...baseItemProps('/home'), label: '首頁', icon: <HomeOutlined /> },
		{
			key: '/other',
			label: '其他',
			icon: <SettingOutlined />,
			children: [{ ...baseItemProps('/other/test'), label: '測試' }],
		},
	]

	return (
		<Menu
			className={'bg-ant-dark-menu h-screen overflow-auto'}
			style={{ width: sidebarCollapsed ? 80 : 255 }}
			defaultSelectedKeys={defaultSelectedKeys}
			defaultOpenKeys={defaultOpenKeys}
			mode="inline"
			theme="dark"
			inlineCollapsed={sidebarCollapsed}
			items={items}
		/>
	)
}

export { Sidebar }
