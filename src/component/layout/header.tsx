import { envConfig } from '~env-config'
import { Locale, locale, t } from '~i18n'
import { storage } from '@/service/store/storage.ts'
import { Breakpoint, hookInstances } from '@/constant'
import { Popover, Select, Tooltip } from 'antd'
import { userProfileAtom } from '@/service/store/atom/user.ts'
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { localeDict, updateLocale } from '@/util/locale.ts'
import { breakpointAtom, sidebarCollapsedAtom } from '@/service/store/atom/app.ts'
import { closeSidebar, toggleSidebar } from '@/service/store/action/app.ts'
import { useState } from 'react'
import { animated, useSpring } from '@react-spring/web'

function Header() {
	const sidebarCollapsed = sidebarCollapsedAtom.use()
	const breakpoint = breakpointAtom.use()
	const userProfile = userProfileAtom.use()
	const lessEqualsMd = breakpoint <= Breakpoint.md

	function onLogout() {
		storage.token.setItem(null)
		hookInstances.message?.success(t('psucceed', [t('logout')]))
		hookInstances.navigate?.('/login')
	}

	return (
		<>
			{lessEqualsMd && <SidebarMask />}
			<div
				id={'layout-header'}
				className={
					'w-full flex items-center py-8 px-16 bg-white shadow-md sticky top-0 right-0 z-1 <md:(p-0)'
				}
			>
				{lessEqualsMd ? (
					<div className={'px-12 py-8 cursor-pointer'} onClick={toggleSidebar}>
						{sidebarCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
					</div>
				) : null}
				<div className="hidden text-center flex-1 text-18 font-bold c-gray9 <md:(block)">
					{envConfig.title}
				</div>
				<div className={'<md:(w-38)'} />
				<div
					className={
						'ml-auto flex items-center <md:(flex-2 justify-end absolute right-12 top-1/2 -translate-y-1/2)'
					}
				>
					<Popover className={'cursor-pointer'} content={LangPopContent}>
						<div className={'c-gray9 text-14 <md:(text-12)'}>{localeDict[locale]}</div>
					</Popover>
					<div className="ml-8 bg-gray2 h-16px w-1px <md:(ml-6)" />
					{userProfile != null && (
						<div className={'ml-8 c-gray9 text-14 <md:(text-12 ml-6)'}>{userProfile.name}</div>
					)}
					<Tooltip title={t('logout')} placement={'rightBottom'}>
						<LogoutOutlined
							className={'ml-8 cursor-pointer <md:(text-12 ml-4)'}
							onClick={onLogout}
						/>
					</Tooltip>
				</div>
			</div>
		</>
	)
}

function SidebarMask() {
	const sidebarCollapsed = sidebarCollapsedAtom.use()
	const [show, setShow] = useState(sidebarCollapsed)
	const [props, api] = useSpring(
		() => ({
			from: { opacity: sidebarCollapsed ? 1 : 0 },
			to: { opacity: sidebarCollapsed ? 0 : 1 },
			config: {
				duration: 300,
			},
			onStart() {
				if (!sidebarCollapsed) setShow(true)
			},
			onRest() {
				setShow(!sidebarCollapsed)
			},
		}),
		[sidebarCollapsed],
	)

	return (
		show && (
			<animated.div
				className="z-1 fixed left-0 top-0 right-0 bottom-0 bg-[rgba(0,0,0,0.7)]"
				onClick={closeSidebar}
				style={props}
			/>
		)
	)
}

function LangPopContent() {
	return (
		<Select className={'w-100 text-center'} value={locale} onChange={updateLocale}>
			{envConfig.vite.isLocal ? (
				(Object.keys(localeDict) as Locale[]).map(key => (
					<Select.Option key={key} value={key}>
						{localeDict[key]}
					</Select.Option>
				))
			) : (
				<Select.Option value={'zh_TW'}>{localeDict.zh_TW}</Select.Option>
			)}
		</Select>
	)
}

export { Header }
