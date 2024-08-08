import { MyListenerRequestInit } from '@/service/fetch2/type.ts'
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
