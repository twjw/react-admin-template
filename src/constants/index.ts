import { MessageInstance } from 'antd/es/message/interface'
import { NotificationInstance } from 'antd/es/notification/interface'
import { HookAPI } from 'antd/es/modal/useModal'
import { NavigateFunction } from 'react-router-dom'
import { Locale } from '~i18n'
import { Locale as AntdLocale } from 'antd/es/locale'
import { PickerLocale } from 'antd/es/date-picker/generatePicker/interface'

export type ResetErrorBoundary = (...args: any[]) => void

export const hookInstances = {
	navigate: null as NavigateFunction | null,
	message: null as MessageInstance | null,
	modal: null as HookAPI | null,
	notification: null as NotificationInstance | null,
	resetErrorBoundary: null as ResetErrorBoundary | null,
}

export const antdLocale = {
	configProvider: {} as Record<Locale, AntdLocale>,
	datePicker: {} as Record<Locale, PickerLocale>,
}

export const sidebarCollapsedWidth = 80

export const sidebarExpandWidth = 255

export const Breakpoint = {
	xxs: 0,
	xs: 320,
	sm: 480,
	smd: 569,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1600,
}

export const breakpoints = [
	Breakpoint.xs,
	Breakpoint.sm,
	Breakpoint.smd,
	Breakpoint.md,
	Breakpoint.lg,
	Breakpoint.xl,
	Breakpoint.xxl,
] as const
