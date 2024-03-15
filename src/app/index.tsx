import { BrowserRouter } from 'react-router-dom'
import { App as I18nApp, locale } from '~i18n'
import { Routes } from '@/app/routes.tsx'
import { App as AntdApp, ConfigProvider } from 'antd'
import { ReactNode } from 'react'
import { hookInstances } from '@/constants/injection.ts'

function App() {
	return (
		<BrowserRouter>
			<I18nApp defaultLocale={'zh_TW'}>
				<AntdProvider>
					<Routes />
				</AntdProvider>
			</I18nApp>
		</BrowserRouter>
	)
}

function AntdProvider({ children }: { children: ReactNode }) {
	return (
		<ConfigProvider theme={{ cssVar: true }} locale={{ locale }}>
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
