const envConfig = {
	port: 9487,
	title: 'React 後台模板',
	vite: {
		storagePrefix: 'rat', // 緩存前綴
		username: 'admin',
		password: '147147',
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
