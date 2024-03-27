import { $sidebarCollapsed } from '@/service/store/atoms/app'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import {
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { hookInstances, sidebarCollapsedWidth, sidebarExpandWidth } from '@/constants'
import { envConfig } from '~env-config'
import { useMemo } from 'react'
import clsx from 'clsx'

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
	const MenuIcon = sidebarCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined
	const menuWidth = { width: sidebarCollapsed ? sidebarCollapsedWidth : sidebarExpandWidth }
	const items: MenuItem[] = useMemo(
		() => [
			{ ...baseItemProps('/home'), label: '首頁', icon: <HomeOutlined /> },
			{
				key: '/other',
				label: '其他',
				icon: <SettingOutlined />,
				children: [{ ...baseItemProps('/other/test'), label: '測試' }],
			},
		],
		[],
	)

	return (
		<>
			<div className="fixed left-0 top-0 bg-ant-dark-menu h-screen overflow-auto flex flex-col">
				<div
					className={
						'px-28 pt-24 pb-12 overflow-hidden flex items-center justify-center ant-menu-transition'
					}
					style={menuWidth}
				>
					{!sidebarCollapsed && (
						<div className={'c-white font-bold text-18 lh-18 mr-auto truncate'}>
							{envConfig.title}
						</div>
					)}
					<MenuIcon className={'c-white text-18'} onClick={() => $sidebarCollapsed(e => !e)} />
				</div>
				<Menu
					className={'flex-1'}
					style={menuWidth}
					defaultSelectedKeys={defaultSelectedKeys}
					defaultOpenKeys={defaultOpenKeys}
					mode="inline"
					theme="dark"
					inlineCollapsed={sidebarCollapsed}
					items={items}
				/>
				<div
					className={clsx(
						'c-gray3 text-12 mt-12 pb-12 overflow-hidden whitespace-nowrap',
						sidebarCollapsed ? 'text-center' : 'px-28',
					)}
					style={menuWidth}
				>
					{sidebarCollapsed ? '' : 'Version '}
					{envConfig.vite.version}
				</div>
			</div>
			<div className={'ant-menu-transition'} style={menuWidth} />
		</>
	)
}

export { Sidebar }
