import { ErrorBoundary } from '@/components/error-boundary.tsx'
import { ReactNode, Suspense, useEffect } from 'react'
import { usePageRoute } from '~page-routes'
import { $userProfile } from '@/service/store/atoms/user.ts'
import { getUserProfile } from '@/service/fetch2/helper/user.ts'
import { LazyError404 } from '@/components/pages/404.tsx'
import { storage } from '@/service/store/storage.ts'

type CommonProps = {
	path: string
	children: ReactNode
}

function RouteContent({ path, children }: CommonProps) {
	const ctx = usePageRoute()
	const metaPrivate = ctx?.meta?.private
	const userProfile = $userProfile.use
	const hasPermission = metaPrivate ? userProfile != null : true

	useEffect(updateProfile, [userProfile, metaPrivate])

	function updateProfile() {
		if (metaPrivate && userProfile == null && storage.token.getItem() != null) getUserProfile()
	}

	return <Suspense>{hasPermission ? children : <LazyError404 />}</Suspense>
}

function RouteGuard({ path, children }: CommonProps) {
	return (
		<ErrorBoundary.Route>
			<RouteContent path={path}>{children}</RouteContent>
		</ErrorBoundary.Route>
	)
}

export { RouteGuard }
