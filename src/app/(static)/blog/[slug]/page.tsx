import { notFound } from 'next/navigation';
import { getMDX, getAllMDX } from '@/utils/mdx';
import { createMetadata } from '@/lib/metadata';

type BlogMeta = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  cover?: string[];
};

type BlogPost = BlogMeta & { slug: string };

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const markdown = await getMDX<BlogMeta>('src/app/(static)/blog/(content)', slug);

  if (!markdown) return {};

  return createMetadata({
    title: markdown.meta.title,
    description: markdown.meta.description,
    keywords: markdown.meta.tags,
    canonical: `https://neenbyss.com/blog/${slug}`,
    openGraph: {
      url: `https://neenbyss.com/blog/${slug}`,
      images: markdown.meta.cover ? markdown.meta.cover : [],
    },
    twitter: {
      images: markdown.meta.cover ? markdown.meta.cover : [],
      card: 'summary_large_image',
    },
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { data } = await getAllMDX<BlogPost>('src/app/(static)/blog/(content)');
  return data.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const markdown = await getMDX<BlogMeta>('src/app/(static)/blog/(content)', slug);

  if (!markdown) {
    notFound();
  }

  return (
    <main className='container-screen-lg py-12'>
      <article className='mx-auto max-w-3xl'>
        <header className='mb-8'>
          <h1 className='mb-4 text-4xl font-bold'>{markdown.meta.title}</h1>
          <div className='text-foreground-2 flex gap-4 text-sm'>
            <span>{markdown.meta.date}</span>
            <div className='flex gap-2'>
              {Array.isArray(markdown.meta.tags) &&
                markdown.meta.tags.map((tag: string) => (
                  <span key={tag} className='bg-content-2 rounded px-2 py-1 text-xs'>
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </header>
        <div className='prose prose-invert text-foreground-2 max-w-none leading-relaxed'>
          {markdown.content}
        </div>
      </article>
    </main>
  );
}
