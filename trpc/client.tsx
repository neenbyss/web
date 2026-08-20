"use client"

import * as React from "react"
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import superjson from "superjson"

import type { AppRouter } from "@/server/api/root"
import { makeQueryClient } from "./query-client"

/**
 * Punto de acceso tipado desde componentes cliente:
 *
 * ```tsx
 * const trpc = useTRPC()
 * const { data } = useQuery(trpc.upload.list.queryOptions({ category: "image" }))
 * ```
 */
export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient | undefined

function getQueryClient(): QueryClient {
  // En servidor, uno nuevo por request. En navegador, uno solo para toda la
  // sesión (recrearlo durante un suspense tiraría la caché).
  if (typeof window === "undefined") return makeQueryClient()
  return (browserQueryClient ??= makeQueryClient())
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") return ""
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  const [trpcClient] = React.useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
