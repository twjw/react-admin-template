import { TsFetchTemplateDefineApis } from 'wtbx-type-safe-fetch'
import { ApiResponse } from '@/service/fetch2/api-types/common.ts'

export declare namespace Login {
	export type Body = {
		username: string
		password: string
	}
	export type Response = {
		token: number
	}
}

export type Apis = TsFetchTemplateDefineApis<{
	'post:/mock-api/api/user/login?mockFile=user': {
		body: Login.Body
		response: ApiResponse<Login.Response>
	}
}>
