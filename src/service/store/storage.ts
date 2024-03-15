import { envConfig } from '~env-config'
import { createValueStorage } from 'wtbx-create-value-storage'

const name = (name: string) => `${envConfig.vite.storagePrefix}-${name}`

export const storage = {
	token: createValueStorage<string | null>(name('token'), null),
}
