import styles from "./index.module.css";
import Post from "../Post";
import { IPost } from "../../types";
import { useLoaderData } from "react-router-dom";

export default function PostsList() {
  const posts = useLoaderData() as IPost[];

  // function createPost(post: IPost) {
  //   fetch("http://localhost:8080/posts", {
  //     method: "POST",
  //     body: JSON.stringify(post),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   setPosts((p) => [post, ...p]);
  // }

  return (
    <>
      {posts.length ? (
        <ul className={styles.posts}>
          {posts.map((p) => (
            <Post key={p.id} author={p.author} text={p.body} />
          ))}
        </ul>
      ) : (
        <h2 style={{ textAlign: "center", color: "white" }}>
          There are no posts yet.
        </h2>
      )}
    </>
  );
}
