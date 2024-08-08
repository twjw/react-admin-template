import {
	Navigate,
	Route,
	Routes as ReactRoutes,
	useLocation,
	useNavigate,
} from 'react-router-dom'
import { createPageRoutes } from '~page-routes'
import { RouteGuard } from '@/component/route/guard.tsx'
import { ReactNode, Suspense, useEffect, useMemo } from 'react'
import { LazyError404 } from '@/component/page/404.tsx'
import { hookInstances } from '@/constant'

function ErrorPageSuspense({ children }: { children: ReactNode }) {
	return <Suspense>{children}</Suspense>
}

function Routes() {
	const location = useLocation()
	hookInstances.navigate = useNavigate()

	useEffect(() => {
		if (hookInstances.resetErrorBoundary) {
			hookInstances.resetErrorBoundary()
			hookInstances.resetErrorBoundary = null
		}
	}, [location])

	return useMemo(
		() => (
			<ReactRoutes>
				{[
					<Route key={'/'} path={'/'} element={<Navigate to={'/login'} replace />} />,
					createPageRoutes({ guard: RouteGuard }),
					<Route
						key={'*'}
						path={'*'}
						element={
							<ErrorPageSuspense>
								<LazyError404 />
							</ErrorPageSuspense>
						}
					/>,
				]}
			</ReactRoutes>
		),
		[],
	)
}

export { Routes }
