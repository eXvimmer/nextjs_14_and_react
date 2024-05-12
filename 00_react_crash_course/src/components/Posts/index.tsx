import styles from "./index.module.css";
import NewPost from "../NewPost";
import Post from "../Post";
import { useState } from "react";
import Modal from "../Modal";
import { IPost } from "../../types";

interface PostsProps {
  showModal: boolean;
  closeModal: () => void;
}

export default function Posts({ showModal, closeModal }: PostsProps) {
  const [posts, setPosts] = useState<IPost[]>([]);

  function createPost(post: IPost) {
    setPosts((p) => [post, ...p]);
  }

  return (
    <>
      {showModal && (
        <Modal onClose={closeModal}>
          <NewPost onCancel={closeModal} createPost={createPost} />
        </Modal>
      )}
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
