import { useLoaderData, Link, LoaderFunction } from "react-router-dom";
import Modal from "../../components/Modal";
import styles from "./index.module.css";
import { IPost } from "../../types";

function PostDetails() {
  const post = useLoaderData() as IPost;

  if (!post) {
    return (
      <Modal>
        <main className={styles.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={styles.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }
  return (
    <Modal>
      <main className={styles.details}>
        <p className={styles.author}>{post.author}</p>
        <p className={styles.text}>{post.body}</p>
      </main>
    </Modal>
  );
}

export default PostDetails;

export const loader: LoaderFunction = async ({ params }) => {
  const res = await fetch(`http://localhost:8080/posts/${params.id}`);
  const data = await res.json();
  return data.post as IPost;
};
