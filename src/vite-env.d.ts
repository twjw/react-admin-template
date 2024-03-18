/// <reference types="vite/client" />

declare module '~env-config' {
	import type { ClintEnv } from '../.env.ts'
	export const envConfig: ClintEnv
}

declare module '~page-routes' {
	import type { PageMeta } from '@/types/common.ts'
	import { type PageRoutes } from 'wtbx-vite-react-page-routes'

	export const createPageRoutes: PageRoutes.CreatePageRoutes
	export const usePageRoute: PageRoutes.UsePageRute<PageMeta>
	export const matchPageRoute: PageRoutes.MatchPageRoute<PageMeta>
}

declare module '~i18n' {
	import type { I18n } from 'wtbx-vite-i18n'
	import type { RecursiveKeyOf } from 'wtbx-types'

	export type Dictionary = typeof import('@/assets/locales/zh_TW.ts').default
	export type Locale = 'zh_TW'
	export type KeyofDictionary = RecursiveKeyOf<Dictionary>
	export const dictionary: Dictionary
	export const locale: Locale
	export const t: I18n.Translate<Dictionary>
	export const setLocale: I18n.SetLocale<Locale>
	export const App: I18n.App<Locale>
}
