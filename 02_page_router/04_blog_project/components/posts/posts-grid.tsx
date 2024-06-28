import { IPost } from "@/types";
import PostItem from "./post-item";
import styles from "./posts-grid.module.css";

export default function PostsGrid({ posts }: { posts: IPost[] }) {
  return (
    <ul className={styles.grid}>
      {posts.map((p) => (
        <PostItem key={p.slug} post={p} />
      ))}
    </ul>
  );
}
