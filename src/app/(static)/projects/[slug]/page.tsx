import { notFound } from 'next/navigation';

import { Hero } from './section.hero';

import { getAllProjects, getProject } from '@/lib/get-projects';
import { createMetadata } from '@/lib/metadata';

import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const { slug } = await params;

  const markdown = await getProject(slug);

  return createMetadata({
    title: markdown?.meta.title,
    description: markdown?.meta.description,
    keywords: markdown?.meta.tags,
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data } = await getAllProjects();
  return data.map((project) => ({ slug: project.slug }));
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const markdown = await getProject(slug);

  if (!markdown) {
    notFound();
  }

  return (
    <main>
      <Hero meta={markdown.meta} />
      <section className='container-screen-lg mt-8 pb-8'>{markdown.content}</section>
    </main>
  );
}

export const dynamic = 'error';
