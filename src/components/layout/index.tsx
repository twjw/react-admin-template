import { ReactNode, useMemo } from 'react'
import { Header } from '@/components/layout/header.tsx'
import { Sidebar } from '@/components/layout/sidebar.tsx'
import { usePageRoute } from '~page-routes'

function Layout({ children }: { children: ReactNode }) {
	const ctx = usePageRoute()
	const isShowLayout = ctx?.meta?.layout

	return useMemo(
		() =>
			isShowLayout ? (
				<div className={'w-full min-h-screen flex'}>
					<Sidebar />
					<div className="flex-1 flex flex-col bg-geekblue1">
						<Header />
						<div className={'flex-1 flex flex-col mx-24 my-12 p-16 bg-white rd-16'}>
							{children}
						</div>
					</div>
				</div>
			) : (
				children
			),
		[isShowLayout, children],
	)
}

export { Layout }
