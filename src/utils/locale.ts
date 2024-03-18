import { Locale, setLocale } from '~i18n'
import { storage } from '@/service/store/storage.ts'

export function updateLocale(locale: Locale) {
	setLocale(locale)
	storage.locale.setItem(locale)
}
