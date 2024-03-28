import { $breakpoint, $sidebarCollapsed } from '@/service/store/atoms/app'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import {
	Breakpoint,
	hookInstances,
	sidebarCollapsedWidth,
	sidebarExpandWidth,
} from '@/constants'
import { envConfig } from '~env-config'
import { CSSProperties, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { MenuIcon } from '@/components/layout/menu-icon.tsx'
import { Transition } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'

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
	const breakpoint = $breakpoint.use
	const lessEqualsXl = breakpoint <= Breakpoint.xl
	const lessEqualsMd = breakpoint <= Breakpoint.md
	const isHideLogo = lessEqualsMd ? false : lessEqualsXl
	const menuCollapsed = lessEqualsMd ? false : lessEqualsXl || sidebarCollapsed
	const menuWidth = { width: menuCollapsed ? sidebarCollapsedWidth : sidebarExpandWidth }
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
			{lessEqualsMd ? null : <div className={'ant-menu-width-transition'} style={menuWidth} />}
			<Mask in={lessEqualsMd && !sidebarCollapsed} />
			<div
				className="fixed left-0 top-0 bg-ant-dark-menu h-screen overflow-auto flex flex-col z-1 <md:(ant-menu-transform-transition)"
				style={
					lessEqualsMd
						? { transform: sidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)' }
						: undefined
				}
			>
				{isHideLogo ? (
					<div className={'h-4'} />
				) : (
					<div
						className={clsx(
							'pt-24 pb-12 overflow-hidden flex items-center justify-center ant-menu-width-transition',
							menuCollapsed ? '' : 'pl-28 pr-20',
						)}
						style={menuWidth}
					>
						{!menuCollapsed && (
							<div className={'c-white font-bold text-18 lh-18 mr-auto truncate'}>
								{envConfig.title}
							</div>
						)}
						{lessEqualsMd ? null : <MenuIcon className={'c-white'} />}
					</div>
				)}
				<Menu
					className={'flex-1'}
					style={menuWidth}
					defaultSelectedKeys={defaultSelectedKeys}
					defaultOpenKeys={defaultOpenKeys}
					mode="inline"
					theme="dark"
					inlineCollapsed={menuCollapsed}
					items={items}
				/>
				<div
					className={clsx(
						'c-gray3 text-12 mt-12 pb-12 overflow-hidden whitespace-nowrap ant-menu-width-transition',
						menuCollapsed ? 'text-center' : 'pl-28 pr-20',
					)}
					style={menuWidth}
				>
					{menuCollapsed ? '' : 'Version '}
					{envConfig.vite.version}
				</div>
			</div>
		</>
	)
}

function Mask({ in: inProp, duration = 300 }: { in: boolean; duration?: number }) {
	const [styles] = useState(() => ({
		default: {
			transition: `opacity ${duration}ms ease-in-out`,
			opacity: 0,
		},
		transition: {
			entering: { opacity: 0.7 },
			entered: { opacity: 0.7 },
			exiting: { opacity: 0 },
			exited: { opacity: 0 },
		} as Record<TransitionStatus, CSSProperties>,
	}))
	const nodeRef = useRef(null)

	return (
		<Transition nodeRef={nodeRef} in={inProp} timeout={duration} unmountOnExit>
			{state => (
				<div
					ref={nodeRef}
					className={'fixed left-0 top-0 w-full h-full bg-black z-1'}
					style={{
						...styles.default,
						...styles.transition[state],
					}}
					onClick={() => $sidebarCollapsed(true)}
				/>
			)}
		</Transition>
	)
}

export { Sidebar }
