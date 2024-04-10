import { Breakpoint, sidebarCollapsedWidth, sidebarExpandWidth } from '@/constants'
import { ReactNode, RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { envConfig } from '~env-config'
import { $breakpoint, $sidebarCollapsed } from '@/service/store/atoms/app.ts'
import { DownOutlined, HomeOutlined, SettingOutlined, UpOutlined } from '@ant-design/icons'
import { KeyofDictionary, t } from '~i18n'
import clsx from 'clsx'
import mitt, { Handler } from 'mitt'
import { usePageRoute } from '~page-routes'
import { PageMeta } from '@/types/common'
import { Link } from 'react-router-dom'
import { toggleSidebarCollapsed } from '@/service/store/actions/app.ts'

type Menu = {
	key?: string // key 沒填 path 來補，兩個要填一個，且要唯一
	path?: string
	icon?: (props: { className?: string }) => ReactNode
	label: KeyofDictionary
	children?: Menu[]
}

type SidebarItemProps = {
	item: Menu
	sidebarCollapsed: boolean
	isMouseEnter: boolean
	level?: number
}

const sidebarEmitter = mitt()
const sidebarChildrenTransitionTimeout = 300
const sidebarDefaultChildrenStyle = {
	transition: `height ${sidebarChildrenTransitionTimeout}ms cubic-bezier(0.2, 0, 0, 1) 0s`,
	height: 0,
}

function useSlideUpDown(domRef: RefObject<HTMLElement>, collapsed: boolean, timeout = 300) {
	useEffect(() => {
		const dom = domRef.current
		let delayTimeout: NodeJS.Timeout | undefined

		if (dom) {
			if (collapsed) {
				dom.style.height = 'auto'
				const wrapHeight = dom.clientHeight
				dom.style.height = '0'
				setTimeout(() => (dom.style.height = wrapHeight + 'px'))
				delayTimeout = setTimeout(() => {
					dom.style.height = ''
					delayTimeout = undefined
				}, timeout)
			} else {
				dom.style.height = dom.clientHeight + 'px'
				setTimeout(() => (dom.style.height = '0'))
			}
		}

		return () => {
			if (delayTimeout !== undefined) {
				if (dom != null) dom.style.height = ''
				clearTimeout(delayTimeout)
			}
		}
	}, [collapsed])
}

function SidebarItem({ item, sidebarCollapsed, isMouseEnter, level = 1 }: SidebarItemProps) {
	const [collapsed, setCollapsed] = useState(false)
	const [active, setActive] = useState(false)
	const hasChildren = item.children != null && item.children.length > 0
	const Item = item.path == null ? 'div' : Link
	const childrenWrapRef = useRef<HTMLDivElement>(null)

	useSlideUpDown(childrenWrapRef, collapsed, sidebarChildrenTransitionTimeout)

	useEffect(() => {
		const type = item.key || item.path

		if (type) {
			const handler: Handler<any> = (active: boolean) => {
				setActive(active)
				if (hasChildren && active) setCollapsed(true)
			}

			sidebarEmitter.on(type, handler)
			return () => sidebarEmitter.off(type, handler)
		}
	}, [])

	return (
		<div>
			<Item
				className={clsx(
					'flex items-center justify-center py-8 px-12 transition-colors rd-8',
					hasChildren && 'cursor-pointer',
					active && (hasChildren ? '' : 'bg-geekblue10'),
					hasChildren
						? 'hover:c-geekblue6 [&_*]:hover:c-geekblue6'
						: 'hover:bg-geekblue10 [&_*]:hover:c-white',
				)}
				onClick={() => setCollapsed(e => !e)}
				style={{ paddingLeft: level * 16 }}
				to={item.path as any}
			>
				{item.icon != null && (
					<item.icon
						className={clsx(
							'transition-colors text-14',
							active ? (hasChildren ? 'c-geekblue6' : 'c-white') : 'c-gray6',
							sidebarCollapsed && 'py-6',
						)}
					/>
				)}
				{!isMouseEnter && sidebarCollapsed ? null : (
					<div
						className={clsx(
							'transition-colors flex-1 px-8 truncate text-14',
							active ? (hasChildren ? 'c-geekblue6' : 'c-white') : 'c-gray6',
						)}
					>
						{t(item.label)}
					</div>
				)}
				{hasChildren &&
					(!isMouseEnter && sidebarCollapsed ? null : collapsed ? (
						<UpOutlined
							className={clsx(
								'transition-colors',
								active ? (hasChildren ? 'c-geekblue6' : 'c-white') : 'c-gray6',
							)}
						/>
					) : (
						<DownOutlined
							className={clsx(
								'transition-colors',
								active ? (hasChildren ? 'c-geekblue6' : 'c-white') : 'c-gray6',
							)}
						/>
					))}
			</Item>
			{hasChildren ? (
				<div
					ref={childrenWrapRef}
					className={clsx(
						'overflow-hidden rd-8 pt-8',
						!isMouseEnter && sidebarCollapsed && 'hidden',
					)}
					style={sidebarDefaultChildrenStyle}
				>
					{item.children!.map(e => (
						<SidebarItem
							key={e.key || e.path}
							item={e}
							sidebarCollapsed={sidebarCollapsed}
							isMouseEnter={isMouseEnter}
							level={level + 1}
						/>
					))}
				</div>
			) : (
				<div className={'pt-8'} />
			)}
		</div>
	)
}

// 發送消息給當事人與其老媽
function recursiveEmitActive(
	path: string,
	meta: PageMeta | undefined,
	menuList: Menu[],
	typeList: string[] | undefined = undefined,
) {
	for (let i = 0; i < menuList.length; i++) {
		const menu = menuList[i]
		const type = (menu.key || menu.path) as string
		const _typeList = typeList === undefined ? [] : typeList

		if (path === type || meta?.sideType === type) {
			for (let j = 0; j < _typeList.length; j++) {
				sidebarEmitter.emit(_typeList[j], true)
			}
			sidebarEmitter.emit(type, true)
			return true
		} else if (menu.children?.length) {
			_typeList.push(type)
			const isFind = recursiveEmitActive(path, meta, menu.children, _typeList)
			if (isFind) return true
		}
	}

	return false
}

// 清空所有 menu 的 active 狀態
function recursiveEmitAllClear(menuList: Menu[]) {
	for (let i = 0; i < menuList.length; i++) {
		const menu = menuList[i]
		sidebarEmitter.emit((menu.key || menu.path) as string, false)
		if (menu.children?.length) {
			recursiveEmitAllClear(menu.children)
		}
	}
}

export function Sidebar() {
	const sidebarCollapsed = $sidebarCollapsed.use
	const breakpoint = $breakpoint.use
	const lessEqualsXl = breakpoint <= Breakpoint.xl
	const lessEqualsMd = breakpoint <= Breakpoint.md
	const sideCollapsed = lessEqualsMd ? false : lessEqualsXl || sidebarCollapsed
	const [isMouseEnter, setIsMouseEnter] = useState(false)
	const pageRoute = usePageRoute()
	const menuList: Menu[] = useMemo(
		() => [
			{
				path: '/home',
				icon: HomeOutlined,
				label: 'homePage',
			},
			{
				key: 'other',
				icon: SettingOutlined,
				label: 'other' as any,
				children: [
					{
						key: 'casd',
						path: '/home',
						label: 'homePage',
					},
					{
						key: 'aaa',
						path: '/other/test',
						label: 'test' as any,
					},
					{
						key: 'other2',
						label: 'other2' as any,
						children: [
							{
								path: '/other/test',
								label: 'test2' as any,
							},
						],
					},
				],
			},
		],
		[],
	)

	useEffect(() => {
		const { path, meta } = pageRoute || {}
		if (path) {
			recursiveEmitAllClear(menuList)
			recursiveEmitActive(path, meta, menuList)
		}
	}, [menuList, pageRoute?.path])

	function onMouseEnter() {
		setIsMouseEnter(true)
	}

	function onMouseLeave() {
		setIsMouseEnter(false)
	}

	return (
		<>
			<div
				className={
					'fixed left-0 bottom-0 h-full bg-white b-r-1 b-solid b-light-gray overflow-auto ant-menu-width-transition z-1 <md:(ant-menu-transform-transition pt-12)'
				}
				onMouseEnter={lessEqualsMd ? undefined : onMouseEnter}
				onMouseLeave={lessEqualsMd ? undefined : onMouseLeave}
				style={{
					width: sideCollapsed && !isMouseEnter ? sidebarCollapsedWidth : sidebarExpandWidth,
					height: lessEqualsMd
						? `calc(100% - ${document.querySelector('#layout-header')?.clientHeight}px)`
						: undefined,
					transform: lessEqualsMd
						? sidebarCollapsed
							? 'translateX(-100%)'
							: 'translateX(0)'
						: undefined,
				}}
			>
				<div className="px-12">
					{lessEqualsMd ? null : (
						<div className="flex items-center justify-between mt-8 mx-8 mb-18">
							<div className={'c-gray9 font-bold text-20 overflow-hidden whitespace-nowrap'}>
								{envConfig.title}
							</div>
							{lessEqualsXl
								? null
								: (sidebarCollapsed ? isMouseEnter : true) && (
										<div
											className={
												'inline-flex items-center justify-center w-18 h-18 b-solid b-geekblue10 b-2 rd-1/2 cursor-pointer'
											}
											onClick={toggleSidebarCollapsed}
										>
											{!sidebarCollapsed && (
												<div className={'w-6 h-6 b-solid b-geekblue10 b-2 rd-1/2'} />
											)}
										</div>
									)}
						</div>
					)}

					{useMemo(
						() =>
							menuList.map(e => (
								<SidebarItem
									key={e.key || e.path}
									item={e}
									sidebarCollapsed={sideCollapsed}
									isMouseEnter={isMouseEnter}
								/>
							)),
						[sideCollapsed, isMouseEnter],
					)}
				</div>
			</div>
			{lessEqualsMd ? null : (
				<div
					className={'ant-menu-width-transition'}
					style={{
						width: sideCollapsed ? sidebarCollapsedWidth : sidebarExpandWidth,
					}}
				/>
			)}
		</>
	)
}
