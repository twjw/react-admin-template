import type { KeyofDictionary } from '~i18n'

export type Locale = 'zh_TW' | 'en'

export type Breadcrumb = {
	path?: string
	dict: KeyofDictionary
}

export type PageMeta = {
	private?: boolean // 是否要身分驗證的頁面。true: 是；false: 否；default: true
	layout?: boolean // 是否需要 layout。default: true
	breadcrumbs?: Breadcrumb[] // header 顯示的麵包屑
	homeBread?: boolean // default true，展示首頁麵包屑
	sideType?: string // 用來決定高亮哪個側邊欄的按鈕(多用在內頁想高亮側邊欄的頁面)
}
