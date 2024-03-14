import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { MyListenerRequestInit } from '@/service/fetch2/api-types/common.ts'

const mock: TsFetchWatchMap<MyListenerRequestInit, any, any, Error> = {
	request(req) {
		return req
	},
}

export { mock }
