import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { Components } from "@/mdx-components";
const dir = process.cwd();

type Default = Record<string, unknown>;


export const getMDX = async<T = Default>(root: string, slug: string) => {
  try{
  
    const filePath = path.join(dir, root, `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    const { frontmatter, content } = await compileMDX({
      source: fileContent,
      options: { parseFrontmatter: true },
      components: Components
    });
  
    return { meta: { ...frontmatter as T, slug: slug }, content };
  }
  catch {
    return null
  }
  
};

export const getAllMDX = async <T = Default>(root: string) => {
  const files = fs.readdirSync(path.join(dir, root));
  const posts : T[] = [];
  for (const fileName of files) {
    if(fileName.endsWith(".mdx")) {
      const file = fileName.replace(".mdx", "");

      const markdown  = await getMDX(root, file);
      if(markdown) posts.push(markdown.meta as T);
    }
  }
  return posts;
};