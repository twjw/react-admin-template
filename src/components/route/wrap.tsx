import { ErrorBoundary } from '@/components/error-boundary.tsx'
import { ReactNode, Suspense, useEffect, useMemo } from 'react'
import { matchPageRoute } from '~page-routes'
import { $userProfile } from '@/service/store/atoms/user.ts'
import { getUserProfile } from '@/service/fetch2/helper/user.ts'
import { LazyError404 } from '@/components/pages/404.tsx'
import { useLocation } from 'react-router-dom'
import { storage } from '@/service/store/storage.ts'

type CommonProps = {
	path: string
	children: ReactNode
}

function RouteContent({ path, children }: CommonProps) {
	const location = useLocation()
	const ctx = useMemo(() => matchPageRoute(location.pathname), [location.pathname])
	const metaPrivate = ctx?.meta?.private ?? true
	const userProfile = $userProfile.use

	useEffect(updateProfile, [userProfile, metaPrivate])

	function updateProfile() {
		if (metaPrivate && userProfile == null && storage.token.getItem() != null) getUserProfile()
	}

	return <Suspense>{metaPrivate && userProfile == null ? <LazyError404 /> : children}</Suspense>
}

function RouteWrap({ path, children }: CommonProps) {
	return (
		<ErrorBoundary.Route>
			<RouteContent path={path}>{children}</RouteContent>
		</ErrorBoundary.Route>
	)
}

export { RouteWrap }
