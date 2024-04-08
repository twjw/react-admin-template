import { sidebarCollapsedWidth, sidebarExpandWidth } from '@/constants'
import {
	createContext,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import { DownOutlined, HomeOutlined, UpOutlined } from '@ant-design/icons'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { usePageRoute } from '~page-routes'
import { envConfig } from '~env-config'
import styles from './styles.module.css'
import { $sidebarCollapsed } from '@/service/store/atoms/app.ts'
import { type PageRoutes } from 'wtbx-vite-react-page-routes'
import { PageMeta } from '@/types/common'

type SidebarItemProps = {
	className?: string
	childrenClassName?: string
	Icon?: (props: { className?: string }) => ReactNode
	content?: ReactNode
	children?: ReactNode
	to?: string
	onClick?: () => void
}
type SidebarItemContext = {
	collapsed?: boolean
	setCollapsed?: Dispatch<SetStateAction<boolean>>
	childrenTos: Set<string>
	parent?: SidebarItemContext | null
}
const sidebarItemContext = createContext(null as unknown as SidebarItemContext)
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

function SidebarItem({
	className,
	childrenClassName,
	Icon,
	content,
	children,
	to,
	onClick,
}: SidebarItemProps) {
	const { collapsed: sidebarCollapsed, pageRoute, isMouseEnter } = useContext(sidebarContext)
	const context = useContext(sidebarItemContext)
	const childrenWrapRef = useRef<HTMLDivElement>(null)
	const Item = to == null ? 'div' : Link
	const hasChildren = children != null
	const [collapsed, setCollapsed] = hasChildren
		? useState(false)
		: ([] as unknown as [boolean, Dispatch<SetStateAction<boolean>>])
	const [isChildMatchTo, setIsChildMatchTo] = useState(false)
	const isMatchTo = isChildMatchTo || (to != null && pageRoute?.path === to)
	const self = useMemo<SidebarItemContext>(
		() => ({
			content,
			collapsed,
			setCollapsed,
			childrenTos: new Set<string>(),
			parent: context,
		}),
		[],
	)

	useSlideUpDown(childrenWrapRef, collapsed, sidebarChildrenTransitionTimeout)

	useEffect(() => {
		let parent: SidebarItemContext | null | undefined = self?.parent

		if (to != null && parent != null) {
			parent.childrenTos.add(to)
		}

		// 初始化展開對應的 item
		if (isMatchTo) {
			while (parent != null) {
				if (to != null) parent.childrenTos.add(to)

				if (parent.collapsed === false) {
					parent.setCollapsed?.(true)
				}

				parent = parent?.parent
			}
		}
	}, [])

	useEffect(() => {
		setIsChildMatchTo(self.childrenTos.has(pageRoute?.path || ''))
	}, [pageRoute?.path])

	function onClickItem() {
		if (hasChildren) setCollapsed(e => !e)
		onClick?.()
	}

	return (
		<sidebarItemContext.Provider value={self}>
			<Item
				className={clsx(
					'flex items-center py-8 px-12 transition-colors rd-8',
					(hasChildren || onClick != null) && 'cursor-pointer',
					isMatchTo && 'bg-geekblue10',
					styles.sidebarItem,
					className,
				)}
				to={to as any}
				onClick={onClickItem}
			>
				{Icon != null && (
					<Icon
						className={clsx('transition-colors text-14', isMatchTo ? 'c-white' : 'c-gray6')}
					/>
				)}
				{!isMouseEnter && sidebarCollapsed ? null : (
					<div
						className={clsx(
							'transition-colors flex-1 px-8 truncate text-14',
							isMatchTo ? 'c-white' : 'c-gray6',
						)}
					>
						{content}
					</div>
				)}
				{hasChildren &&
					(!isMouseEnter && sidebarCollapsed ? null : collapsed ? (
						<UpOutlined
							className={clsx('transition-colors', isMatchTo ? 'c-white' : 'c-gray6')}
						/>
					) : (
						<DownOutlined
							className={clsx('transition-colors', isMatchTo ? 'c-white' : 'c-gray6')}
						/>
					))}
			</Item>
			{hasChildren ? (
				<div
					ref={childrenWrapRef}
					className={clsx(
						'pl-16 overflow-hidden rd-8 pt-8',
						!isMouseEnter && sidebarCollapsed && 'hidden',
						childrenClassName,
					)}
					style={sidebarDefaultChildrenStyle}
				>
					{children}
				</div>
			) : (
				<div className={'pt-8'} />
			)}
		</sidebarItemContext.Provider>
	)
}

type SidebarContext = {
	collapsed: boolean
	isMouseEnter: boolean
	pageRoute: PageRoutes.PageRoute<PageMeta> | null
}
const sidebarContext = createContext(null as unknown as SidebarContext)

export function Sidebar() {
	const sidebarCollapsed = $sidebarCollapsed.use
	const pageRoute = usePageRoute()
	const [isMouseEnter, setIsMouseEnter] = useState(false)
	const self: SidebarContext = {
		collapsed: sidebarCollapsed,
		isMouseEnter,
		pageRoute,
	}
	const spaceStyle = {
		width: sidebarCollapsed && !isMouseEnter ? sidebarCollapsedWidth : sidebarExpandWidth,
	}

	function onMouseEnter() {
		setIsMouseEnter(true)
	}

	function onMouseLeave() {
		setIsMouseEnter(false)
	}

	return (
		<sidebarContext.Provider value={self}>
			<div
				className={
					'fixed left-0 top-0 h-full bg-white b-r-1 b-solid b-light-gray overflow-auto ant-menu-width-transition'
				}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={spaceStyle}
			>
				<div className="px-12">
					<div
						className={
							'mt-8 mx-8 mb-18 c-gray9 font-bold text-20 overflow-hidden whitespace-nowrap'
						}
						onClick={() => $sidebarCollapsed(e => !e)}
					>
						{envConfig.title}
					</div>

					<SidebarItem Icon={HomeOutlined} content={'上上層'}>
						<SidebarItem content={'首頁1'} to={'/home'} />
						<SidebarItem content={'首頁2'} to={'/home'} />

						<SidebarItem Icon={HomeOutlined} content={'上層'}>
							<SidebarItem content={'首頁3'} to={'/home'} />
							<SidebarItem content={'test1'} to={'/other/test'} />
						</SidebarItem>
					</SidebarItem>

					<SidebarItem content={'首頁5'} to={'/home'} />
					<SidebarItem content={'test2'} to={'/other/test'} />

					<SidebarItem Icon={HomeOutlined} content={'上層'}>
						<SidebarItem content={'首頁7'} to={'/home'} />
						<SidebarItem content={'首頁8'} to={'/home'} />
					</SidebarItem>
				</div>
			</div>
			<div className={'ant-menu-width-transition'} style={spaceStyle} />
		</sidebarContext.Provider>
	)
}
