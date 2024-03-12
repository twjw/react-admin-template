const envConfig = {
  port: 9487,
  title: 'React後台模板',
  vite: {}
}

export type EnvType = typeof envConfig
export type EnvMode = 'development' | 'production'
export type ClintEnv = {
  mode: EnvMode
  title: EnvType['title']
  vite: EnvType['vite'] & { mock: boolean }
}
export default envConfig
