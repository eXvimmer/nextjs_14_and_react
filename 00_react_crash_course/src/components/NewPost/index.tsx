import { useState } from "react";
import styles from "./index.module.css";
import { IPost } from "../../types";

interface NewPostProps {
  onCancel: () => void;
  createPost(post: IPost): void;
}

function NewPost({ onCancel, createPost }: NewPostProps) {
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
    onCancel();
  };

  return (
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
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit">Submit</button>
      </p>
    </form>
  );
}

export default NewPost;
