import "server-only"

import * as React from "react"
import { cache } from "react"
import { headers } from "next/headers"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"

import { appRouter, createCaller } from "@/server/api/root"
import { createTRPCContext } from "@/server/api/trpc"
import { makeQueryClient } from "./query-client"

/** Contexto por render, compartido entre el caller y el proxy de opciones. */
const createContext = cache(async () => createTRPCContext({ headers: await headers() }))

/** QueryClient por render (deduplicado con `cache`). */
export const getQueryClient = cache(makeQueryClient)

/**
 * Llamada directa desde Server Components — sin HTTP, sin serializar:
 * `const posts = await api.post.list()`.
 */
export const api = createCaller(createContext)

/**
 * Proxy de opciones para precargar en el servidor lo que un componente cliente
 * consumirá después: `prefetch(trpc.upload.list.queryOptions({...}))`.
 */
export const trpc = createTRPCOptionsProxy({
  ctx: createContext,
  router: appRouter,
  queryClient: getQueryClient,
})

/** Envuelve el árbol cliente con el estado ya precargado en el servidor. */
export function HydrateClient({ children }: { children: React.ReactNode }) {
  return (
    <HydrationBoundary state={dehydrate(getQueryClient())}>{children}</HydrationBoundary>
  )
}
