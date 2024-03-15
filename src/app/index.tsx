import { BrowserRouter } from 'react-router-dom'
import { App as I18nApp, locale } from '~i18n'
import { Routes } from '@/app/routes.tsx'
import { ConfigProvider } from 'antd'

function App() {
	return (
		<BrowserRouter>
			<I18nApp defaultLocale={'zh_TW'}>
				<ConfigProvider theme={{ cssVar: true }} locale={{ locale }}>
					<Routes />
				</ConfigProvider>
			</I18nApp>
		</BrowserRouter>
	)
}

export { App }
