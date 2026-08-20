import { CATEGORY_META } from "@/lib/upload/categories"
import { api } from "@/trpc/server"
import { UploadsDemo, UploadsDialog, UploadsPanel } from "@/components/uploads"

export const metadata = {
  title: "Uploads · Test",
}

// Datos frescos en cada request (los archivos se leen del sistema de ficheros).
export const dynamic = "force-dynamic"

export default async function UploadsTestPage() {
  // SSR vía el caller de tRPC: mismos procedimientos que usa el cliente, sin HTTP.
  const [images, videos, files] = await Promise.all([
    api.upload.list({ category: "image" }),
    api.upload.list({ category: "video" }),
    api.upload.list({ category: "file" }),
  ])

  return (
    <main className="container-screen-lg flex flex-col gap-14 pt-42 pb-24">
      <header className="flex flex-col gap-2">
        <h1 className="heading-3">Gestor de uploads</h1>
        <p className="text-sm text-muted-foreground">
          Demo del componente <code>Dropzone</code> customizable y del panel de gestión
          conectado a tRPC (router <code>upload</code>). Soporta clic, arrastrar y pegar.
        </p>
      </header>

      {/* 1. Dropzone fuertemente customizado (primitivo) */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">Dropzone customizado</h2>
          <p className="text-xs text-muted-foreground">
            Estilado desde fuera con los atributos <code>data-dragging</code> / <code>data-invalid</code>.
          </p>
        </div>
        <UploadsDemo initialItems={images} />
      </section>

      {/* 2. Paneles con tabs (Subir / Lista) dentro de diálogos */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">Gestión por categoría</h2>
          <p className="text-xs text-muted-foreground">
            Cada diálogo abre un panel con pestañas «Subir» y «Lista».
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <UploadsDialog category="image" initialItems={images} />
          <UploadsDialog category="video" initialItems={videos} />
          <UploadsDialog category="file" initialItems={files} />
        </div>
      </section>

      {/* 3. Panel embebido (sin diálogo) para imágenes */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-sm font-semibold tracking-wide uppercase">
            Panel embebido — {CATEGORY_META.image.label}
          </h2>
          <p className="text-xs text-muted-foreground">El mismo panel, sin envolver en un diálogo.</p>
        </div>
        <div className="rounded-md border border-border p-4">
          <UploadsPanel category="image" initialItems={images} />
        </div>
      </section>
    </main>
  )
}
