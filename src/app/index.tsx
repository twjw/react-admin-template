import { BrowserRouter } from 'react-router-dom'
import { App as I18nApp, locale } from '~i18n'
import { Routes } from '@/app/routes.tsx'
import { App as AntdApp, ConfigProvider } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { antdLocale, breakpoints, hookInstances } from '@/constants'
import { storage } from '@/service/store/storage.ts'
import { Locale } from 'antd/es/locale'
import { updateLocale } from '@/utils/locale.ts'
import { useRwd } from '@/components/rwd-element'
import { $breakpoint } from '@/service/store/atoms/app.ts'

function App() {
	return (
		<BrowserRouter>
			<I18nApp defaultLocale={storage.locale.getItem()}>
				<AntdProvider>
					<Routes />
				</AntdProvider>
			</I18nApp>
			<BreakpointListener />
		</BrowserRouter>
	)
}

function BreakpointListener() {
	const [breakpoint] = useRwd(breakpoints as unknown as number[])

	useEffect(() => {
		$breakpoint(breakpoint)
	}, [breakpoint])

	return null
}

function AntdProvider({ children }: { children: ReactNode }) {
	const [configLocale, setConfigLocale] = useState<Locale | null>(null)

	useEffect(initLocale, [])

	function initLocale() {
		updateLocale(locale).then(() => {
			setConfigLocale(antdLocale.configProvider[locale])
		})
	}

	if (configLocale == null) return null

	return (
		<ConfigProvider theme={{ cssVar: true }} locale={antdLocale.configProvider[locale]}>
			<AntdApp>
				<AntdChildren>{children}</AntdChildren>
			</AntdApp>
		</ConfigProvider>
	)
}

function AntdChildren({ children }: { children: ReactNode }) {
	const antdAppUtils = AntdApp.useApp()

	hookInstances.message = antdAppUtils.message
	hookInstances.modal = antdAppUtils.modal
	hookInstances.notification = antdAppUtils.notification

	return children
}

export { App }
