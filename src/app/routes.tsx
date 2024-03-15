import { Navigate, Route, Routes as ReactRoutes, useNavigate } from 'react-router-dom'
import { createPageRoutes } from '~page-routes'
import { RouteWrap } from '@/components/route/wrap.tsx'
import { ReactNode, Suspense, useMemo } from 'react'
import { LazyError404 } from '@/components/pages/404.tsx'
import { hookInstances } from '@/constants/injection.ts'

function ErrorPageSuspense({ children }: { children: ReactNode }) {
	return <Suspense>{children}</Suspense>
}

function Routes() {
	return <ReactRoutes>{routes()}</ReactRoutes>
}

function routes() {
	hookInstances.navigate = useNavigate()

	return [
		<Route key={'/'} path={'/'} element={<Navigate to={'/login'} replace />} />,
		useMemo(() => createPageRoutes({ Wrap: RouteWrap }), []),
		<Route
			key={'*'}
			path={'*'}
			element={
				<ErrorPageSuspense>
					<LazyError404 />
				</ErrorPageSuspense>
			}
		/>,
	]
}

export { Routes }
