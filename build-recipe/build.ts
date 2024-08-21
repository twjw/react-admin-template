import { fileURLToPath } from 'node:url'
import { bootstrapCac } from './util/cac'
import { ParsedOption } from './type/common'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const DEFAULT_MODE = 'production'
const cliOptions = [
	{
		cmd: '--mode <string>',
		desc: '環境：development, test, production 之類',
		defaultValue: DEFAULT_MODE,
	} as const,
] as const

type CliOptions = typeof cliOptions
const { options } = bootstrapCac<
	// prettier-ignore
	ParsedOption<CliOptions[0]>
>({
	options: cliOptions,
})

const { mode } = options

;(async function run() {})()
