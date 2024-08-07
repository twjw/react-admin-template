import { ReactNode, useMemo } from 'react'
import { Header } from '@/component/layout/header.tsx'
import { usePageRoute } from '~page-routes'
import { Sidebar } from '@/component/layout/sidebar.tsx'

function Layout({ children }: { children: ReactNode }) {
	const ctx = usePageRoute()
	const isShowLayout = ctx?.meta?.layout

	return useMemo(
		() =>
			isShowLayout ? (
				<div className={'w-full min-h-screen flex'}>
					<Sidebar />
					<div className="relative z-0 flex-1 flex flex-col bg-geekblue1">
						<Header />
						<div className={'flex-1 flex flex-col bg-geekblue1 px-24 py-12'}>{children}</div>
					</div>
				</div>
			) : (
				children
			),
		[isShowLayout, children],
	)
}

export { Layout }
