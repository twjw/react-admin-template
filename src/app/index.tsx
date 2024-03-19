import { BrowserRouter } from 'react-router-dom'
import { App as I18nApp, locale } from '~i18n'
import { Routes } from '@/app/routes.tsx'
import { App as AntdApp, ConfigProvider } from 'antd'
import { ReactNode, useEffect } from 'react'
import { hookInstances } from '@/constants/injection.ts'
import { $antdLocale, $dayjsLocale } from '@/service/store/atoms/app.ts'
import { storage } from '@/service/store/storage.ts'
import '@/enums/role.ts'

function App() {
	return (
		<BrowserRouter>
			<I18nApp defaultLocale={storage.locale.getItem()}>
				<AntdProvider>
					<Routes />
				</AntdProvider>
			</I18nApp>
		</BrowserRouter>
	)
}

function AntdProvider({ children }: { children: ReactNode }) {
	const dict = $antdLocale.use

	useEffect(lazyAntLocale, [])

	function lazyAntLocale() {
		if (dict[locale] != null) return

		// TODO 之後在用插件優化
		switch (locale) {
			case 'zh_TW':
				Promise.all([
					import('dayjs/locale/zh-tw'),
					import('antd/es/date-picker/locale/zh_TW').then(res =>
						$dayjsLocale({ ...$dayjsLocale.value, zh_TW: res.default }),
					),
					import(`antd/locale/zh_TW`).then(res =>
						$antdLocale({ ...$antdLocale.value, zh_TW: res.default }),
					),
				])
				break
			case 'en':
				Promise.all([
					import('dayjs/locale/en'),
					import('antd/es/date-picker/locale/en_US').then(res =>
						$dayjsLocale({ ...$dayjsLocale.value, en: res.default }),
					),
					import(`antd/locale/en_US`).then(res =>
						$antdLocale({ ...$antdLocale.value, en: res.default }),
					),
				])
				break
		}
	}

	return (
		<ConfigProvider theme={{ cssVar: true }} locale={dict[locale] || dict['zh_TW']}>
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
