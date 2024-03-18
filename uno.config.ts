import { defineConfig, presetIcons, presetUno } from 'unocss'
import { presetRem121 } from 'wtbx-uno-preset-rem-121'
import { BASE_FONT_SIZE } from './.config-constants'
import { presetAntdColorsTheme } from 'wtbx-uno-preset-antd-colors-theme'
import transformerVariantGroup from '@unocss/transformer-variant-group'

enum Breakpoint {
	xxs = 0,
	xs = 320,
	sm = 480,
	smd = 569,
	md = 768,
	lg = 1024,
	xl = 1280,
	xxl = 1600,
}

export default defineConfig({
	presets: [
		presetUno(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		presetAntdColorsTheme() as any,
		presetRem121({ baseFontSize: BASE_FONT_SIZE }) as any,
	],
	transformers: [transformerVariantGroup() as any],
	theme: {
		breakpoints: {
			xxs: `${Breakpoint.xxs}px`,
			xs: `${Breakpoint.xs}px`,
			sm: `${Breakpoint.sm}px`,
			smd: `${Breakpoint.smd}px`,
			md: `${Breakpoint.md}px`,
			lg: `${Breakpoint.lg}px`,
			xl: `${Breakpoint.xl}px`,
			xxl: `${Breakpoint.xxl}px`,
		},
		colors: {
			'ant-dark-menu': 'var(--ant-menu-dark-item-bg)',
			'gray-border': 'rgba(5, 5, 5, 0.06)',
		},
	},
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
