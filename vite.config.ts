import { defineConfig, ProxyOptions } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { mergeEnv } from 'wtbx-merge-env'
import svgr from 'vite-plugin-svgr'
import { createHtmlPlugin } from 'vite-plugin-html'
import { mockApis } from 'wtbx-vite-mock-apis'
import { injectEnv } from 'wtbx-vite-inject-env'
import { autoAlias } from 'wtbx-vite-auto-alias'
import { buildDropLog } from 'wtbx-vite-build-drop-log'
import { pageRoutes } from 'wtbx-vite-react-page-routes'
import path from 'path'
import { i18n } from 'wtbx-vite-react-i18n'
import UnoCSS from 'unocss/vite'
import checker from 'vite-plugin-checker'
import { BASE_FONT_SIZE } from './.config-constants'
import { merge } from 'lodash-es'
import { ClintEnv, EnvMode, EnvType } from './.env'
import { antdLocaleImport } from 'wtbx-vite-antd-locale-import'
import { Locale, PageMeta } from './src/types/common'

const apiPrefix = {
	// 開發
	dev: 'http://dev.com',
	// 測試
	test: 'http://test.com',
}['dev']

// https://vitejs.dev/config/
export default async ({ mode, command }: { mode: EnvMode; command: 'serve' | 'build' }) => {
	const isBuild = command === 'build'
	const envConfig = await mergeEnv<EnvType, EnvMode>({ mode, dirs: [process.cwd()] })
	const clientEnv: ClintEnv = merge(envConfig, {
		vite: { isLocal: !isBuild },
	})

	return defineConfig({
		plugins: [
			react(),
			svgr({
				exclude: '**/public/**/*.svg',
			}),
			createHtmlPlugin({
				minify: true,
				inject: {
					data: {
						title: envConfig.title,
						version: envConfig.version,
						htmlFontSize: `${BASE_FONT_SIZE}px`,
					},
				},
			}),
			mockApis(),
			injectEnv({ env: clientEnv, propNames: ['mode', 'version', 'title', 'vite'] }),
			autoAlias(),
			buildDropLog(),
			pageRoutes<PageMeta>({
				pages: [path.resolve(process.cwd(), 'src/pages')],
				defaultMeta: {
					homeBread: true,
					private: true,
					layout: true,
				},
			}),
			i18n({
				dirs: [path.resolve(process.cwd(), 'src/assets/locales')],
			}),
			antdLocaleImport<Locale>({
				locales: {
					zh_TW: {
						dayjs: 'zh-tw',
						antd: 'zh_TW',
					},
					en: {
						dayjs: 'en',
						antd: 'en_US',
					},
				},
			}),
			UnoCSS(),
			checker({
				typescript: {
					buildMode: isBuild,
				},
			}),
		],
		server: {
			host: '0.0.0.0',
			port: envConfig.port || 5173,
			proxy: {
				...['/api'].reduce<Record<string, ProxyOptions>>(
					(prev, prefix) => (
						(prev[prefix] = {
							target: apiPrefix,
							changeOrigin: true,
						}),
						prev
					),
					{},
				),
			},
		},
	})
}
