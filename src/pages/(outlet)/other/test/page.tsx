import { Select } from 'antd'
import { LocaleDatePicker } from '@/components/locale-date-picker.tsx'
import { locale } from '~i18n'
import { updateLocale } from '@/utils/locale.ts'

function Page() {
	return (
		<div>
			<div className={'flex items-center'}>
				<div>切換語系</div>
				<Select placeholder={'test locale change'} value={locale} onChange={updateLocale}>
					<Select.Option value={'zh_TW'}>中文</Select.Option>
					<Select.Option value={'en'}>英文</Select.Option>
				</Select>
				<div>
					<LocaleDatePicker.MonthPicker />
					<LocaleDatePicker />
				</div>
			</div>
		</div>
	)
}

export default Page
