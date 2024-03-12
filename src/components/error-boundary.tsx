import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import {BaseError} from "@/components/pages/error.tsx";

class ErrorBoundary {
  // 最外層
  static App({ children }: { children: ReactNode }) {
    return (
      <ReactErrorBoundary fallbackRender={ctx => BaseError({ code: 500, ...ctx })}>
        {children}
      </ReactErrorBoundary>
    )
  }

  // 路由層
  static Route({ children }: { children: ReactNode }) {
    return (
      <ReactErrorBoundary fallbackRender={ctx => BaseError({ code: 500, ...ctx })}>
        {children}
      </ReactErrorBoundary>
    )
  }
}

export { ErrorBoundary }
