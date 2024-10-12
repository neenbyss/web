/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from 'mdx/types'
import { Link, LinkProps } from '@nextui-org/link';

export const Components : MDXComponents = {
    h1: props => (
        <h1 {...props} className="block text-4xl font-black my-4" />
    ),
    h2: props => (
        <h2 {...props} className="block text-2xl font-semibold mt-8 mb-2 " />
    ),
    h3: props => (
        <h3 {...props} className="block text-lg font-semibold mt-4 my-1" />
    ),
    h4: props => (
        <h4 {...props} className="block font-medium mt-2 my-1" />
    ),
    h5: props => (
        <h4 {...props} className="block font-medium my-1" />
    ),
    h6: props => (
        <h4 {...props} className="block font-medium my-1" />
    ),
    p: props => (
        <p {...props} className='py-1 leading-5 font-light' />
    ),
    strong: props => (
        <strong {...props} className='text-foreground font-bold' />
    ),
    ul: props => (
        <ul {...props} className="block list-disc ms-4 list-inside space-y-2 " />
    ),
    ol: props => (
        <ol {...props} className="block list-decimal ms-4 list-inside space-y-2" />
    ),
    li: props => (
        <li {...props} className="list-item [&_p]:inline" />
    ),
    a: props => (
        <Link underline="focus" {...props as LinkProps} />
    ),
    blockquote: props => (
        <blockquote {...props} className="border-l-4 border-foreground2/50 pl-4 italic font-light my-1.5 [&_p]:!py-0 bg-foreground/[.05] py-1.5" />
    ),
    code: props => (
        <code {...props} className="bg-divider/[0.05] rounded-lg px-2 py-0.5" />
    ),
    pre: props => (
        <pre {...props} className="p-2.5 bg-primary-50 rounded-lg overflow-auto" />
    ),
    sup: props => (
        <sup {...props} className='px-2' />
    ),
    table: props => (
        <div className="max-w-full overflow-auto my-1.5">
            <table {...props} className="max-w-full w-full md:w-auto bg-background rounded-md overflow-hidden" />
        </div>
    ),
    thead: props => (
        <thead {...props} />
    ),
    tbody: props => (
        <tbody className="divide-y divide-divider bg-background [&_tr:nth-child(even)]:bg-foreground/[.05]" {...props} />
    ),
    th: props => (
        <th className="px-4 py-2 font-medium bg-primary/[.2] text-foreground text-start" {...props} />
    ),
    td: props => (
        <td className="px-4 py-2 whitespace-nowrap text-sm text-foreground-foreground" {...props} />
    ),
    hr: ({}) => (
        <div className='bg-divider h-px w-full my-4' />
    ),
    img:props =>  props.title ? 
            <>
                <span className='mb-4 border-l-4 border-foreground pl-2 block text-lg'> {props.title} </span>
                <img
                    alt="IMAGE"
                    sizes="100vw"
                    className="w-full h-auto rounded-md"
                    {...props}
                />
            </>
            :
            <img
                alt="IMAGE"
                sizes="100vw"
                className="w-full h-auto rounded-md my-2"
                {...props}
            />
    ,
}
export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return {...Components, ...components}
}
