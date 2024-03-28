import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { Apis as UserApis } from '@/service/fetch2/api-types/user.ts'
import {
	autoResponseError,
	autoResponseResponse,
} from '@/service/fetch2/watch/auto-response.ts'
import { ApiResponse, MyListenerRequestInit, MyRequestInit } from '@/service/fetch2/type.ts'
import { envConfig } from '~env-config'
import { authRequest, authResponse } from '@/service/fetch2/watch/auth.ts'
import { TsFetchToolMock } from 'wtbx-type-safe-fetch/tools/mock'
import { TsFetchToolLog } from 'wtbx-type-safe-fetch/tools/log'
import { TsFetchToolMergeSameRequest } from 'wtbx-type-safe-fetch/tools/merge-same-request'
import { TsFetchToolMethodUrl } from 'wtbx-type-safe-fetch/tools/method-url'
import { TsFetchToolPathParamsUrl } from 'wtbx-type-safe-fetch/tools/path-params-url'
import { TsFetchToolParamsAndBodyParser } from 'wtbx-type-safe-fetch/tools/params-and-body-parser'

const isLocal = envConfig.vite.isLocal

const fetch2 = tsFetch as unknown as TsFetchTemplate<UserApis, MyRequestInit>

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
	if (isLocal) mock.request(req) // 開發運行環境下支持 mock api

	req.originUrl = req.url
	mergeSameRequest.request(req.originUrl, req) // 合併相同請求

	methodUrl.request(req) // 將路徑的方法轉換成 method
	pathParamsUrl.request(req) // 將路徑參數轉換成匹配的 pathParams key-value
	authRequest(req)
	paramsAndBodyParser.request(req) // 將 params 轉成 qs, body 轉成字串

	return req
})

fetch2.watch.response<
	MyListenerRequestInit,
	Response,
	ApiResponse<any> | Promise<ApiResponse<any>>
>(async (req, res) => {
	authResponse(req, res)
	const _res = await autoResponseResponse(req, res) // 自動將 Response 轉換成值(like: res.json())，並且統一響應格式
	if (isLocal) log.response(req, _res) // 開發運行環境下 log 響應值

	mergeSameRequest.response(req.originUrl, _res) // 響應相同請求

	return _res
})

fetch2.watch.error<Error, MyListenerRequestInit, ApiResponse<any> | Promise<ApiResponse<any>>>(
	async (error, req, res) => {
		const sameRes = await mergeSameRequest.error(req.originUrl, req, error)

		if (sameRes !== undefined) return sameRes

		return autoResponseError(error, req, res)
	},
)

export { fetch2 }
