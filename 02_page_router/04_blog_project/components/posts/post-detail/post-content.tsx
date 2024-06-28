import { IPost } from "@/types";
import styles from "./post-content.module.css";
import PostHeader from "./post-header";
import ReactMarkdown from "react-markdown";

// TODO: get post from database
const dummyPost: IPost = {
  slug: "getting-started-with-nextjs",
  title: "Getting Started with NextJS",
  image: "getting-started-nextjs.png",
  date: "2024-02-10",
  content: "# This is the first post",
  excerpt: "excerpt",
};

export default function PostContent() {
  return (
    <article className={styles.content}>
      <PostHeader
        image={`/images/posts/${dummyPost.slug}/${dummyPost.image}`}
        title={dummyPost.title}
      />
      <ReactMarkdown>{dummyPost.content}</ReactMarkdown>
    </article>
  );
}
