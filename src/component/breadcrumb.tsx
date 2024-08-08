import { usePageRoute } from '~page-routes'
import { Fragment, useMemo } from 'react'
import { t } from '~i18n'
import type { Breadcrumb } from '@/type/common'

export function Breadcrumb() {
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
