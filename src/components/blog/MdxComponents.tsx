import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: () => null,
  h2: ({ children, ...props }) => (
    <h2
      className="font-display font-bold text-2xl md:text-3xl text-steel-100 mt-12 mb-4"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="font-display font-semibold text-xl text-steel-100 mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="font-body text-base md:text-lg text-steel-200 leading-relaxed mb-6"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-fire-400 underline underline-offset-4 hover:text-fire-300 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fire-400 focus-visible:ring-offset-2 focus-visible:ring-offset-steel-900"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-steel-100 font-semibold" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-outside ml-6 mb-6 space-y-2 text-steel-200"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-outside ml-6 mb-6 space-y-2 text-steel-200"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-fire-400 bg-steel-800 rounded-r-xl pl-6 pr-4 py-4 my-8 italic font-serif text-steel-200 text-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-steel-800 text-fire-300 px-1.5 py-0.5 rounded text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-steel-800 border border-steel-700 rounded-xl p-6 overflow-x-auto my-8 font-mono text-sm text-steel-200"
      {...props}
    >
      {children}
    </pre>
  ),
  hr: (props) => <hr className="border-steel-700 my-12" {...props} />,
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
  img: (props) => <img className="rounded-xl my-8" {...props} />,
};
