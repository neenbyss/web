import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query"
import superjson from "superjson"

/**
 * Fábrica del QueryClient. Se llama una vez por request en el servidor y una
 * sola vez en el navegador (ver `trpc/client.tsx`).
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Evita refetch inmediato de lo que el servidor acaba de entregar.
        staleTime: 30_000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        // Permite streamear queries aún en vuelo desde Server Components.
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  })
}
