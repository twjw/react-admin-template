export type Locale = 'zh_TW' | 'en'

export type PageMeta = {
	private?: boolean // 是否要身分驗證的頁面。true: 是；false: 否；default: true
	layout?: boolean // 是否需要 layout。default: true
}
