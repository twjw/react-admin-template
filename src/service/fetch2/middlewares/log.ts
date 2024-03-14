import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { MyListenerRequestInit } from '@/service/fetch2/api-types/common.ts'

const log: TsFetchWatchMap<MyListenerRequestInit, any, any, Error> = {
	response(req, res) {
		console.log(
			`%c${req.method?.toUpperCase() || 'get'} %c${req.url}`,
			'border: 1px solid green; background-color: green; color: #fff; padding: 0 2px 0 4px;',
			'border: 1px solid green; padding: 0 2px 0 4px;',
			'\n',
			req,
			'\n',
			res,
		)

		return req
	},
	error(req, error) {
		console.warn(
			`%c${req.method?.toUpperCase() || 'get'} %c${req.url}`,
			'border: 1px solid red; background-color: red; color: #fff; padding: 0 2px 0 4px;',
			'border: 1px solid red; padding: 0 2px 0 4px;',
			'\n',
			req,
			'\n',
			error,
		)
		return req
	},
}

export { log }
