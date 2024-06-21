import { Link } from "react-router-dom";
import styles from "./index.module.css";
import { IPost } from "../../types";

export default function Post({ author, body, id }: IPost) {
  return (
    <li className={styles.post}>
      <Link to={id}>
        <p className={styles.author}>{author}</p>
        <p className={styles.text}>{body}</p>
      </Link>
    </li>
  );
}
