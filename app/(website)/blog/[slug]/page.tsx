import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Mdx } from "@/lib/mdx/compile"
import { getPublishedPostBySlug } from "@/server/posts/queries"
import { Badge } from "@/components/ui/badge"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.coverImage ? { images: [post.coverImage] } : undefined,
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  return (
    <main className="container-screen-2xl py-30">
      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <div className="text-muted-foreground mb-4 flex items-center gap-3 text-xs uppercase tracking-widest">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {format(post.publishedAt, "d 'de' MMMM, yyyy", { locale: es })}
              </time>
            )}
            {post.readingTime > 0 && <span>· {post.readingTime} min de lectura</span>}
          </div>
          <h1 className="heading-1">{post.title}</h1>
          {post.excerpt && (
            <p className="text-muted-foreground mt-4 text-lg">{post.excerpt}</p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {post.coverImage && (
          <div className="relative mb-12 aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Mdx source={post.contentMdx} />
        </div>
      </article>
    </main>
  )
}
