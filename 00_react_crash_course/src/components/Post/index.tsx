import styles from "./index.module.css";

export default function Post({
  author,
  text,
}: {
  author: string;
  text: string;
}) {
  return (
    <li className={styles.post}>
      <p className={styles.author}>{author}</p>
      <p className={styles.text}>{text}</p>
    </li>
  );
}
