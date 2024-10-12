import createMDX from "@next/mdx";
import remarkGfm from 'remark-gfm'
import rehypeHighlight from "rehype-highlight";


/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      {
        source: "/invite",
        destination: "https://discord.com/invite/MN2aPEGXhX",
        permanent: true
      }
    ]
  }
};
const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight],
  },
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);
