import { getAllMDX } from '@/utils/mdx';
import { createMetadata } from '@/lib/metadata';
import Link from 'next/link';
import { Hero } from './section.hero';

export const metadata = createMetadata({
  title: 'Blog de Desarrollo FiveM & Fullstack | Neenbyss',
  description:
    'Tutoriales, guías de optimización y consejos sobre desarrollo de servidores FiveM y tecnologías web modernas.',
  keywords: ['FiveM', 'Programación FiveM', 'Tutoriales FiveM', 'Optimización FiveM'],
});

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
};

const categoryFromTags = (tags?: string[]) => {
  if (!tags?.length) return null;
  return tags[0];
};

export default async function BlogPage() {
  const { data: posts } = await getAllMDX<BlogPost>('src/app/(static)/blog/(content)');

  return (
    <main>
      <Hero />
      <section className='container-screen-lg pt-6 pb-24'>
        {posts.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <p className='text-foreground-2/60 text-lg'>No hay publicaciones aún.</p>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {posts.map((post, index) => (
              <ArticleCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function ArticleCard({ post, index }: { post: BlogPost; index: number }) {
  const category = categoryFromTags(post.tags);
  const dateParts = post.date.split('-');
  const day = dateParts[2];
  const monthName = getMonthName(dateParts[1]);
  const year = dateParts[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className='group/article border-ring bg-content-1 hover:border-primary/30 hover:bg-content-2 relative flex flex-col gap-5 rounded-2xl border px-6 py-7 transition-all sm:flex-row sm:items-center sm:gap-8 sm:px-8 sm:py-6'
    >
      <div className='flex shrink-0 flex-col items-center gap-1 sm:min-w-[5.5rem] sm:items-start'>
        <span className='text-foreground text-3xl leading-none font-bold sm:text-4xl'>{day}</span>
        <span className='text-primary text-sm font-medium tracking-wider uppercase'>
          {monthName}
        </span>
        <span className='text-foreground-2/50 text-xs'>{year}</span>
      </div>

      <div className='flex grow flex-col gap-3 sm:gap-2'>
        <div className='flex items-center gap-3'>
          {category && (
            <span className='text-primary border-primary/20 bg-primary/10 inline-block rounded-full border px-3 py-0.5 text-[11px] font-medium tracking-wider uppercase'>
              {category}
            </span>
          )}
        </div>
        <h3 className='group-hover/article:text-primary text-xl leading-snug font-bold transition-colors sm:text-2xl'>
          {post.title}
        </h3>
        <p className='text-foreground-2/80 line-clamp-2 text-sm leading-relaxed'>
          {post.description}
        </p>
      </div>

      <div className='text-foreground-2/50 group-hover/article:text-primary flex shrink-0 items-center gap-2 text-xs font-medium transition-colors'>
        <span>Leer</span>
        <svg
          className='size-4 transition-transform duration-300 group-hover/article:translate-x-1'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </div>
    </Link>
  );
}

function getMonthName(month: string): string {
  const months = [
    '',
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  return months[parseInt(month, 10)] || month;
}
