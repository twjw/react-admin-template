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
			<div className={'py-40 flex items-center'} style={{ paddingLeft: level * 16 }}>
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
				className={
					'fixed left-0 top-0 h-full bg-white b-r-1 b-solid b-light-gray overflow-auto'
				}
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
