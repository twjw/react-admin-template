import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'
import { presetRem } from 'wtbx-uno-preset-rem'
import {BASE_FONT_SIZE} from "./.config-constants";

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
    presetRem({ baseFontSize: BASE_FONT_SIZE }) as any,
  ],
  transformers: [],
  theme: {},
  shortcuts: [],
  rules: [],
})
