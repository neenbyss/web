'use client';
import * as React from 'react';

import Link from 'next/link';

import { useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import * as m from 'motion/react-m';
import { cn } from '@/lib/utils';
import { Fade } from '@/components/ui/fade';

const products = [
  {
    title: 'Moonbeam',
    link: 'https://gomoonbeam.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/moonbeam.png',
  },
  {
    title: 'Cursor',
    link: 'https://cursor.so',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/cursor.png',
  },
  {
    title: 'Rogue',
    link: 'https://userogue.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/rogue.png',
  },

  {
    title: 'Editorially',
    link: 'https://editorially.org',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editorially.png',
  },
  {
    title: 'Editrix AI',
    link: 'https://editrix.ai',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/editrix.png',
  },
  {
    title: 'Pixel Perfect',
    link: 'https://app.pixelperfect.quest',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/pixelperfect.png',
  },

  {
    title: 'Algochurn',
    link: 'https://algochurn.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/algochurn.png',
  },
  {
    title: 'Aceternity UI',
    link: 'https://ui.aceternity.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/aceternityui.png',
  },
  {
    title: 'Tailwind Master Kit',
    link: 'https://tailwindmasterkit.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png',
  },
  {
    title: 'SmartBridge',
    link: 'https://smartbridgetech.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/smartbridge.png',
  },
  {
    title: 'Renderwork Studio',
    link: 'https://renderwork.studio',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/renderwork.png',
  },

  {
    title: 'Creme Digital',
    link: 'https://cremedigital.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/cremedigital.png',
  },
  {
    title: 'Golden Bells Academy',
    link: 'https://goldenbellsacademy.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png',
  },
  {
    title: 'Invoker Labs',
    link: 'https://invoker.lol',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/invoker.png',
  },
  {
    title: 'E Free Invoice',
    link: 'https://efreeinvoice.com',
    thumbnail: 'https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png',
  },
];

export const Projects = () => {
  return (
    <ProductsParallax products={products}>
      <div className='container-screen-xl pt-32 pb-20'>
        <Fade as='h2' className='bg-primary w-fit px-2 py-1 text-base sm:text-2xl'>
          {' '}
          Proyectos{' '}
        </Fade>
        <Fade
          as='span'
          delay={0.2}
          className='text-foreground my-2 block max-w-2xl text-3xl font-medium text-balance capitalize sm:text-6xl'
        >
          {' '}
          Nuestra Experiencia En Acción{' '}
        </Fade>
        <Fade as='p' delay={0.5} className='max-w-md'>
          Explorá nuestra colección de proyectos destacados que demuestran nuestra experiencia y
          capacidad para crear soluciones digitales innovadoras.
        </Fade>
      </div>
    </ProductsParallax>
  );
};

const ProductsParallax = ({
  products,
  children,
  className,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
  children: React.ReactNode;
  className?: string;
}) => {
  const midIndex = Math.ceil(products.length / 2);
  const firstRow = products.slice(0, midIndex);
  const secondRow = products.slice(midIndex);

  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const springConfig = { damping: 50, stiffness: 400 };
  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -800]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className={cn(
        'relative mx-auto flex w-full max-w-[1980px] flex-col self-auto overflow-hidden py-40 antialiased',
        className,
      )}
    >
      {children}
      <m.div className='pb-32'>
        <m.div className='mb-20 flex flex-row-reverse gap-10 sm:gap-20'>
          {firstRow.map((product) => (
            <ProductCard product={product} translate={translateX} key={product.title} />
          ))}
        </m.div>
        <m.div className='flex flex-row gap-10 sm:gap-20'>
          {secondRow.map((product) => (
            <ProductCard product={product} translate={translateXReverse} key={product.title} />
          ))}
        </m.div>
      </m.div>
    </div>
  );
};

const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
    tag?: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <m.figure
      style={{
        x: translate as any,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className='group/product relative aspect-[3/2] w-[20rem] flex-shrink-0 overflow-hidden rounded-xl sm:w-[30rem]'
    >
      <Link href={product.link} className='block group-hover/product:shadow-2xl'>
        <img
          src={product.thumbnail}
          height='600'
          width='600'
          className='absolute inset-0 h-full w-full object-cover object-left-top'
          alt={product.title}
        />
      </Link>
      <div className='bg-background pointer-events-none absolute inset-0 size-full opacity-0 transition group-hover/product:opacity-80' />
      <h3 className='ease-soft-spring absolute bottom-8 left-4 max-w-full translate-y-10 truncate text-2xl leading-10 opacity-0 duration-300 group-hover/product:translate-y-0 group-hover/product:opacity-100 group-hover/product:delay-100'>
        {product.title}
      </h3>
      {product.tag && (
        <blockquote className='text-primary ease-soft-spring absolute bottom-4 left-4 mt-2 block translate-y-10 opacity-0 duration-500 group-hover/product:translate-y-0 group-hover/product:opacity-100 group-hover/product:delay-300'>
          {' '}
          #{product.tag}{' '}
        </blockquote>
      )}
    </m.figure>
  );
};
