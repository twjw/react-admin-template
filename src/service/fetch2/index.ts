import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { ApiResponse, MyListenerRequestInit, MyRequestInit } from '@/service/fetch2/type.ts'
import { envConfig } from '~env-config'
import { TsFetchToolMock } from 'wtbx-type-safe-fetch/tools/mock'
import { TsFetchToolLog } from 'wtbx-type-safe-fetch/tools/log'
import { TsFetchToolMergeSameRequest } from 'wtbx-type-safe-fetch/tools/merge-same-request'
import { TsFetchToolMethodUrl } from 'wtbx-type-safe-fetch/tools/method-url'
import { TsFetchToolPathParamsUrl } from 'wtbx-type-safe-fetch/tools/path-params-url'
import { TsFetchToolParamsAndBodyParser } from 'wtbx-type-safe-fetch/tools/params-and-body-parser'
import { commonApiErrorResponse, commonApiResponse } from '@/service/fetch2/helper/watch.ts'
import { passAuthRequest, checkApiPermission } from '@/service/fetch2/helper/watch.ts'

const isLocal = envConfig.vite.isLocal

const fetch2 = tsFetch as unknown as TsFetchTemplate<
	import('@/service/fetch2/api-type/user.ts').Apis,
	MyRequestInit
>

// 開發運行環境下支持 mock api
const toolMock = TsFetchToolMock()
// 將路徑的方法轉換成 method
const toolMethodUrl = TsFetchToolMethodUrl()
// 將路徑參數轉換成匹配的 pathParams key-value
const toolPathParamsUrl = TsFetchToolPathParamsUrl()
// 將 params 轉成 qs, body 轉成字串
const toolParamsAndBodyParser = TsFetchToolParamsAndBodyParser()
// 開發運行環境下 log 響應值
const toolLog = TsFetchToolLog<Error, MyListenerRequestInit, ApiResponse<any>>()
// 合併相同請求
const toolMergeSameRequest = TsFetchToolMergeSameRequest<
	Error,
	MyListenerRequestInit,
	ApiResponse<any>
>()

fetch2.watch.request<MyListenerRequestInit>(req => {
	if (isLocal) toolMock.transform(req)

	req.originUrl = req.url
	toolMergeSameRequest.defer(req.originUrl, req)
	toolMethodUrl.transform(req)
	toolPathParamsUrl.transform(req)
	passAuthRequest(req)
	toolParamsAndBodyParser.transform(req)

	return req
})

fetch2.watch.response<
	MyListenerRequestInit,
	Response,
	ApiResponse<any> | Promise<ApiResponse<any>>
>(async (req, res) => {
	checkApiPermission(req, res)
	const _res = await commonApiResponse(req, res)

	if (isLocal) toolLog.log(req, _res)
	toolMergeSameRequest.resolve(req.originUrl, _res)

	return _res
})

fetch2.watch.error<Error, MyListenerRequestInit, ApiResponse<any> | Promise<ApiResponse<any>>>(
	async (error, req, res) => {
		const mergeResponse = await toolMergeSameRequest.waiting(req.originUrl, req, error)

		if (mergeResponse !== undefined) return mergeResponse
		if (isLocal) toolLog.error(error, req)

		return commonApiErrorResponse(error, req, res)
	},
)

export { fetch2 }
