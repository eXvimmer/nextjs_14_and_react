import { IPost } from "@/types";
import styles from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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
    // code(code) {
    //   const { className, children } = code;
    //   const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
    //   return (
    //     <SyntaxHighlighter style={materialOceanic} language={language}>
    //       {children}
    //     </SyntaxHighlighter>
    //   );
    // },
  };

  return (
    <article className={styles.content}>
      <PostHeader image={`/images/posts/${slug}/${image}`} title={title} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}
