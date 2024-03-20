import { DatePicker } from 'antd'
import { locale } from '~i18n'
import type {
	PickerProps,
	PickerPropsWithMultiple,
} from 'antd/es/date-picker/generatePicker/interface'
import type { Dayjs } from 'dayjs'
import { antdLocale } from '@/constants/injection.ts'

type LocalePickerBaseProps = PickerPropsWithMultiple<Dayjs, PickerProps<Dayjs>, Dayjs>

function LocaleDatePicker(props: LocalePickerBaseProps) {
	return <DatePicker locale={antdLocale.datePicker[locale]} {...props} />
}

LocaleDatePicker.WeekPicker = function (props) {
	return <DatePicker.WeekPicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['WeekPicker']

LocaleDatePicker.MonthPicker = function (props) {
	return <DatePicker.MonthPicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['MonthPicker']

LocaleDatePicker.YearPicker = function (props) {
	return <DatePicker.YearPicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['YearPicker']

LocaleDatePicker.RangePicker = function (props) {
	return <DatePicker.RangePicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['RangePicker']

LocaleDatePicker.TimePicker = function (props) {
	return <DatePicker.TimePicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['TimePicker']

LocaleDatePicker.QuarterPicker = function (props) {
	return <DatePicker.QuarterPicker locale={antdLocale.datePicker[locale]} {...props} />
} as (typeof DatePicker)['QuarterPicker']

export { LocaleDatePicker }
