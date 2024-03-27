import { envConfig } from '~env-config'
import { Locale, locale, t } from '~i18n'
import { storage } from '@/service/store/storage.ts'
import { hookInstances } from '@/constants'
import { usePageRoute } from '~page-routes'
import { Popover, Select } from 'antd'
import { $userProfile } from '@/service/store/atoms/user.ts'
import { LogoutOutlined } from '@ant-design/icons'
import { localeDict, updateLocale } from '@/utils/locale.ts'
import { Fragment, useMemo } from 'react'
import type { Breadcrumb } from '@/types/common'

function Header() {
	const userProfile = $userProfile.use

	function onLogout() {
		storage.token.setItem(null)
		hookInstances.message?.success(t('psucceed', [t('logout')]))
		hookInstances.navigate?.('/login')
	}

	return (
		<div
			className={
				'w-full flex items-center py-8 px-24 bg-white b-b-1 b-solid b-gray1 sticky top-0 right-0 z-1'
			}
		>
			<Breadcrumb />
			<div className={'ml-auto flex items-center'}>
				<Popover className={'cursor-pointer'} content={LangPopContent}>
					{localeDict[locale]}
				</Popover>
				<div className="ml-8 bg-gray2 h-16px w-1px" />
				{userProfile != null && (
					<div className={'ml-8 c-gray9 text-14'}>{userProfile.name}</div>
				)}
				<LogoutOutlined className={'ml-8 cursor-pointer'} onClick={onLogout} />
			</div>
		</div>
	)
}

function LangPopContent() {
	return (
		<Select className={'w-100 text-center'} value={locale} onChange={updateLocale}>
			{envConfig.vite.isLocal ? (
				(Object.keys(localeDict) as Locale[]).map(key => (
					<Select.Option key={key} value={key}>
						{localeDict[key]}
					</Select.Option>
				))
			) : (
				<Select.Option value={'zh_TW'}>{localeDict.zh_TW}</Select.Option>
			)}
		</Select>
	)
}

function Breadcrumb() {
	const ctx = usePageRoute()
	const breadcrumbs = useMemo(() => {
		if (!ctx?.meta) return []

		const breadcrumbs: Breadcrumb[] = []

		if (ctx.meta.homeBread) {
			breadcrumbs.push({
				path: '/home',
				dict: 'homePage',
			})
		}

		if (ctx.meta.breadcrumbs?.length) return breadcrumbs.concat(ctx.meta.breadcrumbs)

		return breadcrumbs
	}, [ctx?.path])

	if (!ctx?.meta?.breadcrumbs?.length) return null

	return breadcrumbs.map((e, i) => {
		return (
			<Fragment key={i}>
				{i > 0 && <span className={'text-14 c-gray4 mx-4'}>/</span>}
				{e.path == null ? (
					<div className={'text-14 c-gray4'}>{t(e.dict)}</div>
				) : (
					<a className={'text-14 c-blue'} href={e.path}>
						{t(e.dict)}
					</a>
				)}
			</Fragment>
		)
	})
}

export { Header }
