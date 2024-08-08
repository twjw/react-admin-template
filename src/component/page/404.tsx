import { BaseError } from '@/component/page/error.tsx'
import { lazy } from 'react'

function Error404() {
	return <BaseError code={404} />
}

const LazyError404 = lazy(() => import('@/component/page/404.tsx'))

export { LazyError404 }
export default Error404
