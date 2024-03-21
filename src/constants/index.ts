import { MessageInstance } from 'antd/es/message/interface'
import { NotificationInstance } from 'antd/es/notification/interface'
import { HookAPI } from 'antd/es/modal/useModal'
import { NavigateFunction } from 'react-router-dom'
import { Locale } from '~i18n'
import { Locale as AntdLocale } from 'antd/es/locale'
import { PickerLocale } from 'antd/es/date-picker/generatePicker/interface'

export const hookInstances = {
	navigate: null as NavigateFunction | null,
	message: null as MessageInstance | null,
	modal: null as HookAPI | null,
	notification: null as NotificationInstance | null,
}

export const antdLocale = {
	configProvider: {} as Record<Locale, AntdLocale>,
	datePicker: {} as Record<Locale, PickerLocale>,
}

export const sidebarCollapsedWidth = 80

export const sidebarExpandWidth = 255
