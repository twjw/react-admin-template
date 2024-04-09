const envConfig = {
	port: 9487,
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
	vite: EnvType['vite'] & { isLocal: boolean }
}
export default envConfig
