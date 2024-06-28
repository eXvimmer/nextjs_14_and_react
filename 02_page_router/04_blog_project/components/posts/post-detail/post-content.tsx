import { IPost } from "@/types";
import styles from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

export default function PostContent({
  post: { slug, image, title, content },
}: {
  post: IPost;
}) {
  return (
    <article className={styles.content}>
      <PostHeader image={`/images/posts/${slug}/${image}`} title={title} />
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
