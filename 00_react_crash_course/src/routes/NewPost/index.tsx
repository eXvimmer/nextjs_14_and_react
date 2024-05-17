import styles from "./index.module.css";
import Modal from "../../components/Modal";
import { Link, Form, ActionFunction, redirect } from "react-router-dom";
import { IPost } from "../../types";

function NewPost() {
  return (
    <Modal>
      <Form method="POST" className={styles.form}>
        <p>
          <label htmlFor="name">Your name</label>
          <input autoFocus type="text" id="name" name="author" required />
        </p>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" required name="body" rows={3} />
        </p>
        <p className={styles.actions}>
          <Link to=".." type="button">
            Cancel
          </Link>
          <button type="submit">Submit</button>
        </p>
      </Form>
    </Modal>
  );
}

export default NewPost;

export const action: ActionFunction<Partial<IPost>> = async ({ request }) => {
  const formData = await request.formData();
  const postData = Object.fromEntries(formData);
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect("/");
};
