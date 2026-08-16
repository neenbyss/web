import { NextResponse } from "next/server"

import { getPublishedProjects } from "@/server/projects/queries"

export async function GET() {
  const projects = await getPublishedProjects()
  return NextResponse.json({ projects })
}
