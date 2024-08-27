import fs from 'fs'
import path from 'path'
;(async () => {
	await fs.promises.mkdir(path.resolve(process.cwd(), 'node_modules/__my_locale__'), {
		recursive: true,
	})
})()
