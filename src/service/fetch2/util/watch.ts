import { ApiResponse, MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { storage } from '@/service/store/storage.ts'
import { hookInstances } from '@/constant'

export function passAuthRequest(req: MyListenerRequestInit) {
	const token = storage.token.getItem()

	if (token != null) {
		req.headers = {
			...req.headers,
			Authorization: `Bearer ${token}`,
		}
	}
}

export function checkApiPermission(req: MyListenerRequestInit, res: Response) {
	if (res.status === 403) {
		storage.token.setItem(null)
		hookInstances.navigate?.('/', { replace: true })
	}
}

/**
 * @desc 自動將 Response 轉換成值(like: res.json())，並且統一響應格式
 */
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
