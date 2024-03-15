import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetRem121 } from 'wtbx-uno-preset-rem-121'
import { BASE_FONT_SIZE } from './.config-constants'
import { presetAntdColorsTheme } from 'wtbx-uno-preset-antd-colors-theme'

export default defineConfig({
	presets: [
		presetUno(),
		presetAttributify(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		presetAntdColorsTheme() as any,
		presetRem121({ baseFontSize: BASE_FONT_SIZE }) as any,
	],
	transformers: [],
	theme: {},
	shortcuts: [
		['flex-center', 'flex justify-center items-center'],
		['wrap-main', ''],
	],
	rules: [
		['bgc-none', { background: 'initial' }],
		[
			/^shadow-\[(.+)_(.+)]$/,
			([, location, color], { theme }) => {
				const _color = (theme as { colors?: Record<string, string> })?.colors?.[color] || color
				return {
					'box-shadow': `${location.replace(/_/g, ' ')} ${_color}`,
				}
			},
		],
		[
			/^drop-shadow-\[(.+)_(.+)]$/,
			([, location, color], { theme }) => {
				const _color = (theme as { colors?: Record<string, string> })?.colors?.[color] || color
				return {
					filter: `drop-shadow(${location.replace(/_/g, ' ')} ${_color})`,
				}
			},
		],
	],
})
