import { envConfig } from '~env-config'
import { createValueStorage } from 'wtbx-create-value-storage'
import { Locale } from '~i18n'

const name = (name: string) => `${envConfig.vite.storagePrefix}-${name}`

export const storage = {
	locale: createValueStorage<Locale>(name('locale'), 'zh_TW'),
	token: createValueStorage<string | null>(name('token'), null),
	sidebarCollapsed: createValueStorage<boolean | null>(name('sidebar_collapsed'), null),
}
