import { PortofolioMetadata } from "@/types/portfolio-metadata";
import { getMDX } from "@/utils/getMdx";
import { notFound } from "next/navigation";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {

  const markdown = await getMDX<PortofolioMetadata>("/src/app/portfolio/_mdx", params.slug);

  if (!markdown) {
    notFound();
  }

  return (
    <main className="pt-32 pb-10 max-w-screen-xl mx-auto px-4 w-full">
        {markdown.content}
    </main>
  )
}
