import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { ApiResponse, MyListenerRequestInit, MyRequestInit } from '@/service/fetch2/type.ts'
import { envConfig } from '~env-config'
import { TsFetchToolMock } from 'wtbx-type-safe-fetch/tools/mock'
import { TsFetchToolLog } from 'wtbx-type-safe-fetch/tools/log'
import { TsFetchToolMergeSameRequest } from 'wtbx-type-safe-fetch/tools/merge-same-request'
import { TsFetchToolMethodUrl } from 'wtbx-type-safe-fetch/tools/method-url'
import { TsFetchToolPathParamsUrl } from 'wtbx-type-safe-fetch/tools/path-params-url'
import { TsFetchToolParamsAndBodyParser } from 'wtbx-type-safe-fetch/tools/params-and-body-parser'
import {
	commonApiErrorResponse,
	commonApiResponse,
} from '@/service/fetch2/watch-tools/response.ts'
import { passAuthRequest, checkApiPermission } from '@/service/fetch2/watch-tools/auth.ts'

const isLocal = envConfig.vite.isLocal

const fetch2 = tsFetch as unknown as TsFetchTemplate<
	import('@/service/fetch2/api-types/user.ts').Apis,
	MyRequestInit
>

// TODO 之後優化為裸奔流
const mock = TsFetchToolMock()
const methodUrl = TsFetchToolMethodUrl()
const pathParamsUrl = TsFetchToolPathParamsUrl()
const paramsAndBodyParser = TsFetchToolParamsAndBodyParser()
const log = TsFetchToolLog<Error, MyListenerRequestInit, ApiResponse<any>>()
const mergeSameRequest = TsFetchToolMergeSameRequest<
	Error,
	MyListenerRequestInit,
	ApiResponse<any>
>()

fetch2.watch.request<MyListenerRequestInit>(req => {
	if (isLocal) mock.transform(req) // 開發運行環境下支持 mock api

	req.originUrl = req.url
	mergeSameRequest.defer(req.originUrl, req) // 合併相同請求

	methodUrl.transform(req) // 將路徑的方法轉換成 method
	pathParamsUrl.transform(req) // 將路徑參數轉換成匹配的 pathParams key-value
	passAuthRequest(req)
	paramsAndBodyParser.transform(req) // 將 params 轉成 qs, body 轉成字串

	return req
})

fetch2.watch.response<
	MyListenerRequestInit,
	Response,
	ApiResponse<any> | Promise<ApiResponse<any>>
>(async (req, res) => {
	checkApiPermission(req, res)
	const _res = await commonApiResponse(req, res) // 自動將 Response 轉換成值(like: res.json())，並且統一響應格式
	if (isLocal) log.log(req, _res) // 開發運行環境下 log 響應值

	mergeSameRequest.resolve(req.originUrl, _res) // 響應相同請求

	return _res
})

fetch2.watch.error<Error, MyListenerRequestInit, ApiResponse<any> | Promise<ApiResponse<any>>>(
	async (error, req, res) => {
		const mergeResponse = await mergeSameRequest.waiting(req.originUrl, req, error)

		if (mergeResponse !== undefined) return mergeResponse
		if (isLocal) log.error(error, req) // 開發運行環境下 log 響應值
		return commonApiErrorResponse(error, req, res)
	},
)

export { fetch2 }
