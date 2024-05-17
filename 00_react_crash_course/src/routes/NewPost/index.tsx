import { useState } from "react";
import styles from "./index.module.css";
import { IPost } from "../../types";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";

interface NewPostProps {
  createPost(post: { body: IPost["body"]; author: IPost["author"] }): void;
}

function NewPost({ createPost }: NewPostProps) {
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");

  const handleFormSubmission: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!body || !author) {
      return;
    }
    createPost({
      body,
      author,
    });
  };

  return (
    <Modal>
      <form className={styles.form} onSubmit={handleFormSubmission}>
        <p>
          <label htmlFor="name">Your name</label>
          <input
            autoFocus
            type="text"
            id="name"
            required
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            required
            rows={3}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </p>
        <p className={styles.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit">Submit</button>
        </p>
      </form>
    </Modal>
  );
}

export default NewPost;
