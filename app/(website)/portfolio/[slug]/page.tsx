import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { IconBrandGithub, IconExternalLink } from "@tabler/icons-react"

import { RichContent } from "@/lib/content/render"
import { api } from "@/trpc/server"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

/** `project.bySlug` lanza NOT_FOUND; aquí un null es más cómodo. */
const getProject = (slug: string) => api.project.bySlug({ slug }).catch(() => null)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary ?? undefined,
    openGraph: project.coverImage ? { images: [project.coverImage] } : undefined,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = await getProject(slug)
  if (!project) notFound()

  return (
    <main className="container-screen-2xl py-30">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <h1 className="heading-1">{project.title}</h1>
          {project.summary && (
            <p className="text-muted-foreground mt-4 text-lg">{project.summary}</p>
          )}

          {(project.liveUrl || project.repoUrl) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button
                  size="sm"
                  render={
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  <IconExternalLink className="size-4" />
                  Ver en vivo
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  render={
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" />
                  }
                >
                  <IconBrandGithub className="size-4" />
                  Repositorio
                </Button>
              )}
            </div>
          )}

          {project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {project.coverImage && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <RichContent html={project.contentHtml} />
      </article>
    </main>
  )
}
