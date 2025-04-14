import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Components } from '@/mdx-components';

export function CustomMDX(props: MDXRemoteProps) {
  return <MDXRemote {...props} components={{ ...Components, ...(props.components || {}) }} />;
}
