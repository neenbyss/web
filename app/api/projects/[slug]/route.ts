import { NextResponse } from "next/server"

import { getPublishedProjectBySlug } from "@/server/projects/queries"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const project = await getPublishedProjectBySlug(slug)
  if (!project) {
    return NextResponse.json({ error: "No encontrado." }, { status: 404 })
  }
  return NextResponse.json({ project })
}
