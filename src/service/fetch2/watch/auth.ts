import { MyListenerRequestInit } from '@/service/fetch2/type.ts'
import { storage } from '@/service/store/storage.ts'
import { hookInstances } from '@/constants'

export function authRequest(req: MyListenerRequestInit) {
	const token = storage.token.getItem()

	if (token != null) {
		req.headers = {
			...req.headers,
			Authorization: `Bearer ${token}`,
		}
	}

	return req
}

export function authResponse(req: MyListenerRequestInit, res: Response) {
	if (res.status === 403) {
		storage.token.setItem(null)
		hookInstances.navigate?.('/', { replace: true })
	}

	return res
}
