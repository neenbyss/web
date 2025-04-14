'use server';
import fs from 'fs';
import path from 'path';

import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { compileMDX, CompileMDXResult } from 'next-mdx-remote/rsc';
import { Components } from '@/mdx-components';

const dir = process.cwd();

type Default = Record<string, unknown>;

export const getMDX = async <T = Default>(root: string, slug: string) => {
  try {
    const filePath = path.join(dir, root, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const { frontmatter, content } = await compileMDX({
      source: fileContent,
      components: Components,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [rehypeHighlight],
        },
        parseFrontmatter: true,
      },
    });

    return { meta: { ...(frontmatter as T), slug: slug }, content };
  } catch {
    return null;
  }
};

export const getAllMDX = async <T = Default>(
  root: string,
  opts?: {
    search?: {
      name?: string;
      currentPage?: number;
      pageSize?: number;
    };
  },
) => {
  const dirPath = path.join(dir, root);
  if (!fs.existsSync(dirPath)) {
    console.error(`El directorio no existe: ${dirPath}`);
    return {
      total: 0,
      data: [],
    }; // Manejo de error
  }

  const files = fs.readdirSync(dirPath).filter((file) => file.endsWith('.mdx'));
  let posts: T[] = [];

  for (const fileName of files) {
    const file = fileName.replace('.mdx', '');
    const markdown = await getMDX<T>(root, file);
    if (markdown) posts.push({ ...markdown.meta, slug: file } as T);
  }

  // Filtrado en los metadatos
  if (opts?.search) {
    const { name } = opts.search;
    posts = posts.filter((post: any) => {
      let matches = true;
      if (name) {
        matches = matches && post?.title?.toLowerCase().includes(name.toLowerCase());
      }
      return matches;
    });
  }

  // Paginación
  const pageSize = opts?.search?.pageSize ?? 10; // Default 10 por página
  const currentPage = opts?.search?.currentPage ?? 1;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return {
    total: posts.length,
    currentPage,
    totalPages: Math.ceil(posts.length / pageSize),
    data: posts.slice(startIndex, endIndex),
  };
};
