import { locale, Locale, setLocale } from '~i18n'
import { storage } from '@/service/store/storage.ts'
import { antdLocale } from '@/constants/injection.ts'

function updateAntdLocale<K extends keyof typeof antdLocale>(key: K, locale: Locale) {
	return (moduleLocale: { default: (typeof antdLocale)[K][Locale] }) => {
		antdLocale[key][locale] = moduleLocale.default
	}
}

export async function updateLocale(_locale: Locale) {
	const updateApp = _locale === locale ? () => {} : await setLocale(_locale, false)

	if (antdLocale.configProvider[_locale] == null) {
		// TODO 多了在封裝成模塊處理
		switch (_locale) {
			case 'zh_TW':
				await Promise.all([
					import('dayjs/locale/zh-tw'),
					import('antd/es/date-picker/locale/zh_TW').then(updateAntdLocale('dayjs', 'zh_TW')),
					import(`antd/locale/zh_TW`).then(updateAntdLocale('configProvider', 'zh_TW')),
				])
				break
			case 'en':
				await Promise.all([
					import('dayjs/locale/en'),
					import('antd/es/date-picker/locale/en_US').then(updateAntdLocale('dayjs', 'en')),
					import(`antd/locale/en_US`).then(updateAntdLocale('configProvider', 'en')),
				])
				break
		}
	}

	updateApp?.()
	storage.locale.setItem(_locale)
}
