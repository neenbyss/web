# API (tRPC)

Toda la API vive aquí. Un solo endpoint HTTP (`/api/trpc/*`), tipado de punta a
punta: el tipo de retorno de un procedimiento llega al componente sin escribir
ni un tipo a mano.

## Mapa

```
server/api/
  trpc.ts              contexto, transformer y procedimientos base
  root.ts              appRouter + createCaller
  routers/
    post.ts            blog
    project.ts         portafolio
    tag.ts             etiquetas compartidas
    upload.ts          biblioteca de archivos
server/posts|projects/
  queries.ts           lecturas (Prisma)
  mutations.ts         escrituras + revalidatePath
trpc/
  client.tsx           TRPCReactProvider + useTRPC   (cliente)
  server.tsx           api (caller), trpc, HydrateClient  (RSC)
  query-client.ts      configuración de TanStack Query
```

Los routers solo orquestan: validan la entrada, llaman a `queries`/`mutations`
y traducen "no existe" a `TRPCError`. La lógica de datos no sabe de HTTP.

## Procedimientos

- `publicProcedure` — abierto.
- `adminProcedure` — exige sesión; deja `ctx.session` no-nulo en el resolver.

El contexto resuelve la sesión de forma tolerante a fallos: si el auth aún no
está configurado, `ctx.session` es `null` y lo público sigue sirviendo.

## Uso

**Server Component** (sin HTTP, sin serializar):

```tsx
import { api } from "@/trpc/server"

const posts = await api.post.list()
```

`bySlug`/`byId` lanzan `NOT_FOUND`; en una página, `.catch(() => null)` y
`notFound()`.

**Componente cliente**:

```tsx
"use client"
import { useQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"

const trpc = useTRPC()
const { data } = useQuery(trpc.upload.list.queryOptions({ category: "image" }))
```

**Precarga en servidor + hidratación**: `prefetch` con `trpc.*.queryOptions()`
desde `@/trpc/server` y envuelve el árbol en `<HydrateClient>`.

## La excepción: subida de archivos

`POST /api/uploads` es el único route handler REST que queda. tRPC viaja sobre
JSON y no puede reportar progreso de subida, así que el binario sigue yendo por
multipart + `XMLHttpRequest` (ver `hooks/use-uploads.ts`). Listar, leer, editar
y borrar sí son tRPC (`upload` router).

## Errores

`errorFormatter` añade `data.fieldErrors` cuando la entrada falla la validación
Zod: un `Record<campo, string[]>` listo para pintar en un formulario.
