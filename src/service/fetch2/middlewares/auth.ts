import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { storage } from '@/service/store/storage.ts'
import { hookInstances } from '@/constants'

const auth: TsFetchWatchMap<Error, MyListenerRequestInit, Response, Response> = {
	request(req) {
		const token = storage.token.getItem()

		if (token != null) {
			req.headers = {
				...req.headers,
				Authorization: `Bearer ${token}`,
			}
		}

		return req
	},
	response(req, res) {
		if (res.status === 403) {
			storage.token.setItem(null)
			hookInstances.navigate?.('/', { replace: true })
		}

		return res
	},
}

export { auth }
