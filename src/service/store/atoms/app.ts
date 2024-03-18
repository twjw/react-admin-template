import { watom } from 'wtbx-react-atom'
import { Locale } from '~i18n'
import { Locale as AntdLocale } from 'antd/es/locale'
import { PickerLocale } from 'antd/es/date-picker/generatePicker/interface'

export const $dayjsLocale = watom(initialLocales<PickerLocale>())
export const $antdLocale = watom(initialLocales<AntdLocale>())

function initialLocales<Dict extends Record<string, any> = {}>(): Record<Locale, Dict> {
	return {
		zh_TW: null as unknown as Dict,
		en: null as unknown as Dict,
	}
}
