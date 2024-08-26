import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SpawnOptions } from 'node:child_process'
import fs from 'node:fs'
import spawn from 'cross-spawn'
import { bootstrapCac } from './util/cac'
import { ParsedOption } from './type/common'

const SL = path.normalize('/')
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

run()

// 示範代碼，當有改動時就可以刪除這幾行註解，以下為執行 vite 打包
// 可以使用以下指令來嘗試運行代碼
// tsx --tsconfig tsconfig.node.json build-recipe/build.ts --mode production
async function run() {
	console.log('環境變數為：')
	console.log(options)
	const cwd = process.cwd()

	try {
		await fs.promises.access(cwd)
	} catch (error) {
		console.error(error)
		console.error(`[ERROR] 找不到遊戲目錄`)
		process.exit(0)
	}

	try {
		console.log(`[INFO] 開始安裝依賴並打包專案`)
		await spawnAsync('pnpm', ['install'], { cwd })
		await spawnAsync('tsc', [], { cwd })
		await spawnAsync('npx', ['vite', 'build', '--mode', mode!], { cwd })
		console.log(`[INFO] 打包玩成`)
	} catch (error) {
		console.error(error)
		console.error(`[ERROR] 打包失敗`)
		process.exit(0)
	}
}

async function spawnAsync(command: string, args?: readonly string[], options?: SpawnOptions) {
	return new Promise<void>((resolve, reject) => {
		const process = spawn(command, args, options)

		process.stdout?.on('data', function (data) {
			console.log(`${data}`)
		})

		process.stderr?.on('error', function (error) {
			reject(error)
		})

		process.on('close', function (code) {
			if (code !== 0) {
				reject()
				return
			}

			resolve()
		})
	})
}
