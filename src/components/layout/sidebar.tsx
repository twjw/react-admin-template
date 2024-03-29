import { $breakpoint, $sidebarCollapsed } from '@/service/store/atoms/app'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import {
	Breakpoint,
	sidebarCollapsedWidth,
	sidebarExpandWidth,
} from '@/constants'
import { envConfig } from '~env-config'
import { CSSProperties, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { MenuIcon } from '@/components/layout/menu-icon.tsx'
import { Transition } from 'react-transition-group'
import { TransitionStatus } from 'react-transition-group/Transition'
import { useLocation, useNavigate } from 'react-router-dom'

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
							menuCollapsed ? '' : 'px-20',
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
				<MyMenu />
				<div
					className={clsx(
						'c-gray3 text-12 mt-12 pb-12 overflow-hidden whitespace-nowrap ant-menu-width-transition',
						menuCollapsed ? 'text-center' : 'px-20',
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

function MyMenu() {
	const sidebarCollapsed = $sidebarCollapsed.use
	const breakpoint = $breakpoint.use
	const lessEqualsMd = breakpoint <= Breakpoint.md
	const location = useLocation()
	const navigate = useNavigate()
	const menuCollapsed = lessEqualsMd ? false : sidebarCollapsed
	const collapsedItemStyle = menuCollapsed ? { width: 0 } : { width: '100%', padding: '0 6px' }
	const toggleItemClassName = 'flex items-center justify-center cursor-pointer py-8'
	const childItemClassName = clsx(
		'text-15  py-6 c-white opacity-75 cursor-pointer hover:opacity-100',
		menuCollapsed ? 'px-12' : 'pl-24',
	)
	const collapsedIcon = <UpOutlined className={'ml-auto c-white text-16'} />
	const expandIcon = <DownOutlined className={'ml-auto c-white text-16'} />

	function ToggleItemElement({
		Icon,
		text,
	}: {
		Icon: (props: { className?: string }) => ReactNode
		text: string
	}) {
		return (
			<>
				<Icon className={'c-white text-16'} />
				<div
					className={
						'ant-menu-width-transition-half c-white whitespace-nowrap text-16 overflow-hidden'
					}
					style={collapsedItemStyle}
				>
					{text}
				</div>
			</>
		)
	}

	function ChildMenuItem(
		menuItemProps: Omit<MenuItemProps, 'className' | 'onClick' | 'activeClassName'>,
	) {
		function onClick() {
			if (menuItemProps.path) navigate(menuItemProps.path)
		}

		return (
			<MenuItem
				{...menuItemProps}
				className={childItemClassName}
				activeClassName={
					location.pathname === menuItemProps.path ? '!opacity-100 !bg-blue rd-8' : undefined
				}
				onClick={onClick}
			/>
		)
	}

	return (
		<Menu
			collapsed={menuCollapsed}
			className={clsx('flex-1 px-20', menuCollapsed ? '!px-0' : 'overflow-auto')}
		>
			<MenuItem
				className={toggleItemClassName}
				element={<ToggleItemElement Icon={SettingOutlined} text={t('merchantAdmin')} />}
				collapsedIcon={collapsedIcon}
				expandIcon={expandIcon}
			>
				<ChildMenuItem path={'/merchant/material'} element={t('rawMaterialManagement')} />
			</MenuItem>
		</Menu>
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
