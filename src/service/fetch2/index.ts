import { createTsFetch, TsFetchTemplate } from '@wymjs/type-safe-fetch'
import { createMockTool } from '@wymjs/type-safe-fetch/tool/mock'
import { createMethodUrlTool } from '@wymjs/type-safe-fetch/tool/method-url'
import { createPathParamsUrlTool } from '@wymjs/type-safe-fetch/tool/path-params-url'
import { createParamsAndBodyParserTool } from '@wymjs/type-safe-fetch/tool/params-and-body-parser'
import { createMergeSameRequestTool } from '@wymjs/type-safe-fetch/tool/merge-same-request'
import { createLogTool } from '@wymjs/type-safe-fetch/tool/log'
import { envConfig } from '~env-config'
import { ApiResponse, MyListenerRequestInit, MyRequestInit } from '@/service/fetch2/type.ts'
import {
	commonApiErrorResponse,
	commonApiResponse,
	passAuthRequest,
	checkApiPermission,
} from '@/service/fetch2/helper/watch.ts'

const isLocal = envConfig.vite.isLocal

const fetch2 = createTsFetch() as unknown as TsFetchTemplate<
	import('@/service/fetch2/api-type/user.ts').Apis,
	MyRequestInit
>

// vite 開發運行環境下支持 @wymjs/vite-mock-apis 的功能
const mockTool = createMockTool()
// 將路徑的方法轉換成 method，如：post:/api/hello
const methodUrlTool = createMethodUrlTool()
// 將路徑參數轉換成匹配的 pathParams key-value
// 比方說：fetch2('/api/user/:id', { pathParams: { id: '1' } })
const pathParamsUrlTool = createPathParamsUrlTool()
// 將 params 轉成 querystring 以及 body 自動轉成字串傳入
const paramsAndBodyParserTool = createParamsAndBodyParserTool()
// 合併相同路徑請求，可以迴圈 call 相同路徑的 api 確認是否只 call 一次 api
const mergeSameRequestTool = createMergeSameRequestTool<
	Error,
	MyListenerRequestInit,
	ApiResponse<any>
>()
// vite 開發運行環境下 log 響應值(可選)
const logTool = createLogTool<Error, MyListenerRequestInit, ApiResponse<any>>()

fetch2.watch.request<MyListenerRequestInit>(req => {
	if (isLocal) mockTool.transform(req)

	req.originUrl = req.url
	mergeSameRequestTool.defer(req.originUrl, req)
	methodUrlTool.transform(req)
	pathParamsUrlTool.transform(req)
	passAuthRequest(req)
	paramsAndBodyParserTool.transform(req)

	return req
})

fetch2.watch.response<
	MyListenerRequestInit,
	Response,
	ApiResponse<any> | Promise<ApiResponse<any>>
>(async (req, res) => {
	checkApiPermission(req, res)
	const _res = await commonApiResponse(req, res)

	if (isLocal) logTool.log(req, _res)
	mergeSameRequestTool.resolve(req.originUrl, _res)

	return _res
})

fetch2.watch.error<Error, MyListenerRequestInit, ApiResponse<any> | Promise<ApiResponse<any>>>(
	async (error, req, res) => {
		const mergeResponse = await mergeSameRequestTool.waiting(req.originUrl, req, error)

		if (mergeResponse !== undefined) return mergeResponse
		if (isLocal) logTool.error(error, req)

		return commonApiErrorResponse(error, req, res)
	},
)

export { fetch2 }
