import {ErrorBoundary} from "@/components/error-boundary.tsx";
import {Children, ReactNode, Suspense, useEffect} from "react";
import {usePageRoute} from "~page-routes";

type CommonProps = {
  path: string;
  children: ReactNode
}

function RouteContent ({ children }: CommonProps) {
  const ctx = usePageRoute()

  useEffect(() => {
    if (ctx == null) return
  }, [ctx])

  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  )
}

function RouteWrap ({ path, children }: CommonProps) {
  return <ErrorBoundary.Route>
    <RouteContent path={path}>{children}</RouteContent>
  </ErrorBoundary.Route>
}

export {
  RouteWrap,
}
