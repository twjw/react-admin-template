import { tsFetch, TsFetchTemplate } from 'wtbx-type-safe-fetch'
import { Apis as UserApis } from '@/service/fetch2/api-types/user.ts'
import { methodUrl } from 'wtbx-type-safe-fetch/middlewares/method-url'
import { paramsAndBodyParser } from 'wtbx-type-safe-fetch/middlewares/params-and-body-parser'
import { autoResponse } from '@/service/fetch2/middlewares/auto-response.ts'
import { MyRequestInitOther } from '@/service/fetch2/type.ts'
import { envConfig } from '~env-config'
import { mock } from 'wtbx-type-safe-fetch/middlewares/mock'
import { log } from 'wtbx-type-safe-fetch/middlewares/log'
import { auth } from '@/service/fetch2/middlewares/auth.ts'
import { pathParamsUrl } from 'wtbx-type-safe-fetch/middlewares/path-params-url'

const fetch2 = tsFetch as unknown as TsFetchTemplate<UserApis, MyRequestInitOther>

// 開發環境下支持 mock api
if (envConfig.vite.isLocal) fetch2.middleware(mock)

// 將路徑的方法轉換成 method
fetch2.middleware(methodUrl)

// 將路徑參數轉換成匹配的 pathParams key-value
fetch2.middleware(pathParamsUrl)

// 自動傳入 token 及 response 沒權限踢到登入頁面
fetch2.middleware(auth)

// 將 params 轉成 qs, body 轉成字串
fetch2.middleware(paramsAndBodyParser)

// 自動將 Response 轉換成值(like: res.json())，並且統一響應格式
fetch2.middleware(autoResponse)

// log response 與 error
if (envConfig.vite.isLocal) fetch2.middleware(log)

export { fetch2 }
