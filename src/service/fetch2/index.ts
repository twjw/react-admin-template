import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { Apis as UserApis } from '@/service/fetch2/api-types/user.ts'
import { methodUrl } from 'wtbx-type-safe-fetch/middlewares/method-url'
import { paramsAndBodyParser } from 'wtbx-type-safe-fetch/middlewares/params-and-body-parser'
import { log } from '@/service/fetch2/middlewares/log.ts'
import { mock } from '@/service/fetch2/middlewares/mock.ts'
import { autoResponse } from '@/service/fetch2/middlewares/auto-response.ts'
import { MyRequestInitOther } from '@/service/fetch2/api-types/common.ts'

const fetch2 = tsFetch as unknown as TsFetchTemplate<UserApis, MyRequestInitOther>

// 將路徑的方法轉換成 method
fetch2.middleware(methodUrl)

// 將 params 轉成 qs, body 轉成字串
fetch2.middleware(paramsAndBodyParser)

// 開發環境下支持 mock api
fetch2.middleware(mock)

// 自動將 Response 轉換成值，like: res.json()
fetch2.middleware(autoResponse)

// log response 與 error
fetch2.middleware(log)

export { fetch2 }
