import styles from "./index.module.css";
import NewPost from "../NewPost";
import Post from "../Post";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { IPost } from "../../types";

interface PostsProps {
  showModal: boolean;
  closeModal: () => void;
}

export default function Posts({ showModal, closeModal }: PostsProps) {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);
      const res = await fetch("http://localhost:8080/posts");
      const data: { posts: IPost[] } = await res.json();
      setPosts(data.posts);
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  function createPost(post: IPost) {
    fetch("http://localhost:8080/posts", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPosts((p) => [post, ...p]);
  }

  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
          <NewPost onCancel={closeModal} createPost={createPost} />
        </Modal>
      )}
      {isFetching ? (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>loading posts...</h2>
        </div>
      ) : posts.length ? (
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
