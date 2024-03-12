import { Navigate, Route, Routes as ReactRoutes } from 'react-router-dom'
import { createPageRoutes } from '~page-routes'
import { RouteWrap } from '@/components/route/wrap.tsx'
import { lazy, ReactNode, Suspense, useMemo } from 'react'

const LazyError404 = lazy(() => import('@/components/pages/404.tsx'))

function ErrorPageSuspense({ children }: { children: ReactNode }) {
	return <Suspense fallback={null}>{children}</Suspense>
}

function Routes() {
	return (
		<ReactRoutes>
			<Route path={'/'} element={<Navigate to={'/login'} replace />} />
			{useMemo(() => createPageRoutes({ Wrap: RouteWrap }), [])}
			<Route
				path={'*'}
				element={
					<ErrorPageSuspense>
						<LazyError404 />
					</ErrorPageSuspense>
				}
			/>
		</ReactRoutes>
	)
}

export { Routes }
