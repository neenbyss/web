import { Badge } from '@/components/common/badge';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsSection() {
  return (
    <section className='border-b py-20'>
      <div className='container-screen-xl'>
        <h2 className='mb-4 caption-bottom text-xl font-medium sm:mb-12 sm:text-center sm:text-3xl'>
          {' '}
          Tecnologías Que usamos día a día{' '}
        </h2>
        <Tabs defaultValue='frontend'>
          <ScrollArea>
            <TabsList>
              {technologiesTabs.map(({ value, title }, i) => {
                return (
                  <TabsTrigger key={value + '_' + i} value={value} className='w-full sm:text-xl'>
                    {title}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
          {technologiesTabs.map(({ value, items }, i) => {
            return (
              <TabsContent
                key={value + '_' + i}
                value={value}
                className='flex flex-wrap items-center gap-2 sm:mt-8 sm:justify-center'
              >
                {items.map(({ icon, title }, j) => (
                  <Badge key={`${value}_${i}_${j}`} className='sm:text-lg'>
                    {icon}
                    {title}
                  </Badge>
                ))}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}

const technologiesTabs = [
  {
    value: 'frontend',
    title: 'Frontend',
    items: [
      { title: 'HTML5', icon: <i className='devicon-html5-plain'></i> },
      { title: 'CSS3', icon: <i className='devicon-css3-plain'></i> },
      { title: 'JavaScript', icon: <i className='devicon-javascript-plain'></i> },
      { title: 'TypeScript', icon: <i className='devicon-typescript-plain'></i> },
      { title: 'Astro', icon: <i className='devicon-javascript-plain'></i> },
      { title: 'React', icon: <i className='devicon-react-original'></i> },
      { title: 'Next.js', icon: <i className='devicon-nextjs-original'></i> },
      { title: 'Tailwind CSS', icon: <i className='devicon-tailwindcss-plain'></i> },
      { title: 'Sass', icon: <i className='devicon-sass-original'></i> },
      { title: 'Wordpress', icon: <i className='devicon-sass-original'></i> },
      { title: 'Vite', icon: <i className='devicon-vitejs-plain'></i> },
      { title: 'Figma', icon: <i className='devicon-figma-plain'></i> },
    ],
  },
  {
    value: 'backend',
    title: 'Backend',
    items: [
      { title: 'Node.js', icon: <i className='devicon-nodejs-plain'></i> },
      { title: 'Express', icon: <i className='devicon-express-original'></i> },
      { title: 'NestJS', icon: <i className='devicon-nestjs-plain'></i> },
      { title: 'PHP', icon: <i className='devicon-php-plain'></i> },
      { title: 'Laravel', icon: <i className='devicon-laravel-plain'></i> },
    ],
  },
  {
    value: 'databases',
    title: 'Bases de Datos',
    items: [
      { title: 'MongoDB', icon: <i className='devicon-mongodb-plain'></i> },
      { title: 'PostgreSQL', icon: <i className='devicon-postgresql-plain'></i> },
      { title: 'MySQL', icon: <i className='devicon-mysql-plain'></i> },
      { title: 'Firebase', icon: <i className='devicon-firebase-plain'></i> },
      { title: 'SQLite', icon: <i className='devicon-sqlite-plain'></i> },
      { title: 'Redis', icon: <i className='devicon-redis-plain'></i> },
      { title: 'Supabase', icon: <i className='devicon-supabase-plain'></i> },
    ],
  },
  {
    value: 'devops',
    title: 'DevOps',
    items: [
      { title: 'Docker', icon: <i className='devicon-docker-plain'></i> },
      { title: 'Git', icon: <i className='devicon-git-plain'></i> },
      { title: 'GitHub Actions', icon: <i className='devicon-github-original'></i> },
      { title: 'CI/CD', icon: <i className='devicon-gitlab-plain'></i> },
      { title: 'Linux', icon: <i className='devicon-linux-plain'></i> },
      { title: 'Nginx', icon: <i className='devicon-nginx-original'></i> },
    ],
  },
  {
    value: 'otros',
    title: 'Otros',
    items: [
      { title: 'PrismaORM', icon: <i className='devicon-prisma-original'></i> },
      { title: 'Postman', icon: <i className='devicon-postman-plain'></i> },
    ],
  },
];
