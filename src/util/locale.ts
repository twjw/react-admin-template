import { locale, Locale, setLocale } from '~i18n'
import { storage } from '@/service/store/storage.ts'
import { antdLocale } from '@/constant'
import importAntdLocales from '~import-antd-locales'

export const localeDict: Record<Locale, string> = {
	zh_TW: '繁中',
	en: 'English',
}

function updateAntdLocale<K extends keyof typeof antdLocale>(
	key: K,
	locale: Locale,
	moduleLocale: { default: (typeof antdLocale)[K][Locale] },
) {
	antdLocale[key][locale] = moduleLocale.default
}

export async function updateLocale(_locale: Locale) {
	const updateApp = _locale === locale ? () => {} : await setLocale(_locale, false)

	if (antdLocale.configProvider[_locale] == null) {
		const [antdDatePickerLocaleModule, antdLocaleModule] = await importAntdLocales(_locale)
		updateAntdLocale('datePicker', _locale, antdDatePickerLocaleModule)
		updateAntdLocale('configProvider', _locale, antdLocaleModule)
	}

	updateApp?.()
	storage.locale.setItem(_locale)
}
