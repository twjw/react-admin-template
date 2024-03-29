import {
	createContext,
	Dispatch,
	MouseEvent,
	ReactNode,
	SetStateAction,
	useContext,
	useRef,
	useState,
} from 'react'
import { Popover } from 'antd'
import clsx from 'clsx'

export type MenuItemProps = {
	className?: string
	activeClassName?: string
	path?: string
	element: ReactNode
	children?: ReactNode
	collapsedIcon?: ReactNode
	expandIcon?: ReactNode
	onClick?: (
		ev: MouseEvent<HTMLDivElement>,
		props: MenuItemProps & {
			parent: MenuItemContextRefCurrent | null
		},
	) => void
}

export type MenuItemContextRefCurrent = {
	toggle: boolean
	setToggle: Dispatch<SetStateAction<boolean>>
	props: MenuItemProps | null
	parent: MenuItemContextRefCurrent | null
}

export type MenuItemContext = {
	ref: {
		current: MenuItemContextRefCurrent
	}
} | null

const menuItemContext = createContext<MenuItemContext>(null)

export function MenuItem(props: MenuItemProps) {
	const {
		className,
		activeClassName,
		element,
		collapsedIcon,
		expandIcon,
		children,
		onClick: propClick,
	} = props
	const menuCtx = useContext(menuContext)
	const itemCtx = useContext(menuItemContext)
	const [toggle, setToggle] = useState(false)
	const ref = useRef({
		toggle,
		setToggle,
		props,
		parent: itemCtx?.ref.current || null,
	})

	function onClick(ev: MouseEvent<HTMLDivElement>) {
		if (children != null) setToggle(e => !e)

		if (propClick != null) {
			propClick?.(ev, { ...props, parent: itemCtx?.ref?.current || null })
		}
	}

	ref.current.props = props

	return (
		<menuItemContext.Provider value={{ ref }}>
			<Popover
				placement={'rightTop'}
				content={menuCtx?.collapsed ? children : null}
				color={'#001529'}
			>
				<div className={clsx(className, activeClassName)} onClick={onClick}>
					{element}
					{!menuCtx?.collapsed && children != null && (toggle ? collapsedIcon : expandIcon)}
				</div>
			</Popover>
			{toggle && !menuCtx?.collapsed && children}
		</menuItemContext.Provider>
	)
}

export type MenuProps = {
	className?: string
	collapsed?: boolean
	children?: ReactNode
}

export type MenuContext = {
	collapsed?: boolean
} | null

const menuContext = createContext<MenuContext>(null)

export function Menu({ className, collapsed, children }: MenuProps) {
	const menuContextValue = useRef<MenuContext>(null)

	menuContextValue.current = {
		collapsed,
	}

	return (
		<menuContext.Provider value={menuContextValue.current}>
			<div className={className}>{children}</div>
		</menuContext.Provider>
	)
}
