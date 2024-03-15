import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { ApiResponse, MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { storage } from '@/service/store/storage.ts'

const auth: TsFetchWatchMap<
	Error,
	MyListenerRequestInit,
	Response,
	Promise<ApiResponse<any>> | ApiResponse<any>
> = {
	request(req) {
		const token = storage.token.getItem()

		console.log(token, 123)
		if (token != null) {
			req.headers = {
				...req.headers,
				Authorization: `Bearer ${token}`,
			}
		}

		return req
	},
}

export { auth }
