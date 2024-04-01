import { KeyofDictionary, t } from '~i18n'
import { sidebarExpandWidth } from '@/constants'

type Menu = {
	dict: KeyofDictionary
	path?: string
	children?: Menu[]
}

const menus: Menu[] = [
	{
		dict: 'homePage',
		path: '/home',
	},
	{
		dict: 'plzEnterPassword',
		path: '/home',
		children: [
			{
				dict: 'homePage',
				path: '/home',
			},
			{
				dict: 'homePage',
				path: '/home',
			},
			{
				dict: 'homePage',
				path: '/home',
			},
			{
				dict: 'plzEnterPassword',
				path: '/home',
				children: [
					{
						dict: 'homePage',
						path: '/home',
					},
					{
						dict: 'homePage',
						path: '/home',
					},
					{
						dict: 'homePage',
						path: '/home',
					},
				],
			},
		],
	},
	{
		dict: 'plzEnterPassword',
		path: '/home',
		children: [
			{
				dict: 'homePage',
				path: '/home',
			},
			{
				dict: 'homePage',
				path: '/home',
				children: [],
			},
		],
	},
]

function Item({ item, level }: { item: Menu; level: number }) {
	return (
		<>
			<div className={'c-white flex items-center'} style={{ paddingLeft: level * 16 }}>
				{t(item.dict)}
			</div>
			{item?.children != null &&
				item.children.map((e, i) => <Item key={i} item={e} level={level + 1} />)}
		</>
	)
}

export function Sidebar() {
	return (
		<>
			<div
				className={'fixed left-0 top-0 h-full bg-ant-dark-menu'}
				style={{ width: sidebarExpandWidth }}
			>
				{menus.map((e, i) => (
					<Item key={i} item={e} level={1} />
				))}
			</div>
			<div style={{ width: sidebarExpandWidth }} />
		</>
	)
}
