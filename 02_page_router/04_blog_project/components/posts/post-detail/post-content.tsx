import { IPost } from "@/types";
import styles from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import materialOceanic from "react-syntax-highlighter/dist/cjs/styles/prism/material-oceanic";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import ts from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
// import cpp from "react-syntax-highlighter/dist/cjs/languages/prism/cpp"
// import go from "react-syntax-highlighter/dist/cjs/languages/prism/go"
// import rust from "react-syntax-highlighter/dist/cjs/languages/prism/rust"

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("ts", ts);
SyntaxHighlighter.registerLanguage("css", css);

export default function PostContent({
  post: { slug, image, title, content },
}: {
  post: IPost;
}) {
  const customRenderers = {
    // @ts-ignore
    p(paragraph) {
      if (paragraph.node?.children[0]?.tagName === "img") {
        const image = paragraph.node.children[0];
        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.alt || title}
              width={600}
              height={300}
              priority={false}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },

    // @ts-ignore
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter style={materialOceanic} language={language}>
          {children}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader image={`/images/posts/${slug}/${image}`} title={title} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}
