declare module '~page-routes' {
	import { type PageRoutes } from 'wtbx-vite-react-page-routes'
	import { PageMeta } from '@/type/common'

	export const createPageRoutes: PageRoutes.CreatePageRoutes
	export const usePageRoute: PageRoutes.UsePageRoute<PageMeta>
	export const matchPageRoute: PageRoutes.MatchPageRoute<PageMeta>
	export const relativeRoutePathMap: PageRoutes.RelativeRoutePathMap
}
