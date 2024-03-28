import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { Apis as UserApis } from '@/service/fetch2/api-types/user.ts'
import {
	ApiResponse,
	MyListenerRequestInit,
	MyRequestInitOther,
} from '@/service/fetch2/type.ts'
import { methodUrlRequest } from 'wtbx-type-safe-fetch/watch/method-url'
import { pathParamsUrlRequest } from 'wtbx-type-safe-fetch/watch/path-params-url'
import { paramsAndBodyParserRequest } from 'wtbx-type-safe-fetch/watch/params-and-body-parser'
import { envConfig } from '~env-config'
import { mockRequest } from 'wtbx-type-safe-fetch/watch/mock'
import { logResponse } from 'wtbx-type-safe-fetch/watch/log'
import {
	autoResponseError,
	autoResponseResponse,
} from '@/service/fetch2/watch/auto-response.ts'
import { authRequest, authResponse } from '@/service/fetch2/watch/auth.ts'

const isLocal = envConfig.vite.isLocal

const fetch2 = tsFetch as unknown as TsFetchTemplate<UserApis, MyRequestInitOther>

fetch2.watch.request(req => {
	if (isLocal) mockRequest(req) // 開發運行環境下支持 mock api
	methodUrlRequest(req) // 將路徑的方法轉換成 method
	pathParamsUrlRequest(req) // 將路徑參數轉換成匹配的 pathParams key-value
	authRequest(req)
	paramsAndBodyParserRequest(req) // 將 params 轉成 qs, body 轉成字串

	return req
})

fetch2.watch.response<
	MyListenerRequestInit,
	Response,
	ApiResponse<any> | Promise<ApiResponse<any>>
>(async (req, res) => {
	authResponse(req, res)
	const _res = await autoResponseResponse(req, res) // 自動將 Response 轉換成值(like: res.json())，並且統一響應格式
	if (isLocal) logResponse(req, _res) // 開發運行環境下 log 響應值

	return _res
})

fetch2.watch.error<Error, MyListenerRequestInit, ApiResponse<any> | Promise<ApiResponse<any>>>(
	(error, req, res) => {
		return autoResponseError(error, req, res)
	},
)

export { fetch2 }
