import { DatePicker } from 'antd'
import { $dayjsLocale } from '@/service/store/atoms/app.ts'
import { locale } from '~i18n'
import type {
	PickerProps,
	PickerPropsWithMultiple,
} from 'antd/es/date-picker/generatePicker/interface'
import type { Dayjs } from 'dayjs'

type LocalePickerBaseProps = PickerPropsWithMultiple<Dayjs, PickerProps<Dayjs>, Dayjs>

function LocaleDatePicker(props: LocalePickerBaseProps) {
	return <DatePicker locale={$dayjsLocale.value[locale]} {...props} />
}

LocaleDatePicker.WeekPicker = function (props) {
	return <DatePicker.WeekPicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['WeekPicker']

LocaleDatePicker.MonthPicker = function (props) {
	return <DatePicker.MonthPicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['MonthPicker']

LocaleDatePicker.YearPicker = function (props) {
	return <DatePicker.YearPicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['YearPicker']

LocaleDatePicker.RangePicker = function (props) {
	return <DatePicker.RangePicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['RangePicker']

LocaleDatePicker.TimePicker = function (props) {
	return <DatePicker.TimePicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['TimePicker']

LocaleDatePicker.QuarterPicker = function (props) {
	return <DatePicker.QuarterPicker locale={$dayjsLocale.value[locale]} {...props} />
} as (typeof DatePicker)['QuarterPicker']

export { LocaleDatePicker }
