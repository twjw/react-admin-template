import type { TsFetchWatchMap } from 'wtbx-type-safe-fetch'
import { ApiResponse, MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { message } from 'antd'

const autoResponse: TsFetchWatchMap<
	Error,
	MyListenerRequestInit,
	Response,
	Promise<ApiResponse<any>> | ApiResponse<any>
> = {
	async response(req, res) {
		const result = await res[req.responseType || 'json']()
		const success = res.status === 200
		const _message = result?.message

		if (!success) message.error(_message || 'internal server error')

		return {
			success,
			message: _message,
			data: result?.data,
		}
	},
	error(req, error) {
		const _message = 'client logic error'

		message.error(_message)

		return {
			success: false,
			message: _message,
		}
	},
}

export { autoResponse }
