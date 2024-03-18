import { ReactNode, useMemo } from 'react'
import { Header } from '@/components/layout/header.tsx'
import { Sidebar } from '@/components/layout/sidebar.tsx'
import { matchPageRoute } from '~page-routes'
import { useLocation } from 'react-router-dom'

function Layout({ children }: { children: ReactNode }) {
	const location = useLocation()
	const ctx = useMemo(() => matchPageRoute(location.pathname), [location.pathname])
	const isShowLayout = ctx?.meta?.layout ?? true

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
