import { BaseError } from '@/components/pages/error.tsx'
import { lazy } from 'react'

function Error404() {
	return <BaseError code={404} />
}

const LazyError404 = lazy(() => import('@/components/pages/404.tsx'))

export { LazyError404 }
export default Error404
