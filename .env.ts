import { execSync } from 'child_process'
import dayjs from 'dayjs'

function version() {
	const tag = execSync('git tag --contains HEAD')?.toString()
	const commitId = execSync('git rev-parse HEAD')?.toString()

	return tag
		? `v${tag.trim()}`
		: `v_${commitId.substring(0, 8)}_${dayjs(Date.now()).format('MMDDHHmm')}`
}

const envConfig = {
	port: 9487,
	version: version(),
	title: '後台模板',
	vite: {
		storagePrefix: 'rat', // 緩存前綴
		username: 'MANAGER',
		password: '1234',
	},
}

export type EnvType = typeof envConfig
export type EnvMode = 'development' | 'production'
export type ClintEnv = {
	mode: EnvMode
	title: EnvType['title']
	version: EnvType['version']
	vite: EnvType['vite'] & { isLocal: boolean }
}
export default envConfig
