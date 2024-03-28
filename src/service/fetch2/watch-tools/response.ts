import { ApiResponse, MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { hookInstances } from '@/constants'

export async function commonApiResponse(req: MyListenerRequestInit, res: Response) {
	const result = await res[req.responseType || 'json']()
	const success = result?.data?.success || res.status === 200
	const _message = result?.message

	if (!success) hookInstances.message?.error(_message || 'internal server error')

	return {
		success,
		message: _message,
		data: result?.data || result,
	}
}

export function commonApiErrorResponse(
	err: Error,
	req: MyListenerRequestInit,
	res: ApiResponse<any> | Promise<ApiResponse<any>>,
) {
	const _message = 'client logic error'

	hookInstances.message?.error(_message)

	return {
		success: false,
		message: _message,
	}
}
