import { NextResponse } from "next/server"

import { getPublishedPostBySlug } from "@/server/posts/queries"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 })
  }
  return NextResponse.json({ post })
}
