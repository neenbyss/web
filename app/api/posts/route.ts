import { NextResponse } from "next/server"

import { getPublishedPosts } from "@/server/posts/queries"

export async function GET() {
  const posts = await getPublishedPosts()
  return NextResponse.json({ posts })
}
