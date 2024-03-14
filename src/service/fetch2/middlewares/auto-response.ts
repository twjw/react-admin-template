import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { MyListenerRequestInit } from '@/service/fetch2/api-types/common.ts'

const autoResponse: TsFetchWatchMap<MyListenerRequestInit, any, any, Error> = {
	response(req, res) {
		return res[req.responseType || 'json']()
	},
}

export { autoResponse }
